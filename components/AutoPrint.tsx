"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AutoPrint() {
  const params = useSearchParams();
  useEffect(() => {
    if (params.get("print") === "1") {
      // Petit délai pour laisser la page se rendre
      setTimeout(() => window.print(), 600);
    }
  }, [params]);
  return null;
}
