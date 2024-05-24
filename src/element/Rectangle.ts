interface RectangleConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  boxWidth: number;
  boxHeight: number;
  boxAlpha?: number;
  color?: number;
  onClick?: (pointer?: PointerEvent) => void;
  onPointerOver?: (pointer?: PointerEvent) => void;
  onPointerOut?: (pointer?: PointerEvent) => void;
  text?: string;
}

export class RectangleContainer extends Phaser.GameObjects.Container {
  private color?: number;
  private onClick?: (pointer: PointerEvent) => void;
  private text?: string;
  private boxWidth: number = 50;
  private boxHeight: number = 50;
  private boxAlpha: number = 1;
  private onPointerOver?: (pointer?: PointerEvent) => void;
  private onPointerOut?: (pointer?: PointerEvent) => void;
  private graphics?: Phaser.GameObjects.Graphics;

  constructor(config: RectangleConfig) {
    super(config.scene, config.x, config.y);

    this.color = config.color;
    this.onClick = config.onClick;
    this.onPointerOver = config.onPointerOver;
    this.onPointerOut = config.onPointerOut;
    this.text = config.text;
    this.boxWidth = config.boxWidth;
    this.boxHeight = config.boxHeight;
    this.boxAlpha = typeof config.boxAlpha === "number" ? config.boxAlpha : 1;

    this.create();

    this.scene.add.existing(this);
  }

  private create() {
    const rect = this.createRectangle();
    const graphics = this.createGraphics();
    this.graphics = graphics;

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

  private createRectangle(
    width: number = this.boxWidth,
    height: number = this.boxHeight,
    x: number = 0,
    y: number = 0
  ) {
    const rect = new Phaser.Geom.Rectangle(x, y, width, height);

    return rect;
  }

  private createGraphics() {
    const graphics = this.scene.add.graphics({
      fillStyle: { color: this.color, alpha: this.color ? this.boxAlpha : 0 },
    });

    if (typeof this.color === "number") {
      graphics.lineStyle(1, this.color, this.color ? this.boxAlpha : 0);
    }

    return graphics;
  }
  public changeColor(
    color: number,
    alpha: number = 1,
    width?: number,
    height?: number,
    x?: number,
    y?: number

    // points?: number[] | Phaser.Types.Math.Vector2Like[]
  ) {
    if (this.graphics) {
      this.graphics.clear();
      this.graphics.fillStyle(color, alpha);
      this.graphics.lineStyle(1, color, alpha);

      const rect = this.createRectangle(width, height, x, y);
      this.graphics.fillRectShape(rect);
    }
  }

  private addInteractive(
    graphics: Phaser.GameObjects.Graphics,
    rect: Phaser.Geom.Rectangle
  ) {
    graphics.setInteractive(rect, Phaser.Geom.Rectangle.Contains);
    graphics.on("pointerdown", (pointer: PointerEvent) => {
      this.onClick?.(pointer);
    });

    graphics.on("pointerover", (pointer: PointerEvent) => {
      this.onPointerOver?.(pointer);
    });

    graphics.on("pointerout", (pointer: PointerEvent) => {
      this.changeColor(this.color || 0x000000, this.color ? this.boxAlpha : 0);
      this.onPointerOut?.(pointer);
    });
  }

  private createText() {
    const text = this.scene.add.text(0, 0, this.text || "empty", {
      align: "center",
      fontSize: "12px",
    });

    text.setOrigin(0.5);

    text.setPosition(this.boxWidth / 2, this.boxHeight / 2);

    return text;
  }
}
