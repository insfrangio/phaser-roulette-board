import { drawerBoard } from "../const";
import {
  cols,
  filterOptions,
  firstLine,
  options,
  secondLine,
  secondLineThird,
  square,
  zeroOptions,
} from "../mocked";
import {
  BoardColFigure,
  ColElement,
  DrawerBoardCol,
  Row,
  RowElement,
} from "../types";
import { isEmpty } from "../util";
import { PolygonContainer } from "./Polygon";
import { RectangleContainer } from "./Rectangle";

interface BoardConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  debug?: boolean;
}

export class Board extends Phaser.GameObjects.Container {
  private debug: boolean;

  constructor(config: BoardConfig) {
    super(config.scene, config.x, config.y);
    this.debug = config.debug || false;

    this.create();

    console.log("filterOptions", filterOptions);
    console.log("zeroOptions", zeroOptions);
    console.log("cols", cols);
    console.log("firstLine", firstLine);
    console.log("secondLine", secondLine);
    console.log("square", square);
    console.log("secondLineThird", secondLineThird);

    this.scene.add.existing(this);
  }

  private createChip(x: number, y: number) {
    const chip = this.scene.add.image(x, y, "chip");

    chip.setOrigin(0.5);

    return chip;
  }

  private create() {
    const bgImage = this.createBackgroundImage();
    const mainRectangle = this.createMainRectangle();

    this.add([bgImage, mainRectangle]);
  }

  private createBackgroundImage() {
    const image = this.scene.add.image(0, 0, "board");

    image.setOrigin(0.5);

    return image;
  }

  private createMainRectangle() {
    const { x, y, width, height, debugColor, debugOpacity } = drawerBoard;

    const mainRectangle = new RectangleContainer({
      scene: this.scene,
      x,
      y,
      color: debugColor,
      boxAlpha: this.debug ? debugOpacity : 0,
      boxWidth: width,
      boxHeight: height,
    });

    const mainColumns = this.createMainColumns();

    mainRectangle.add(mainColumns);

    return mainRectangle;
  }

  private createSubColumns(colsProps: ColElement[], height: number) {
    let accumulatedWidth = 0;
    const cols = colsProps.map((col, colIndex) => {
      const currentWidth = typeof col.width === "undefined" ? 80 : col.width;

      const option = options.find((option) => option.key === col.key);

      // console.log("col", col);

      // console.log(option);

      const column = new RectangleContainer({
        scene: this.scene,
        x: accumulatedWidth,
        y: 0,
        color: colIndex % 2 === 0 ? 0xff3f34 : 0x0000ff,
        boxWidth: currentWidth,
        boxHeight: height,
        boxAlpha: this.debug ? 0.3 : 0,
        text: String(option?.key) || col.label,
        onClick: (pointer) => {
          if (!pointer || col?.row) return;

          const chip = this.createChip(currentWidth / 2, height / 2);

          column.add(chip);
        },
        onPointerOver: () => {
          if (!isEmpty(col.row)) return;

          column.changeColor(0xf9ca24, 0.3);
        },
      });

      accumulatedWidth += currentWidth;

      return column;
    });

    return cols;
  }

  private createSubRows(rowsProps: RowElement[], width: number) {
    // const imperHeight = (height * 83) / 100 / 3;
    // const parHeight = (height * 17) / 100 / 3;
    const imperHeight = 17;
    const parHeight = 62;

    let accumulatedHeight = 0;

    const rowsCenter = rowsProps.map((row, rowIndex) => {
      const currentHeight = row?.height
        ? row.height
        : rowIndex % 2 === 0
        ? parHeight
        : imperHeight;

      const rowRect = new RectangleContainer({
        scene: this.scene,
        x: 0,
        y: accumulatedHeight,
        color: rowIndex % 2 === 0 ? 0xff0000 : 0x7ed6df,
        boxWidth: width,
        boxHeight: currentHeight,
        boxAlpha: this.debug ? 0.2 : 0,
        // text: row.label,
      });

      if (row.col) {
        const subColumns = this.createSubColumns(row.col, currentHeight);
        rowRect.add(subColumns);
      }

      accumulatedHeight += currentHeight;

      return rowRect;
    });

    return rowsCenter;
  }

  private createColumns(
    colProps: ColElement[],
    width: number,
    height: number,
    index: number
  ) {
    const cols = colProps.map((col, colIndex) => {
      const option = options.find((option) => option.key === col.key);

      const column = new RectangleContainer({
        scene: this.scene,
        x: width * colIndex,
        y: 0,
        color: colIndex % 2 === 0 ? 0x7ed6df : 0x00ff00,
        boxWidth: width,
        boxHeight: height,
        boxAlpha: this.debug ? 0.3 : 0,
        text: option?.alias,
        onClick: (pointer) => {
          if (!pointer) return;

          if (col?.col) return;
          const chip = this.createChip(width / 2, height / 2);

          column.add(chip);
        },
        onPointerOver: () => {
          if (!isEmpty(col?.col)) return;

          if (index === 1) {
            column.changeColor(0x7ed6df, 0.3, width, height + 10, 0, -10);

            return;
          }

          column.changeColor(0xf9ca24, 0.3);
        },
      });

      if (col.row) {
        const centerRectangle = this.createSubRows(col.row, width);

        column.add(centerRectangle);
      }

      return column;
    });

    return cols;
  }
  private createRows(rows: Row[], width: number) {
    let accumulatedHeight = 0;

    const rowsContainer = rows.map((row, rowIndex) => {
      const option = options.find((option) => option.key === row.key);
      const currentWidth = row.width || width;
      const bgColor = rowIndex % 2 === 0 ? 0xe67e22 : 0xf368e0;

      const rowFigure = new RectangleContainer({
        scene: this.scene,
        x: row.x,
        y: accumulatedHeight,
        color: bgColor,
        boxWidth: currentWidth,
        boxHeight: row.height || 0,
        boxAlpha: this.debug ? 0.2 : 0,
        text: option?.alias,
        onClick: (pointer) => {
          if (!pointer) return;

          if (!isEmpty(row?.col)) return;
          const chip = this.createChip(currentWidth / 2, row.height / 2);

          rowFigure.add(chip);
        },
        onPointerOver: () => {
          if (!isEmpty(row?.col)) return;

          rowFigure.changeColor(0xf9ca24, 0.3);
        },
      });

      if (row.col) {
        const columns = this.createColumns(
          row.col,
          currentWidth / row.col.length,
          row.height,
          rowIndex
        );
        rowFigure.add(columns);
      }

      accumulatedHeight += row.height;

      return rowFigure;
    });

    return rowsContainer;
  }

  private onClickOption(height: number, width: number, pointer?: PointerEvent) {
    if (!pointer) return;
    const chip = this.createChip(width / 2, height / 2);

    return chip;
  }
  private mainColFigure(column: DrawerBoardCol, accumulatedWidth: number) {
    const option = options.find((option) => option.key === column.key);

    const onClick = (pointer?: PointerEvent) => {
      if (!isEmpty(column.row)) return;

      const chip = this.onClickOption(
        column.height || 0,
        column.width,
        pointer
      );

      if (!chip) return;

      columnFigure.add(chip);
    };

    const height = column.height || drawerBoard.height;
    const debugMode = this.debug ? column.debugOpacity : 0;

    const columnFigure =
      column.type === BoardColFigure.POLYGON
        ? new PolygonContainer({
            scene: this.scene,
            boxHeight: height,
            boxWidth: column.width,
            x: accumulatedWidth,
            y: 0,
            points: column.points || [],
            // boxAlpha: debugMode,
            // color: column.debugColor,
            onClick: onClick,
            onPointerOver: () => {
              columnFigure.changeColor(0xf9ca24, 0.5, [
                { x: 0, y: 130 },
                { x: 26, y: 0 },
                { x: 68, y: 0 },
                { x: 68, y: 240 },
                { x: 26, y: 240 },
                { x: 0, y: 130 },
              ]);
            },
            text: option?.alias,
          })
        : new RectangleContainer({
            scene: this.scene,
            boxHeight: height,
            boxWidth: column.width,
            x: accumulatedWidth,
            y: 0,
            boxAlpha: debugMode,
            color: column.debugColor,
          });

    return columnFigure;
  }

  private createMainColumns() {
    let accumulatedWidth = 0;
    const columns = drawerBoard.cols.map((column) => {
      const figure = this.mainColFigure(column, accumulatedWidth);

      if (column?.row) {
        figure.add(this.createRows(column.row, column.width));
      }

      accumulatedWidth += column.width;

      return figure;
    });

    return columns;
  }
}
