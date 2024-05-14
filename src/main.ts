//  Find out more information about the Game Config at:

import { Boot } from "./scenes/Boot";
import { Game } from "./scenes/Game";
import { MainMenu } from "./scenes/Main";
import { Preloader } from "./scenes/Preloader";

//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = new Phaser.Game({
  type: Phaser.WEBGL,
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  parent: "game-container",
  backgroundColor: "#028af8",
  scene: [Boot, Preloader, MainMenu, Game],
  disableContextMenu: true,
  dom: { createContainer: true },
  height: 1080,
  width: 1920,
});

declare global {
  interface Window {
    __PHASER_GAME__: import("phaser").Game;
  }

  interface GlobalThis {
    __PHASER_GAME__: import("phaser").Game;
  }
}

const game = config;
window.__PHASER_GAME__ = game;

export default config;
