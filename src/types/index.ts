export interface BoardContainer {
  label: string;
  cols: Col[] | undefined;
  type: string;
  width: number;
  height: number;
  x: number;
}

export interface Col {
  label: string;
  value: number;
  height: number;
  width?: number;
  y: number;
  col: Col[] | undefined;
  row?: Row[];
  x: number;
}

export interface Row {
  label: string;
  value: number;
  width?: number;
  height?: number;
  y: number;
  x: number;
  col?: Col[];
}
