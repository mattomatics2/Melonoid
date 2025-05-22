import Phaser from "phaser"
import { Player } from "./classes/player"
import { Spawner } from "./classes/spawner"

export type groups = {
    player: Phaser.Physics.Arcade.Group;
    bullets: Phaser.Physics.Arcade.Group;
    melons: Phaser.Physics.Arcade.Group;
}

class MainScene extends Phaser.Scene {
    preload() {
        this.load.image("player", "assets/ship.png")
        this.load.image("bullet", "assets/bullet.png")
        this.load.image("largeMelon", "assets/large-melon.png")
    }

    create() {
        const groups: groups = {
            player: this.physics.add.group(),
            bullets: this.physics.add.group(),
            melons: this.physics.add.group()
        }

        new Player(this, 600, 325, groups)
        new Spawner(this, groups)
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