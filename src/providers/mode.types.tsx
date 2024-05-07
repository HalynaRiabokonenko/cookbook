export type Mode = "light" | "dark";

export type ContextType = {
    mode: Mode;
    toggleMode: () => void;
};

export type ModeProviderProps = {
    children: React.ReactNode;
};
