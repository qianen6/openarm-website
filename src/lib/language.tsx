"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

export type Language = "en" | "zh";

const STORAGE_KEY = "openarm.language";
const SUPPORTED: readonly Language[] = ["en", "zh"];

/** Total opacity transition window when switching languages (ms). */
const TRANSITION_FADE_MS = 220;

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  /** True after the client has hydrated and reconciled the persisted preference. */
  ready: boolean;
  /** True while the cross-fade between languages is mid-flight. */
  transitioning: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

let currentLanguage: Language = "en";
let initialized = false;
const listeners = new Set<() => void>();

function detectFromBrowser(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (SUPPORTED as readonly string[]).includes(stored)) {
      return stored as Language;
    }
  } catch {
    // localStorage may throw in private mode; fall through to navigator detection.
  }
  const browser =
    typeof navigator !== "undefined"
      ? navigator.language?.toLowerCase() ?? ""
      : "";
  return browser.startsWith("zh") ? "zh" : "en";
}

function ensureInitialized(): boolean {
  if (initialized || typeof window === "undefined") return false;
  currentLanguage = detectFromBrowser();
  initialized = true;
  return true;
}

function getSnapshot(): Language {
  return currentLanguage;
}

function getServerSnapshot(): Language {
  return "en";
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function emit() {
  listeners.forEach((cb) => cb());
}

function setLanguageInStore(next: Language) {
  if (currentLanguage === next) return;
  currentLanguage = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore quota / privacy-mode failures.
    }
  }
  emit();
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const [transitioning, setTransitioning] = useState(false);
  const fadeOutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeInTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (ensureInitialized()) {
      emit();
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  useEffect(() => {
    return () => {
      if (fadeOutTimerRef.current) clearTimeout(fadeOutTimerRef.current);
      if (fadeInTimerRef.current) clearTimeout(fadeInTimerRef.current);
    };
  }, []);

  const runFadeSwap = useCallback((next: Language) => {
    // Cancel any in-flight transition before starting a new one.
    if (fadeOutTimerRef.current) clearTimeout(fadeOutTimerRef.current);
    if (fadeInTimerRef.current) clearTimeout(fadeInTimerRef.current);

    // Honor user's reduced-motion preference: swap instantly with no fade.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setLanguageInStore(next);
      return;
    }

    setTransitioning(true);
    fadeOutTimerRef.current = setTimeout(() => {
      setLanguageInStore(next);
      // Allow the new content to paint while still at low opacity, then fade in.
      fadeInTimerRef.current = setTimeout(() => {
        setTransitioning(false);
      }, 40);
    }, TRANSITION_FADE_MS);
  }, []);

  const setLanguage = useCallback(
    (next: Language) => {
      runFadeSwap(next);
    },
    [runFadeSwap],
  );

  const toggleLanguage = useCallback(() => {
    runFadeSwap(currentLanguage === "en" ? "zh" : "en");
  }, [runFadeSwap]);

  const ready = initialized;

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, ready, transitioning }),
    [language, setLanguage, toggleLanguage, ready, transitioning],
  );

  return (
    <LanguageContext.Provider value={value}>
      <div
        data-lang={language}
        style={{
          opacity: transitioning ? 0.35 : 1,
          transition: `opacity ${TRANSITION_FADE_MS}ms ease`,
          willChange: "opacity",
        }}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
