interface RectangleConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  boxWidth: number;
  boxHeight: number;
  color: number;
  onClick?: () => void;
  text?: string;
}

export class RectangleContainer extends Phaser.GameObjects.Container {
  private color: number = 0x000000;
  private onClick?: () => void;
  private text?: string;
  private boxWidth: number = 50;
  private boxHeight: number = 50;

  constructor(config: RectangleConfig) {
    super(config.scene, config.x, config.y);

    this.color = config.color;
    this.onClick = config.onClick;
    this.text = config.text;
    this.boxWidth = config.boxWidth;
    this.boxHeight = config.boxHeight;

    this.create();

    this.scene.add.existing(this);
  }

  private create() {
    const rect = this.createRectangle();
    const graphics = this.createGraphics();

    graphics.fillRectShape(rect);

    if (this.onClick) {
      this.addInteractive(graphics, rect);
    }

    // const container = this.scene.add.container(this.x, this.y);

    this.add(graphics);
    if (this.text) {
      const text = this.createText();
      this.add(text);
    }
  }

  private createRectangle() {
    const rect = new Phaser.Geom.Rectangle(0, 0, this.boxWidth, this.boxHeight);

    return rect;
  }

  private createGraphics() {
    const graphics = this.scene.add.graphics({
      fillStyle: { color: this.color },
    });

    graphics.lineStyle(1, 0xff0000);

    return graphics;
  }

  private addInteractive(
    graphics: Phaser.GameObjects.Graphics,
    rect: Phaser.Geom.Rectangle
  ) {
    graphics.setInteractive(rect, Phaser.Geom.Rectangle.Contains);
    graphics.on("pointerdown", () => {
      this.onClick?.();
    });
  }

  private createText() {
    const text = this.scene.add.text(0, 0, this.text || "empty", {
      align: "center",
      fontSize: "32px",
    });

    text.setOrigin(0.5);

    text.setPosition(this.boxWidth / 2, this.boxHeight / 2);

    return text;
  }
}
