export interface IWithClear {
  clear: () => void;
}

export interface IWithHydration {
  _hydrated?: boolean;
}
