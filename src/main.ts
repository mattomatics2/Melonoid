import Phaser from "phaser"
import { Player } from "./classes/player"
import { Spawner } from "./classes/spawner"

import type { Bullet } from "./classes/bullet"
import type { Melon } from "./classes/melon"

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
        this.load.image("halfMelon", "assets/half-melon.png")
        this.load.image("smallMelon", "assets/small-melon.png")
        this.load.image("flash", "assets/flash.png")
    }

    create() {
        // setup collision groups
        const groups: groups = {
            player: this.physics.add.group(),
            bullets: this.physics.add.group(),
            melons: this.physics.add.group()
        }

        // create objects
        new Player(this, groups, 600, 325)
        new Spawner(this, groups)

        // bullet/melon collision
        this.physics.add.overlap(groups.bullets, groups.melons, (bullet, melon) => {
            (bullet as Bullet).remove();
            (melon as Melon).damage();
        })

        // player death
        this.physics.add.overlap(groups.melons, groups.player, (melon, player) => {
            
        })
    }

    update() {
        
    }
}

const config = {
    type: Phaser.WEBGL,
    width: 1100,
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