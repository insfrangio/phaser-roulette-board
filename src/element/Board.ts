import { drawerBoard } from "../const";
import { Col, Cols } from "../types";
import { MainRectangle } from "./MainRectangle";
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
      y + 8,
      width - 16,
      height - 4
    );

    return mainRectangle;
  }

  private createMainRectangle(
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    console.log("boxWidth", width, "boxHeight", height);
    const mainRectangle = new RectangleContainer({
      scene: this.scene,
      x,
      y,
      color: 0xff0000,
      boxAlpha: 0.2,
      boxWidth: width,
      boxHeight: height,
      onClick: () => {
        alert("click");
      },
    });

    const mainColumns = this.createMainColumns(mainRectangle);

    mainRectangle.add(mainColumns);

    return mainRectangle;
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
        boxAlpha: 0.4,
        text: col.label,
        onClick: (pointer) => {
          if (!pointer) return;

          if (col?.col) return;
          const chip = this.createChip(width / 2, height / 2);

          column.add(chip);
        },
      });

      return column;
    });

    return cols;
  }
  private createBColumns(col: Col[], width: number) {
    // console.log(col);

    const rows = col.map((row, rowIndex) => {
      const boxWidth = rowIndex === 0 ? width : width - 20;
      const boxX = rowIndex === 0 ? 0 : 10;

      const rowMain = new RectangleContainer({
        scene: this.scene,
        x: boxX,
        y: row.y,
        color: rowIndex % 2 === 0 ? 0xe67e22 : 0xf368e0,
        boxWidth: boxWidth,
        boxHeight: row.height,
        boxAlpha: 0.4,
        text: row.label,
        onClick: (pointer) => {
          if (!pointer) return;

          if (row?.col) return;
          const chip = this.createChip(boxWidth / 2, row.height / 2);

          rowMain.add(chip);
        },
      });

      if (row.col) {
        const otherColumns = this.createOtherColumns(
          row.col,
          boxWidth / 3,
          row.height
        );
        rowMain.add(otherColumns);
      }

      return rowMain;
    });

    return rows;
  }

  private createMainColumns(container: Phaser.GameObjects.Container) {
    const containers = drawerBoard.map((col, colIndex) => {
      const column = new RectangleContainer({
        scene: this.scene,
        x: col.x,
        y: 0,
        color: colIndex % 2 === 0 ? 0x00ff00 : 0x0000ff,
        boxWidth: col.width,
        boxHeight: col.height,
        boxAlpha: 0.4,
        text: col.label,
        onClick: (pointer) => {
          if (!pointer) return;

          if (col?.col) return;
          const chip = this.createChip(col.width / 2, col.height / 2);

          column.add(chip);
        },
      });

      if (col.col) {
        column.add(this.createBColumns(col.col, col.width));
      }

      return column;
    });

    console.log("containers", containers);

    return containers;
  }
}
