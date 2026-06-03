"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setCredentials } from "@/store/authSlice";
import Cookies from "js-cookie";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      const token = Cookies.get("token");
      const userStr = Cookies.get("user");
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          dispatch(setCredentials({ user, token }));
        } catch (e) {
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    }
    setIsChecking(false);
  }, [isAuthenticated, router, dispatch]);

  if (isChecking || !isAuthenticated) {
    return null; 
  }

  return <>{children}</>;
}
