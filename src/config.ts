import { MainScene } from './scenes/main';
import { HangmanScene } from "./scenes/hangman"
import Phaser from "phaser"

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Games',
  version: '2.0',
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [HangmanScene]
};
