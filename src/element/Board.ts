import { drawingBoard, mainColsHover } from "../const";
import { options } from "../mocked";
import {
  BoardColFigure,
  ColElement,
  BoardMainCols,
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
    const container = this.createContainer();

    this.add([bgImage, container]);
  }

  private createBackgroundImage() {
    const image = this.scene.add.image(0, 0, "board");

    image.setOrigin(0.5);

    return image;
  }

  private createContainer() {
    const { x, y, width, height } = drawingBoard;

    const container = new Figure({
      format: RECTANGLE,
      scene: this.scene,
      x,
      y,
      boxAlpha: this.debug ? 0.3 : 0,
      boxWidth: width,
      boxHeight: height,
      name: "mainRectangle",
    });

    const mainColumns = this.mainColumns();
    const optionsHover = this.createOptionsHover();

    container.add(optionsHover);
    container.add(mainColumns);

    return container;
  }

  private changeFigureColor(
    figure: ColElement | Row | BoardMainCols,
    alpha: number
  ) {
    figure.hoverOptions?.forEach((hoverOption) => {
      this.hoverFigures?.find((figure) => {
        if (figure.name === hoverOption) {
          figure.changeColor(alpha);
          return;
        }
      });
    });
  }

  private getCurrentOption(figure: Row | ColElement | BoardMainCols) {
    return options.find((option) => option.key === figure.key);
  }

  private createSubColumns(
    colsProps: ColElement[],
    height: number,
    noAction: boolean
  ) {
    let accumulatedWidth = 0;
    const cols = colsProps.map((col, colIndex) => {
      const currentWidth = typeof col.width === "undefined" ? 80 : col.width;

      const option = this.getCurrentOption(col);

      const column = new Figure({
        format: RECTANGLE,
        name: col.name,
        scene: this.scene,
        x: accumulatedWidth,
        y: 0,
        boxWidth: currentWidth,
        boxHeight: height,
        boxAlpha: this.debug && !noAction ? 0.3 : 1,
        // alpha: noAction ? 0.6 : 1,
        // color: this.debug
        //   ? colIndex % 2 === 0
        //     ? 0x0000ff
        //     : 0xf9ca24
        //   : undefined,
        alpha: this.debug && !noAction ? 1 : 0,
        color:
          this.debug && !noAction
            ? colIndex % 2
              ? 0xf368e0
              : 0x0000ff
            : 0xf9ca24,
        text: this.debug && !noAction ? String(option?.key) : undefined,
        onClick: (pointer) => {
          if (!pointer || col?.row) return;

          const chip = this.createChip(currentWidth / 2, height / 2);

          column.add(chip);
        },
        onPointerOver: () => {
          if (noAction) return;

          this.changeFigureColor(col, 0.6);
        },
        onPointerOut: () => {
          if (noAction) return;

          this.changeFigureColor(col, 0);
        },
      });

      // this.options?.push(column);

      accumulatedWidth += currentWidth;

      if (noAction) {
        this.hoverFigures.push(column);
      }

      return column;
    });

    return cols;
  }

  private createSubRows(
    rowsProps: RowElement[],
    width: number,
    noAction: boolean
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
        boxWidth: width,
        boxHeight: currentHeight,
        boxAlpha: this.debug ? (!noAction ? 0 : 0.3) : 0,
        color: this.debug
          ? rowIndex % 2 === 0
            ? 0x0000ff
            : 0xf9ca24
          : undefined,
      });

      if (row.col) {
        const subColumns = this.createSubColumns(
          row.col,
          currentHeight,
          noAction
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
    noAction: boolean = false
  ) {
    const cols = colProps.map((col, colIndex) => {
      // const option = options.find((option) => option.key === col.key);

      const column = new Figure({
        format: RECTANGLE,
        name: col.name,
        scene: this.scene,
        x: width * colIndex,
        y: 0,
        boxWidth: width,
        boxHeight: height,
        text: col.name,
        onClick: (pointer) => {
          if (!pointer || noAction) return;

          if (col?.col) return;
          const chip = this.createChip(width / 2, height / 2);

          column.add(chip);
        },
        onPointerOver: () => {
          if (!isEmpty(col?.col)) return;

          this.changeFigureColor(col, 0.6);
        },

        onPointerOut: () => {
          if (!isEmpty(col?.col)) return;

          this.changeFigureColor(col, 0);
        },
      });

      if (col.row) {
        const centerRectangle = this.createSubRows(col.row, width, noAction);

        column.add(centerRectangle);
      }

      return column;
    });

    return cols;
  }

  private createOptionsHover() {
    const hoverContainer = this.scene.add.container(0, 0);

    let accumulatedWidth = 0;

    const cols = mainColsHover.map((col) => {
      const figure =
        col.type === POLYGON
          ? new Figure({
              format: POLYGON,
              points: col.points || [],
              name: col.name,
              scene: this.scene,
              boxHeight: col.height,
              boxWidth: col.width,
              x: accumulatedWidth,
              y: 0,
              color: 0xf9ca24,
              alpha: 0,
            })
          : new Figure({
              format: RECTANGLE,
              name: col.name,
              scene: this.scene,
              boxHeight: col.height,
              boxWidth: col.width,
              x: accumulatedWidth,
              y: 0,
            });

      if (col.type === POLYGON) {
        this.hoverFigures.push(figure);
      }

      if (col.col) {
        const columns = this.createColumns(
          col.col || [],
          col.width / col.col.length,
          col.height,
          true
        );

        figure.add(columns);
      }
      accumulatedWidth += col.width;

      return figure;
    });

    hoverContainer.add(cols);

    return hoverContainer;
  }

  private createRows(rows: Row[], width: number) {
    let accumulatedHeight = 0;

    const rowsContainer = rows.map((row, rowIndex) => {
      const option = this.getCurrentOption(row);
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
        boxAlpha: this.debug ? 0.3 : 0,
        text: this.debug ? option?.alias : "",
        name: row.name,
        onClick: (pointer) => {
          if (!pointer) return;

          if (!isEmpty(row?.col)) return;
          const chip = this.createChip(currentWidth / 2, row.height / 2);

          rowFigure.add(chip);
        },
        onPointerOver: () => {
          if (!isEmpty(row?.col)) return;

          this.changeFigureColor(row, 0.6);
        },
        onPointerOut: () => {
          if (!isEmpty(row?.col)) return;

          this.changeFigureColor(row, 0);
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
    column: BoardMainCols;
    accumulatedWidth: number;
    height: number;
    onClick: (pointer?: PointerEvent) => void;
  }) {
    const option = this.getCurrentOption(column);

    const figure =
      column.type === POLYGON
        ? new Figure({
            scene: this.scene,
            name: column.name,
            format: POLYGON,
            points: column.points || [],
            boxHeight: height,
            boxWidth: column.width,
            x: accumulatedWidth,
            y: 0,
            color: 0xf368e0,
            boxAlpha: this.debug ? 0.2 : 0,
            onClick: onClick,
            text: option?.alias,
            onPointerOver: () => {
              this.changeFigureColor(column, 0.6);
            },
            onPointerOut: () => {
              this.changeFigureColor(column, 0);
            },
          })
        : new Figure({
            scene: this.scene,
            name: column.name,
            format: RECTANGLE,
            boxHeight: height,
            boxWidth: column.width,
            x: accumulatedWidth,
            y: 0,
            onClick: onClick,
            text: option?.alias,
            boxAlpha: this.debug ? 0.2 : 0,
          });

    if (column.hoverOptions) {
      this.hoverFigures.push(figure);
    }

    return figure;
  }

  private mainColFigures(column: BoardMainCols, accumulatedWidth: number) {
    const height = column.height || drawingBoard.height;

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

    const columnFigure = this.createMainFigures({
      accumulatedWidth,
      column,
      height,
      onClick,
    });

    return columnFigure;
  }

  private mainColumns() {
    let accumulatedWidth = 0;

    const columns = drawingBoard.cols.map((column) => {
      const figure = this.mainColFigures(column, accumulatedWidth);

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
