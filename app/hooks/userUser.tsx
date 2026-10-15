"use client"
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export function useUser() {
  const [name, setName] = useState("Loading...");

  useEffect(() => {
    apiFetch("/me")
      .then((res) => res.json())
      .then((data) => setName(data.name || data.email))
      .catch(() => setName("Guest"));
  }, []);

  return name;
}