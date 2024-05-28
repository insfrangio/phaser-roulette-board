import { RectangleContainer } from "./Figure";

interface MainRectangleConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  boxX: number;
  boxY: number;
  boxWidth: number;
  boxHeight: number;
}

export class MainRectangle extends Phaser.GameObjects.Container {
  private boxWidth: number;
  private boxHeight: number;
  private boxX: number;
  private boxY: number;

  constructor(config: MainRectangleConfig) {
    super(config.scene, config.boxX, config.boxY);
    this.boxWidth = config.boxWidth;
    this.boxHeight = config.boxHeight;
    this.boxX = config.boxX;
    this.boxY = config.boxY;

    this.create();

    this.scene.add.existing(this);
  }

  private create() {
    const mainRectangle = new RectangleContainer({
      scene: this.scene,
      x: this.boxX,
      y: this.boxY,
      color: 0x00ff00,
      boxWidth: this.boxWidth,
      boxHeight: this.boxHeight,
      onClick: () => {
        alert("click");
      },
    }).setAlpha(0.2);

    this.add(mainRectangle);
  }
}
