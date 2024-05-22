export enum Mode {
    Light = "light",
    Dark = "dark",
    System = "system"
}

export type ContextType = {
    mode: Mode;
    toggleMode: () => void;
};

export type ModeProviderProps = {
    children: React.ReactNode;
};
