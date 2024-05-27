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
  polygonHoverPoints?: Point[];
  debugColor: number;
  debugOpacity: number;
  row?: Row[];
  key?: number;
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
  x: number;
  col?: ColElement[];
  width?: number;
  key?: number;
  hoverPoints?: {
    height: number;
    y: number;
  };
}

export interface SubColElement {}

export interface ColElement {
  label: string;
  value: number;
  height?: number;
  y: number;
  row?: RowElement[];
  col?: ColElement[];
  width?: number;
  key?: number;
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
