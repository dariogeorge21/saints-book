"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
  UI_TRANSLATIONS,
} from "./i18n";
import { Saint, SaintTranslation } from "./data";

export type PersistenceMode = "permanent" | "remember_7days" | "ask_each_time";

export interface LocalizedSaintContent {
  name: string;
  epithet: string;
  dateOfBirth: string;
  beatifiedDate: string;
  canonisedDate: string;
  feastDate: string;
  location: string;
  patronage: string[];
  attributes: string;
  quote: string;
  story: string[];
}

interface StoredPreference {
  language: SupportedLanguage;
  mode: PersistenceMode;
  expiresAt?: number | null;
}

interface LanguageContextType {
  language: SupportedLanguage;
  mode: PersistenceMode;
  isTransitioning: boolean;
  showPrompt: boolean;
  expiresAt: number | null;
  remainingDays: number | null;
  setLanguage: (lang: SupportedLanguage, newMode?: PersistenceMode) => void;
  setMode: (newMode: PersistenceMode) => void;
  setShowPrompt: (show: boolean) => void;
  resetPreferences: () => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
  getSaintContent: (
    saint: Saint,
    overrideLang?: SupportedLanguage
  ) => LocalizedSaintContent;
}

const STORAGE_KEY = "saintsbook_language_pref";
const SESSION_KEY = "saintsbook_session_lang";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");
  const [mode, setModeState] = useState<PersistenceMode>("remember_7days");
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize preference on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: StoredPreference = JSON.parse(raw);
        if (parsed.mode === "permanent") {
          setLanguageState(parsed.language || "en");
          setModeState("permanent");
          setExpiresAt(null);
          setIsInitialized(true);
          return;
        }

        if (parsed.mode === "remember_7days") {
          const now = Date.now();
          if (parsed.expiresAt && now < parsed.expiresAt) {
            setLanguageState(parsed.language || "en");
            setModeState("remember_7days");
            setExpiresAt(parsed.expiresAt);
            setIsInitialized(true);
            return;
          } else {
            // Expired 7-day memory
            localStorage.removeItem(STORAGE_KEY);
            setModeState("ask_each_time");
            setShowPrompt(true);
            setIsInitialized(true);
            return;
          }
        }

        if (parsed.mode === "ask_each_time") {
          setModeState("ask_each_time");
          const sessionLang = sessionStorage.getItem(
            SESSION_KEY
          ) as SupportedLanguage | null;
          if (sessionLang) {
            setLanguageState(sessionLang);
          } else {
            setShowPrompt(true);
          }
          setIsInitialized(true);
          return;
        }
      }

      // First time visitor: check session
      const sessionLang = sessionStorage.getItem(
        SESSION_KEY
      ) as SupportedLanguage | null;
      if (sessionLang) {
        setLanguageState(sessionLang);
        setModeState("ask_each_time");
      } else {
        // Show prompt on fresh entry if no preference set
        setShowPrompt(true);
      }
    } catch {
      // Fallback
      setLanguageState("en");
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const triggerTransition = () => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 320);
    return () => clearTimeout(timer);
  };

  const setLanguage = useCallback(
    (newLang: SupportedLanguage, newMode?: PersistenceMode) => {
      triggerTransition();
      setLanguageState(newLang);

      const resolvedMode = newMode ?? mode;
      setModeState(resolvedMode);

      try {
        if (resolvedMode === "permanent") {
          const data: StoredPreference = {
            language: newLang,
            mode: "permanent",
            expiresAt: null,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          setExpiresAt(null);
        } else if (resolvedMode === "remember_7days") {
          const exp = Date.now() + SEVEN_DAYS_MS;
          const data: StoredPreference = {
            language: newLang,
            mode: "remember_7days",
            expiresAt: exp,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          setExpiresAt(exp);
        } else if (resolvedMode === "ask_each_time") {
          const data: StoredPreference = {
            language: newLang,
            mode: "ask_each_time",
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          sessionStorage.setItem(SESSION_KEY, newLang);
          setExpiresAt(null);
        }
      } catch (err) {
        console.error("Failed to store language preference", err);
      }
    },
    [mode]
  );

  const setMode = useCallback(
    (newMode: PersistenceMode) => {
      setModeState(newMode);
      try {
        if (newMode === "permanent") {
          const data: StoredPreference = {
            language,
            mode: "permanent",
            expiresAt: null,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          setExpiresAt(null);
        } else if (newMode === "remember_7days") {
          const exp = Date.now() + SEVEN_DAYS_MS;
          const data: StoredPreference = {
            language,
            mode: "remember_7days",
            expiresAt: exp,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          setExpiresAt(exp);
        } else if (newMode === "ask_each_time") {
          const data: StoredPreference = {
            language,
            mode: "ask_each_time",
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          sessionStorage.setItem(SESSION_KEY, language);
          setExpiresAt(null);
        }
      } catch (err) {
        console.error("Failed to update persistence mode", err);
      }
    },
    [language]
  );

  const resetPreferences = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(SESSION_KEY);
    } catch {}
    triggerTransition();
    setLanguageState("en");
    setModeState("remember_7days");
    setExpiresAt(null);
    setShowPrompt(false);
  }, []);

  // Compute remaining days if 7-day memory is active
  const remainingDays =
    mode === "remember_7days" && expiresAt
      ? Math.max(0, Math.ceil((expiresAt - Date.now()) / (24 * 60 * 60 * 1000)))
      : null;

  // Translation helper
  const t = useCallback(
    (key: string, replacements?: Record<string, string | number>): string => {
      const dict = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
      let text = dict[key] || UI_TRANSLATIONS.en[key] || key;
      if (replacements) {
        Object.entries(replacements).forEach(([k, v]) => {
          text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        });
      }
      return text;
    },
    [language]
  );

  // Content extraction helper for a Saint
  const getSaintContent = useCallback(
    (
      saint: Saint,
      overrideLang?: SupportedLanguage
    ): LocalizedSaintContent => {
      const active = overrideLang ?? language;
      if (active === "en" || !saint.translations) {
        return {
          name: saint.name,
          epithet: saint.epithet,
          dateOfBirth: saint.dateOfBirth,
          beatifiedDate: saint.beatifiedDate,
          canonisedDate: saint.canonisedDate,
          feastDate: saint.feastDate,
          location: saint.location,
          patronage: saint.patronage,
          attributes: saint.attributes,
          quote: saint.quote,
          story: saint.story,
        };
      }

      const translation: SaintTranslation | undefined =
        saint.translations[active];
      if (!translation) {
        return {
          name: saint.name,
          epithet: saint.epithet,
          dateOfBirth: saint.dateOfBirth,
          beatifiedDate: saint.beatifiedDate,
          canonisedDate: saint.canonisedDate,
          feastDate: saint.feastDate,
          location: saint.location,
          patronage: saint.patronage,
          attributes: saint.attributes,
          quote: saint.quote,
          story: saint.story,
        };
      }

      return {
        name: translation.name || saint.name,
        epithet: translation.epithet || saint.epithet,
        dateOfBirth: translation.dateOfBirth || saint.dateOfBirth,
        beatifiedDate: translation.beatifiedDate || saint.beatifiedDate,
        canonisedDate: translation.canonisedDate || saint.canonisedDate,
        feastDate: translation.feastDate || saint.feastDate,
        location: translation.location || saint.location,
        patronage: translation.patronage || saint.patronage,
        attributes: translation.attributes || saint.attributes,
        quote: translation.quote || saint.quote,
        story: translation.story && translation.story.length > 0 ? translation.story : saint.story,
      };
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        mode,
        isTransitioning,
        showPrompt,
        expiresAt,
        remainingDays,
        setLanguage,
        setMode,
        setShowPrompt,
        resetPreferences,
        t,
        getSaintContent,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
