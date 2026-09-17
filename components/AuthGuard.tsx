"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setCredentials, logout } from "@/store/authSlice";
import Cookies from "js-cookie";
import { getSession, clearSession } from "@/services/session.service";
import { VaultUnlockModal } from "@/components/VaultUnlockModal";

const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes
const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"] as const;

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);
  const [needsUnlock, setNeedsUnlock] = useState(false);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lockVault = useCallback(() => {
    clearSession();
    setNeedsUnlock(true);
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(lockVault, INACTIVITY_TIMEOUT_MS);
  }, [lockVault]);

  // Start / restart inactivity tracking whenever the vault is unlocked
  useEffect(() => {
    if (isChecking || needsUnlock) return;

    resetInactivityTimer();
    ACTIVITY_EVENTS.forEach(evt => window.addEventListener(evt, resetInactivityTimer, { passive: true }));

    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      ACTIVITY_EVENTS.forEach(evt => window.removeEventListener(evt, resetInactivityTimer));
    };
  }, [isChecking, needsUnlock, resetInactivityTimer]);

  useEffect(() => {
    if (!isAuthenticated) {
      const token = Cookies.get("token");
      const userStr = Cookies.get("user");

      if (token && userStr) {
        try {
          const parsedUser = JSON.parse(userStr);
          dispatch(setCredentials({ user: parsedUser, token }));
        } catch {
          router.push("/login");
          return;
        }
      } else {
        router.push("/login");
        return;
      }
    }

    // Auth is confirmed — now check if the crypto session is alive
    const session = getSession();
    if (!session) {
      setNeedsUnlock(true);
    }

    setIsChecking(false);
  }, [isAuthenticated, router, dispatch]);

  const handleUnlocked = () => {
    setNeedsUnlock(false);
  };

  const handleLogout = () => {
    clearSession();
    dispatch(logout());
    router.push("/login");
  };

  if (isChecking) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (needsUnlock) {
    return (
      <VaultUnlockModal
        onUnlocked={handleUnlocked}
        onLogout={handleLogout}
      />
    );
  }

  return <>{children}</>;
}
