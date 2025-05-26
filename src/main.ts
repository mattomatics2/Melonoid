import Phaser from "phaser"
import { BattleScene } from "./scenes/battle"
import { ShopScene } from "./scenes/shop"
import { UpgradeTree } from "./scenes/tree"

const config = {
    type: Phaser.WEBGL,
    width: 1100,
    height: 650,
    // scene: [BattleScene, ShopScene, UpgradeTree],
    scene: [UpgradeTree],
    scale: {mode: Phaser.Scale.FIT},

    physics: {
        default: "arcade",
        arcade: {
            gravity: {x: 0, y: 0}
        }
    }
}

new Phaser.Game(config)