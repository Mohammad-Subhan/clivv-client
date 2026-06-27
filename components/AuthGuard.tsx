"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setCredentials, logout } from "@/store/authSlice";
import Cookies from "js-cookie";
import { getSession, clearSession } from "@/services/session.service";
import { VaultUnlockModal } from "@/components/VaultUnlockModal";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);
  const [needsUnlock, setNeedsUnlock] = useState(false);

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
