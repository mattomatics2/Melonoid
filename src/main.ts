import Phaser from "phaser"
import { Player } from "./classes/player"
import { Spawner } from "./classes/spawner"

class MainScene extends Phaser.Scene {
    preload() {
        this.load.image("player", "assets/ship.png")
        this.load.image("bullet", "assets/bullet.png")
        this.load.image("largeMelon", "assets/large-melon.png")
    }

    create() {
        new Player(this, 600, 325)
        new Spawner(this)
    }

    update() {
        console.log(this.game.loop.actualFps)
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