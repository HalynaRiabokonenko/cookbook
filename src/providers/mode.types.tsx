export type Mode = "light" | "dark" | "system";

export type ContextType = {
    mode: Mode;
    toggleMode: () => void;
};

export type ModeProviderProps = {
    children: React.ReactNode;
};
