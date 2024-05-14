import { Scene } from "phaser";

const firstRow = [
  {
    label: "3",
    value: 3,
  },
  {
    label: "6",
    value: 6,
  },
  {
    label: "9",
    value: 9,
  },
  {
    label: "12",
    value: 12,
  },
  {
    label: "15",
    value: 15,
  },
  {
    label: "18",
    value: 18,
  },
  {
    label: "21",
    value: 21,
  },
  {
    label: "24",
    value: 24,
  },
  {
    label: "27",
    value: 27,
  },
  {
    label: "30",
    value: 30,
  },
  {
    label: "33",
    value: 33,
  },
  {
    label: "36",
    value: 36,
  },
];

const rows = [firstRow];

const cols = [rows];

const drawerBoard = [cols];

export class Game extends Scene {
  image?: Phaser.GameObjects.Image;
  constructor() {
    super("Game");
  }

  create() {
    this.cameras.main.setBackgroundColor(0x00ff00);

    this.image = this.createBoard();

    // this.input.once("pointerdown", () => {
    //   this.scene.start("GameOver");
    // });
    // this.createRects();
    // this.createOneRect();
    this.createBoardDrawer();
  }

  createBoard() {
    const image = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "board"
    );

    image.setOrigin(0.5);

    return image;
  }
  createBoardDrawer() {
    const getBoundsImage = this.image?.getBounds();
    if (!getBoundsImage) return;

    const { x, y, width, height } = getBoundsImage;
    const initialX = x + 87.5;

    drawerBoard.map((col, colIndex) => {
      col.map((row, rowIndex) => {
        row.map((cell, cellIndex) => {
          cell.map((rect, rectIndex) => {
            const newX = initialX + 78.2 * rectIndex;
            const newY = y + 22;

            return this.createOneRect({ x: newX, y: newY, label: rect.label });
          });
        });
      });
    });
  }

  createOneRect({ x, y, label }: { x: number; y: number; label: string }) {
    const rect = new Phaser.Geom.Rectangle(0, 0, 56, 56);

    const text = this.add.text(0, 0, label, {
      align: "center",
      fontSize: "32px",
    });

    const graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });

    graphics.fillRectShape(rect);

    graphics.setInteractive(rect, Phaser.Geom.Rectangle.Contains);
    graphics.on("pointerdown", () => {
      console.log("click", label);
    });

    const container = this.add.container(x, y, [graphics, text]);

    text.setPosition(28 - text.width / 2, 28 - text.height / 2);

    return container;
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
