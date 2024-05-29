export interface DrawingBoard {
  x: number;
  y: number;
  width: number;
  height: number;
  cols: BoardMainCols[];
}

export interface BoardMainCols {
  name: string;
  type: BoardColFigure;
  width: number;
  height?: number;
  points?: Point[];
  row?: Row[];
  key?: number;
  hoverOptions?: Array<string>;
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
  name: string;
  value: number;
  height: number;
  x: number;
  col?: ColElement[];
  width?: number;
  key?: number;
  hoverOptions?: Array<string>;
}

export interface SubColElement {}

export interface ColElement {
  name: string;
  value: number;
  height?: number;
  y: number;
  row?: RowElement[];
  col?: ColElement[];
  width?: number;
  key?: number;
  hoverOptions?: Array<string>;
}

export interface RowElement {
  name: string;
  value: number;
  height?: number;
  y: number;
  row?: RowElement[];
  col?: ColElement[];
  width?: number;
}
