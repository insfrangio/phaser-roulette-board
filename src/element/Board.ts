import { drawerBoard } from "../const";
import { options } from "../mocked";
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
  private options?: Array<Phaser.GameObjects.Container> = [];

  constructor(config: BoardConfig) {
    super(config.scene, config.x, config.y);
    this.debug = config.debug || true;

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
      boxAlpha: this.debug ? debugOpacity : 0,
      boxWidth: width,
      boxHeight: height,
      name: "mainRectangle",
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
        name: col.label,
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

          if (option?.key === 49) {
            this.options?.forEach((option) => {
              option?.changeColor(0x0000ff, 0.3);
            });
            return;
          }

          column.changeColor(0x00ff00, 0.3);
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
        name: row.label,
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
    index: number,
    hover?: { height: number; y: number }
  ) {
    const cols = colProps.map((col, colIndex) => {
      const option = options.find((option) => option.key === col.key);

      // console.log("=>", col, {
      //   heightHover: height + 10,
      //   yHover: -10,
      // });

      const column = new RectangleContainer({
        name: col.label,
        scene: this.scene,
        x: width * colIndex,
        y: 0,
        color: colIndex % 2 === 0 ? 0x7ed6df : 0x00ff00,
        boxWidth: width,
        boxHeight: height,
        boxAlpha: this.debug ? 0.3 : 0,
        text: col.label || option?.alias || col.label,
        onClick: (pointer) => {
          if (!pointer) return;

          if (col?.col) return;
          const chip = this.createChip(width / 2, height / 2);

          column.add(chip);
        },
        onPointerOver: () => {
          if (!isEmpty(col?.col)) return;

          if (hover) {
            column.changeColor(0xf9ca24, 0.8, width, hover.height, 0, hover.y);
            return;
          }

          column.changeColor(0xf9ca24, 0.8);
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
        name: row.label,
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
          rowIndex,
          row.hoverPoints
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

  // private onHoverOptions(figure: PolygonContainer | RectangleContainer) {

  //   figure.changeColor(0xf9ca24, 0.5);
  // }

  private createMainFigures({
    column,
    accumulatedWidth,
    height,
    onClick,
  }: {
    column: DrawerBoardCol;
    accumulatedWidth: number;
    height: number;
    onClick: (pointer?: PointerEvent) => void;
  }) {
    const debugMode = this.debug ? column.debugOpacity : 0;
    const option = options.find((option) => option.key === column.key);

    const polygonFigure = () => {
      const figure = new PolygonContainer({
        name: column.label,
        scene: this.scene,
        boxHeight: height,
        boxWidth: column.width,
        x: accumulatedWidth,
        y: 0,
        points: column.points || [],
        onClick: onClick,
        onPointerOver: () => {
          figure.changeColor(0xf9ca24, 0.5, column.polygonHoverPoints);
        },
        text: option?.alias,
      });

      console.log({
        figure,
        options: this.options,
      });
      this.options?.push(figure);

      return figure;
    };

    const rectFigure = () => {
      const figure = new RectangleContainer({
        scene: this.scene,
        boxHeight: height,
        boxWidth: column.width,
        x: accumulatedWidth,
        y: 0,
        boxAlpha: debugMode,
        color: column.debugColor,
        name: column.label,
      });

      return figure;
    };

    return column.type === BoardColFigure.POLYGON
      ? polygonFigure()
      : rectFigure();
  }
  private mainColFigure(column: DrawerBoardCol, accumulatedWidth: number) {
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

    const columnFigure = this.createMainFigures({
      accumulatedWidth,
      column,
      height,
      onClick,
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
