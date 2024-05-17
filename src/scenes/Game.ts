import { Scene } from "phaser";
import { Board } from "../element";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    this.cameras.main.setBackgroundColor(0x00333);

    const board = new Board({
      scene: this,
      x: this.cameras.main.width / 2,
      y: this.cameras.main.height / 2,
    });

    this.add.existing(board);
  }

  private createMainColumns() {
    // drawerBoard.map((col, colIndex) => {
    //   console.log(colIndex, col);
    // });
  }

  createBoardDrawer() {
    // drawerBoard.map((col, colIndex) => {
    //   col.map((row, rowIndex) => {
    //     row.map((cell, cellIndex) => {
    //       cell.map((rect, rectIndex) => {
    //         const newX = initialX + 78.2 * rectIndex;
    //         const newY = y + 22;
    //         return this.createOneRect({ x: newX, y: newY, label: rect.label });
    //       });
    //     });
    //   });
    // });
  }

  createRects() {
    const rect = new Phaser.Geom.Rectangle(0, 0, 160, 120);

    rect.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

    const graphics = this.add.graphics({ lineStyle: { color: 0xff0000 } });
    graphics.strokeRectShape(rect);

    // move right by width
    rect.x += rect.width;

    graphics.lineStyle(1, 0x00ff00);
    graphics.strokeRectShape(rect);

    // move down by height
    rect.y += rect.height;

    graphics.lineStyle(1, 0x0000ff);
    graphics.strokeRectShape(rect);
  }
}
