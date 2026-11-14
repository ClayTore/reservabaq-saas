"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { obtenerSesion } from "@/lib/auth";
import { useSesion } from "@/lib/useSesion";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const sesion = useSesion();
  const router = useRouter();

  useEffect(() => {
    if (!obtenerSesion()) router.replace("/login");
  }, [sesion, router]);

  if (!sesion) return null;
  return <>{children}</>;
}