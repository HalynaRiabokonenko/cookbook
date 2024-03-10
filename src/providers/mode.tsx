import React, { FC, PropsWithChildren, createContext, useEffect, useState } from "react";

type Mode = "light" | "dark";

type ContextType = {
  mode: Mode;
  toggleMode: () => void;
};

export const ModeContext = createContext<ContextType>({
  mode: "light",
  toggleMode: () => { },
});

type ModeProviderProps = {
  children: React.ReactNode;
};

export const ModeProvider: FC<ModeProviderProps> = ({ children }: PropsWithChildren<ModeProviderProps>): React.ReactElement => {
  const [mode, setMode] = useState<Mode>("light");

  const toggleMode = (): void => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};
