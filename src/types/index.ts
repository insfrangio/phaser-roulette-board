export interface Cols {
  label: string;
  col: Col[] | undefined;
  type: string;
  width: number;
  height: number;
  x: number;
}

export interface Col {
  label: string;
  value: number;
  height: number;
  y: number;
  col: Col[] | undefined;
}
