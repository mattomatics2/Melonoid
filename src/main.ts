import Phaser from "phaser"
import { BattleScene } from "./scenes/battle"
import { ShopScene } from "./scenes/shop"

const config = {
    type: Phaser.WEBGL,
    width: 1100,
    height: 650,
    scene: [BattleScene, ShopScene],

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: "arcade",
        arcade: {
            gravity: {x: 0, y: 0}
        }
    }
}

new Phaser.Game(config)