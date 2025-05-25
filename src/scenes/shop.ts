import { Player } from "../classes/player"
import { HitBlock } from "../classes/hitblock"
import type { groups } from "./battle"

export class ShopScene extends Phaser.Scene {
    constructor() {
        super("Shop")
    }

    preload() {
        // images
        this.load.image("player", "images/ship.png")
        this.load.image("bullet", "images/bullet.png")
        this.load.image("hitblock", "images/hitblock.png")

        // sounds
        this.load.audio("melonHit", "sounds/melon-hit.wav")
        this.load.audio("laserShoot", "sounds/laser-shoot.wav")
    }

    create() {
        // fade in the scene
        this.cameras.main.fadeIn(1000)

        // collision groups
        const groups: groups = {
            player: this.physics.add.group(),
            bullets: this.physics.add.group(),
            melons: this.physics.add.group()
        }

        // create objects
        new Player(this, groups, 600, 325)
        new HitBlock(this, groups, 500, 500)
    }

    update() {
        
    }
}