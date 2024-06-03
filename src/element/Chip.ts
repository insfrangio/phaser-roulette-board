export class Chip extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "chip");

    this.setOrigin(0.5);
  }
}
