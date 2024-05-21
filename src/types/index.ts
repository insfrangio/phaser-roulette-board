export interface DrawerBoard {
  x: number;
  y: number;
  width: number;
  height: number;
  debugColor: number;
  debugOpacity: number;
  cols: DrawerBoardCol[];
}

export interface DrawerBoardCol {
  label: string;
  type: BoardColFigure;
  width: number;
  height?: number;
  points?: Point[];
  row?: Row[];
}

export enum BoardColFigure {
  RECTANGLE = "RECTANGLE",
  POLYGON = "POLYGON",
}

export interface Point {
  x: number;
  y: number;
}

export interface Row {
  label: string;
  value: number;
  height: number;
  y: number;
  x: number;
  col?: ColElement[];
  width?: number;
}

export interface ColElement {
  label: string;
  value: number;
  height?: number;
  y: number;
  row?: RowElement[];
  col?: ColElement[];
  width?: number;
}

export interface RowElement {
  label: string;
  value: number;
  height?: number;
  y: number;
  row?: RowElement[];
  col?: ColElement[];
  width?: number;
}
