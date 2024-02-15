import React, { FC, PropsWithChildren, createContext, useEffect, useState } from "react";

type Mode = "light" | "dark";

type ContextType = {
  mode: Mode;
  toggleMode: () => void;
};

export const ModeContext = createContext<ContextType>({
  mode: "light",
  toggleMode: () => {},
});

export const ModeProvider: FC = ({ children }: PropsWithChildren<{}>) => {
  const [mode, setMode] = useState<Mode>("light");

  const toggleMode = () => {
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
