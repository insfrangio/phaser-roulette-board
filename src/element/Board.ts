import { drawerBoard, mainColsHover } from "../const";
import { options } from "../mocked";
import {
  BoardColFigure,
  ColElement,
  DrawerBoardCol,
  Row,
  RowElement,
} from "../types";
import { isEmpty } from "../util";
import { Figure } from "./Figure";

interface BoardConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  debug?: boolean;
}

const { POLYGON, RECTANGLE } = BoardColFigure;
export class Board extends Phaser.GameObjects.Container {
  private debug: boolean;
  private hoverFigures: Figure[] = [];

  constructor(config: BoardConfig) {
    super(config.scene, config.x, config.y);
    this.debug = config.debug || false;

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

    const mainRectangle = new Figure({
      format: RECTANGLE,
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
    const optionsHover = this.createOptionsHover({
      width: mainColsHover.width,
      height: mainColsHover.height,
      col: mainColsHover.col,
      name: mainColsHover.name,
    });

    mainRectangle.add(optionsHover);
    mainRectangle.add(mainColumns);

    // console.log("hoverOptions", this.hoverFigures);

    return mainRectangle;
  }

  // private getCurrentHover() {

  // }

  private createSubColumns(
    colsProps: ColElement[],
    height: number,
    debugMode: boolean
  ) {
    let accumulatedWidth = 0;
    const cols = colsProps.map((col, colIndex) => {
      const currentWidth = typeof col.width === "undefined" ? 80 : col.width;

      const option = options.find((option) => option.key === col.key);

      const column = new Figure({
        format: RECTANGLE,
        name: col.name,
        scene: this.scene,
        x: accumulatedWidth,
        y: 0,
        // color: colIndex % 2 === 0 ? 0xff3f34 : 0x0000ff,
        boxWidth: currentWidth,
        boxHeight: height,
        boxAlpha: debugMode ? 0.3 : this.debug ? 0.2 : 0,
        // text: debugMode ? col.name : "",
        // text: debugMode ? col.name : String(col.key),
        // String(col.key),
        onClick: (pointer) => {
          if (!pointer || col?.row) return;

          const chip = this.createChip(currentWidth / 2, height / 2);

          column.add(chip);
        },
        onPointerOver: () => {
          if (debugMode) return;

          // console.log({
          //   colName: col.name,
          //   hoverOptions: col?.hoverOptions,
          // });

          col.hoverOptions?.forEach((hoverOption) => {
            this.hoverFigures?.forEach((figure) => {
              if (figure.name === hoverOption) {
                figure.changeColor(0xf9ca24, 0.8);
                console.log({
                  figureName: figure.name,
                  hoverOption,
                });
                return;
              }
            });
          });

          // this.hoverFigures?.forEach((figure) => {
          //   if (figure.name === col.name) {
          //     // column.changeColor(0xf9ca24, 0.8);
          //     // console.log("heree", figure, figure?.name);
          //     figure.changeColor(0xf9ca24, 0.8);
          //     return;
          //   }

          //   figure.changeColor(0xf9ca24, 0);
          //   return;
          // });

          // column.changeColor(0xf9ca24, 0.8);
        },
        onPointerOut: () => {
          if (debugMode) return;

          col.hoverOptions?.forEach((hoverOption) => {
            this.hoverFigures?.forEach((figure) => {
              if (figure.name === hoverOption) {
                figure.changeColor(0xf9ca24, 0);
                console.log({
                  figureName: figure.name,
                  hoverOption,
                });
                return;
              }
            });
          });
        },
      });

      // this.options?.push(column);

      accumulatedWidth += currentWidth;

      if (debugMode) {
        this.hoverFigures.push(column);
      }

      return column;
    });

    return cols;
  }

  private createSubRows(
    rowsProps: RowElement[],
    width: number,
    debugMode: boolean
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

      const rowRect = new Figure({
        format: RECTANGLE,
        name: row.name,
        scene: this.scene,
        x: 0,
        y: accumulatedHeight,
        // color: rowIndex % 2 === 0 ? 0xff0000 : 0x7ed6df,
        boxWidth: width,
        boxHeight: currentHeight,
        boxAlpha: debugMode ? 0.3 : this.debug ? 0.2 : 0,
      });

      if (row.col) {
        const subColumns = this.createSubColumns(
          row.col,
          currentHeight,
          debugMode
        );
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
    debug: boolean = false
  ) {
    const cols = colProps.map((col, colIndex) => {
      const option = options.find((option) => option.key === col.key);

      const column = new Figure({
        format: RECTANGLE,
        name: col.name,
        scene: this.scene,
        x: width * colIndex,
        y: 0,
        // color: colIndex % 2 === 0 ? 0x7ed6df : 0x00ff00,
        boxWidth: width,
        boxHeight: height,
        boxAlpha: debug ? 0.1 : this.debug ? 0.2 : 0,
        // text: col.name || option?.alias,
        onClick: !debug
          ? (pointer) => {
              if (!pointer) return;

              if (col?.col) return;
              const chip = this.createChip(width / 2, height / 2);

              column.add(chip);
            }
          : undefined,
        // onPointerOver: () => {
        //   if (!isEmpty(col?.col)) return;

        //   if (hover) {
        //     column.changeColor(0xf9ca24, 0.8, width, hover.height, 0, hover.y);
        //     return;
        //   }

        //   column.changeColor(0xf9ca24, 0.8);
        // },
      });

      if (col.row) {
        const centerRectangle = this.createSubRows(col.row, width, debug);

        column.add(centerRectangle);
      }

      return column;
    });

    return cols;
  }

  private createOptionsHover(row: {
    name: string;
    col: ColElement[];
    width: number;
    height: number;
    // hoverPoints: { height: number; y: number };
  }) {
    const figure = new Figure({
      format: RECTANGLE,
      scene: this.scene,
      x: 69,
      y: 0,
      // color: 0xf368e0,
      boxWidth: row.width || 0,
      boxHeight: row.height,
      boxAlpha: 0.2,
      // text: row.name,
      name: row.name,
      // onClick: (pointer) => {
      //   if (!pointer) return;

      //   if (!isEmpty(row?.col)) return;
      //   const chip = this.createChip(currentWidth / 2, row.height / 2);

      //   figure.add(chip);
      // },
      // onPointerOver: () => {
      //   if (!isEmpty(row?.col)) return;

      //   figure.changeColor(0xf9ca24, 0.3);
      // },
    });

    const columns = this.createColumns(
      row.col || [],
      row.width / row.col.length,
      row.height,
      true
    );

    figure.add(columns);

    return figure;
  }

  private createRows(rows: Row[], width: number) {
    let accumulatedHeight = 0;

    const rowsContainer = rows.map((row, rowIndex) => {
      const option = options.find((option) => option.key === row.key);
      const currentWidth = row.width || width;
      const bgColor = rowIndex % 2 === 0 ? 0xe67e22 : 0xf368e0;

      const rowFigure = new Figure({
        format: RECTANGLE,
        scene: this.scene,
        x: row.x,
        y: accumulatedHeight,
        color: bgColor,
        boxWidth: currentWidth,
        boxHeight: row.height || 0,
        boxAlpha: this.debug ? 0.2 : 0,
        text: option?.alias,
        name: row.name,
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
          row.height
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

    const figure =
      column.type === POLYGON
        ? new Figure({
            format: POLYGON,
            points: column.points || [],
            name: column.name,
            scene: this.scene,
            boxHeight: height,
            boxWidth: column.width,
            x: accumulatedWidth,
            y: 0,
            onClick: onClick,
            text: option?.alias,
            boxAlpha: debugMode,
          })
        : new Figure({
            format: RECTANGLE,
            name: column.name,
            scene: this.scene,
            boxHeight: height,
            boxWidth: column.width,
            x: accumulatedWidth,
            y: 0,
            onClick: onClick,
            text: option?.alias,
            boxAlpha: debugMode,
          });

    return figure;
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
        const rows = this.createRows(column.row, column.width);
        figure.add(rows);
      }

      accumulatedWidth += column.width;

      return figure;
    });

    return columns;
  }
}
