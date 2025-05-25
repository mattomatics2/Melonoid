import { Player } from "../classes/player"
import { HitBlock } from "../classes/hitblock"
import { GameState } from "../classes/globals"

import type { groups } from "./battle"
import type { Bullet } from "../classes/bullet"

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
        this.load.audio("blockHit", "sounds/block-hit.wav")
        this.load.audio("cashRegister", "sounds/cash-register.mp3")
    }

    create() {
         // create collision groups
        const groups: groups = {
            player: this.physics.add.group(),
            bullets: this.physics.add.group(),
            melons: this.physics.add.group()
        }

        // setup
        this.cameras.main.fadeIn(750)
        this.setupUpgrades(groups)
       
        // create objects
        new Player(this, groups, 600, 325)

        // bullet/hitblock collision
        this.physics.add.overlap(groups.bullets, groups.melons, (bullet, hitblock) => {
            (bullet as Bullet).destroy();
            (hitblock as HitBlock).hit();
        })
    }

    protected setupUpgrades(groups: groups): void {
        // fire count
        new HitBlock(this, groups, 300, 550, {
            title: "Fire Count",
            subtitle: "1 -> 2",
            price: 150
        }, () => console.log("fire count"))

        // fire delay
        new HitBlock(this, groups, 550, 550, {
            title: "Fire Delay",
            subtitle: "225 -> 200",
            price: 50
        }, () => console.log("fire delay"))

        // damage
        new HitBlock(this, groups, 800, 550, {
            title: "Damage",
            subtitle: "10 -> 12",
            price: 150
        }, () => console.log("damage"))
    }
}