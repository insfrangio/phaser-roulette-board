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
}
