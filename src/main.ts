import Phaser from "phaser"
import { Player } from "./classes/player"

class MainScene extends Phaser.Scene {
    preload() {
        this.load.image("player", "assets/ship.png")
    }

    create() {
        new Player(this, 600, 325)
    }

    update() {

    }
}

const config = {
    type: Phaser.WEBGL,
    width: 1200,
    height: 650,
    scene: MainScene,

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