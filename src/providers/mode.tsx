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
  const [mode, setMode] = useState<Mode>("light");

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
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
    document.body.className = mode === "dark" ? "dark" : "";
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};
