import { drawerBoard } from "../const";
import { BoardColFigure, ColElement, Row, RowElement } from "../types";
import { PolygonContainer } from "./Polygon";
import { RectangleContainer } from "./Rectangle";

interface BoardConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
}

export class Board extends Phaser.GameObjects.Container {
  constructor(config: BoardConfig) {
    super(config.scene, config.x, config.y);

    this.create();

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
      boxAlpha: debugOpacity,
      boxWidth: width,
      boxHeight: height,
    });

    const mainColumns = this.createMainColumns();

    mainRectangle.add(mainColumns);

    return mainRectangle;
  }

  private createSubColumns(colsProps: Col[], width: number, height: number) {
    let accumulatedWidth = 0;
    const cols = colsProps.map((col, colIndex) => {
      const currentWidth = typeof col.width === "undefined" ? 17 : col.width;

      const column = new RectangleContainer({
        scene: this.scene,
        x: accumulatedWidth,
        y: 0,
        color: colIndex % 2 === 0 ? 0xff3f34 : 0x1e272e,
        boxWidth: currentWidth,
        boxHeight: height,
        boxAlpha: 0,
        // text: col.label,
        onClick: (pointer) => {
          if (!pointer || col?.row) return;

          const chip = this.createChip(currentWidth / 2, height / 2);

          column.add(chip);
        },
      });

      // if (col.row) {
      //   const centerRectangle = this.createCenterRectangle(
      //     col.row,
      //     width,
      //     height
      //   );
      //   column.add(centerRectangle);
      // }

      accumulatedWidth += currentWidth;

      return column;
    });

    return cols;
  }

  private createSubRows(
    rowsProps: RowElement[],
    width: number,
    height: number
  ) {
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
        color: rowIndex % 2 === 0 ? 0xf9ca24 : 0x7ed6df,
        boxWidth: width,
        boxHeight: currentHeight,
        boxAlpha: 0,
        // text: row.label,
      });

      if (row.col) {
        const subColumns = this.createSubColumns(row.col, width, currentHeight);
        rowRect.add(subColumns);
      }

      accumulatedHeight += currentHeight;

      return rowRect;
    });

    return rowsCenter;
  }

  private createColumns(colProps: ColElement[], width: number, height: number) {
    const cols = colProps.map((col, colIndex) => {
      const column = new RectangleContainer({
        scene: this.scene,
        x: width * colIndex,
        y: 0,
        color: colIndex % 2 === 0 ? 0xf9ca24 : 0x7ed6df,
        boxWidth: width,
        boxHeight: height,
        boxAlpha: 0,
        // text: col.label,
        onClick: (pointer) => {
          if (!pointer) return;

          if (col?.col) return;
          const chip = this.createChip(width / 2, height / 2);

          column.add(chip);
        },
      });

      if (col.row) {
        const centerRectangle = this.createSubRows(col.row, width, height);
        column.add(centerRectangle);
      }

      return column;
    });

    return cols;
  }
  private createRows(rows: Row[], width: number) {
    let accumulatedHeight = 0;
    const rowsContainer = rows.map((row, rowIndex) => {
      const currentWidth = row.width || width;
      const bgColor = rowIndex % 2 === 0 ? 0xe67e22 : 0xf368e0;

      const rowFigure = new RectangleContainer({
        scene: this.scene,
        x: row.x,
        y: accumulatedHeight,
        color: bgColor,
        boxWidth: currentWidth,
        boxHeight: row.height || 0,
        boxAlpha: 0,
        // text: row.label,
        onClick: (pointer) => {
          if (!pointer) return;

          if (row?.col) return;
          const chip = this.createChip(currentWidth / 2, row.height / 2);

          rowFigure.add(chip);
        },
      });

      if (row.col) {
        const columns = this.createColumns(
          row.col,
          currentWidth / row.col.length,
          row.height || 0
        );
        rowFigure.add(columns);
      }

      accumulatedHeight += row.height;

      return rowFigure;
    });

    return rowsContainer;
  }

  private createMainColumns() {
    let accumulatedWidth = 0;
    const columns = drawerBoard.cols.map((column, colIndex) => {
      const handleClick = (pointer?: PointerEvent) => {
        if (!pointer) return;
        if (column?.row || !column.height) return;

        const chip = this.createChip(column.width / 2, column.height / 2);

        columnFigure.add(chip);
      };

      const height = column.height ? column.height : drawerBoard.height;
      const alpha = 0;
      const bgColor = colIndex % 2 === 0 ? 0x00ff00 : 0x0000ff;

      const columnFigure =
        column.type === BoardColFigure.POLYGON
          ? new PolygonContainer({
              boxHeight: height,
              boxWidth: column.width,
              color: bgColor,
              scene: this.scene,
              x: accumulatedWidth,
              y: 0,
              boxAlpha: alpha,
              points: column.points || [],
              onClick: handleClick,
              // text: column.label,
            })
          : new RectangleContainer({
              scene: this.scene,
              x: accumulatedWidth,
              y: 0,
              color: bgColor,
              boxWidth: column.width,
              boxHeight: height,
              boxAlpha: alpha,
              onClick: handleClick,
              // text: column.label,
            });

      if (column?.row) {
        columnFigure.add(this.createRows(column.row, column.width));
      }

      accumulatedWidth += column.width;

      return columnFigure;
    });

    return columns;
  }
}
