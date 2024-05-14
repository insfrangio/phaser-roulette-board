import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    // this.add.image(512, 384, "background");

    const image = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "logo"
    );

    this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + 200,
        "Phaser - Boilerplate\nClick to start!",
        {
          fontFamily: "Arial Black",
          fontSize: 38,
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 8,
          align: "center",
        }
      )
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}