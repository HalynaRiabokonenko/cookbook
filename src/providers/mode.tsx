import React, { useState, useEffect, createContext, useContext } from "react";
import { ContextType, Mode, ModeProviderProps } from "./mode.types";

const ModeContext = createContext<ContextType | undefined>(undefined);

export const useModeContext = (): ContextType => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useModeContext has to be used within a ModeProvider");
  }
  return context;
};

export const ModeProvider: React.FC<ModeProviderProps> = ({ children }: ModeProviderProps) => {
  const [mode, setMode] = useState<Mode>(Mode.Light);

  const toggleMode = () => {
    setMode(mode === Mode.Light ? Mode.Dark : Mode.Light);
  };

  const handleSystemModeChange = (e: MediaQueryListEvent) => {
    if (mode === Mode.System) {
      document.body.className = e.matches ? Mode.Dark : "";
    }
  };


  useEffect(() => {
    const fetchModeFromLocalStorage = () => {
      try {
        const modeData: Mode | null = JSON.parse(localStorage.getItem('mode') || 'null');
        if (modeData && mode !== modeData) {
          setMode(modeData);
        }
      } catch (error) {
        console.error("Error accessing local storage:", error);
      }
    };

    fetchModeFromLocalStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(mode));
  }, [mode]);

  useEffect(() => {
    document.body.className = mode === Mode.Dark ? Mode.Dark : "";
  }, [mode]);


  useEffect(() => {
    const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    if (mode === "system") {
      document.body.className = systemDarkMode.matches ? Mode.Dark : "";
    } else {
      document.body.className = mode === Mode.Dark ? Mode.Dark : "";
    }

    systemDarkMode.addEventListener('change', handleSystemModeChange);

    return () => {
      systemDarkMode.removeEventListener('change', handleSystemModeChange);
    };
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};
