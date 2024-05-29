import { BoardColFigure, Point } from "../types";

interface BaseConfig {
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
  name: string;
  format: BoardColFigure;
  alpha?: number;
  // format: "rectangle" | "polygon";
}

// interface PolygonSpecificConfig {
//   points: Point[];
// }

type FigureConfig = BaseConfig &
  (
    | { format: BoardColFigure.RECTANGLE; points?: never }
    | { format: BoardColFigure.POLYGON; points?: Point[] }
  );

export class Figure extends Phaser.GameObjects.Container {
  private color?: number;
  private onClick?: (pointer: PointerEvent) => void;
  private text?: string;
  private boxWidth: number = 50;
  private boxHeight: number = 50;
  private boxAlpha: number = 1;
  private onPointerOver?: (pointer?: PointerEvent) => void;
  private onPointerOut?: (pointer?: PointerEvent) => void;
  private format: BoardColFigure = BoardColFigure.RECTANGLE;
  private points?: Point[] = [];

  constructor(config: FigureConfig) {
    super(config.scene, config.x, config.y);

    this.setName(config.name);
    this.color = config.color;
    this.onClick = config.onClick;
    this.onPointerOver = config.onPointerOver;
    this.onPointerOut = config.onPointerOut;
    this.text = config.text;
    this.boxWidth = config.boxWidth;
    this.boxHeight = config.boxHeight;
    this.boxAlpha = typeof config.boxAlpha === "number" ? config.boxAlpha : 0;
    this.format = config.format;
    this.points = config.points ? config.points : [];
    this.setAlpha(config.alpha);

    this.create();

    this.scene.add.existing(this);
  }

  private create() {
    const figure =
      this.format === BoardColFigure.RECTANGLE
        ? this.createRectangle()
        : this.createPolygon();

    const graphics = this.createGraphics();

    if (figure instanceof Phaser.Geom.Polygon) {
      graphics.fillPoints(figure.points, true);
    } else {
      graphics.fillRectShape(figure);
    }

    if (this.onClick) {
      this.addInteractive(graphics, figure);
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

  private createPolygon() {
    const polygon = new Phaser.Geom.Polygon(this.points);

    return polygon;
  }

  private createGraphics() {
    const graphics = this.scene.add.graphics({
      fillStyle: { color: this.color, alpha: this.boxAlpha },
    });

    if (typeof this.color === "number") {
      graphics.lineStyle(1, this.color, this.boxAlpha);
    }

    graphics.setName(`${this.name}-graphics`);

    return graphics;
  }
  public changeColor(alpha: number = 1) {
    this.setAlpha(alpha);
    // if (this.graphics) {
    //   this.graphics.clear();
    //   this.graphics.fillStyle(color, alpha);
    //   this.graphics.lineStyle(1, color, alpha);

    //   if (this.format === BoardColFigure.POLYGON) {
    //   const polygon = this.createPolygon();
    //   this.graphics.fillPoints(polygon.points, true);
    //   }

    //   const rect = this.createRectangle(
    //     this.boxWidth,
    //     this.boxHeight,
    //     this.x,
    //     this.y
    //   );
    //   this.graphics.fillRectShape(rect);
    // }
  }

  private addInteractive(
    graphics: Phaser.GameObjects.Graphics,
    rect: Phaser.Geom.Rectangle | Phaser.Geom.Polygon
  ) {
    const contains =
      this.format === BoardColFigure.RECTANGLE
        ? Phaser.Geom.Rectangle.Contains
        : Phaser.Geom.Polygon.Contains;

    graphics.setInteractive(rect, contains);
    graphics.on("pointerdown", (pointer: PointerEvent) => {
      this.onClick?.(pointer);
    });

    graphics.on("pointerover", (pointer: PointerEvent) => {
      this.onPointerOver?.(pointer);
    });

    graphics.on("pointerout", (pointer: PointerEvent) => {
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