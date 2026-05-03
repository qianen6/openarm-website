"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface PreorderContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const PreorderContext = createContext<PreorderContextValue | null>(null);

export function PreorderProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <PreorderContext.Provider value={value}>{children}</PreorderContext.Provider>
  );
}

export function usePreorder() {
  const ctx = useContext(PreorderContext);
  if (!ctx) {
    throw new Error("usePreorder must be used within PreorderProvider");
  }
  return ctx;
}
