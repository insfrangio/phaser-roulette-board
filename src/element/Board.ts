import { drawerBoard } from "../const";
import { Col, Row } from "../types";
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

  private create() {
    const bgImage = this.createBackgroundImage();
    const mainContainer = this.createBoard(bgImage);

    this.add([bgImage, mainContainer]);
  }

  private createChip(x: number, y: number) {
    const chip = this.scene.add.image(x, y, "chip");

    chip.setOrigin(0.5);

    return chip;
  }

  private createBackgroundImage() {
    const image = this.scene.add.image(0, 0, "board");

    image.setOrigin(0.5);

    return image;
  }

  private createBoard(bgImage: Phaser.GameObjects.Image) {
    const boundsImage = bgImage.getBounds();

    const { x, y, width, height } = boundsImage;

    const mainRectangle = this.createMainRectangle(
      x + 7,
      y + 12,
      width - 16,
      height - 12
    );

    return mainRectangle;
  }

  private createMainRectangle(
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    const mainRectangle = new RectangleContainer({
      scene: this.scene,
      x,
      y,
      color: 0xff0000,
      boxAlpha: 0,
      boxWidth: width,
      boxHeight: height,
      onClick: () => {
        alert("click");
      },
    });

    const mainColumns = this.createMainColumns(height);

    mainRectangle.add(mainColumns);

    return mainRectangle;
  }

  private createSubColumns(colsProps: Col[], width: number, height: number) {
    console.log("colsProps", colsProps);

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
          if (!pointer) return;

          if (col?.row) return;
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

  private createCenterRectangle(
    rowsProps: Row[],
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
        onClick: (pointer) => {
          if (!pointer) return;

          if (row?.col) return;
          // const chip = this.createChip(width / 2, height / 2);

          // rowRect.add(chip);
        },
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

  private createOtherColumns(colProps: Col[], width: number, height: number) {
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
        const centerRectangle = this.createCenterRectangle(
          col.row,
          width,
          height
        );
        column.add(centerRectangle);
      }

      return column;
    });

    return cols;
  }
  private createRows(rows: Row[], width: number) {
    const columns = rows.map((row, rowIndex) => {
      const currentWidth = row.width || width;

      const rowMain = new RectangleContainer({
        scene: this.scene,
        x: row.x,
        y: row.y,
        color: rowIndex % 2 === 0 ? 0xe67e22 : 0xf368e0,
        boxWidth: currentWidth,
        boxHeight: row.height || 0,
        boxAlpha: 0,
        // text: row.label,
        onClick: (pointer) => {
          if (!pointer) return;

          if (row?.col || typeof row.height === "undefined") return;
          const chip = this.createChip(currentWidth / 2, row.height / 2);

          rowMain.add(chip);
        },
      });

      if (row.col) {
        const otherColumns = this.createOtherColumns(
          row.col,
          currentWidth / row.col.length,
          row.height || 0
        );
        rowMain.add(otherColumns);
      }

      return rowMain;
    });

    return columns;
  }

  private createMainColumns(height: number) {
    const containers = drawerBoard.map((column, colIndex) => {
      const columns = new RectangleContainer({
        scene: this.scene,
        x: column.x,
        y: 0,
        color: colIndex % 2 === 0 ? 0x00ff00 : 0x0000ff,
        boxWidth: column.width,
        boxHeight: column.height ? column.height : height,
        boxAlpha: 0,
        // text: column.label,
        onClick: (pointer) => {
          if (!pointer) return;

          if (column?.row) return;
          const chip = this.createChip(column.width / 2, column.height / 2);

          columns.add(chip);
        },
      });

      if (column?.row) {
        columns.add(this.createRows(column.row, column.width));
      }

      return columns;
    });

    return containers;
  }
}
