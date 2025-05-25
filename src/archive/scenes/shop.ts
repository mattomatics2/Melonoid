import { Player } from "../classes/player"
import { HitBlock } from "../classes/hitblock"
import { GameState } from "../classes/globals"
import { Notifier } from "../classes/notification"

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
         // object setup
        const groups: groups = {
            player: this.physics.add.group(),
            bullets: this.physics.add.group(),
            melons: this.physics.add.group()
        }

        const cashLabel = this.add.text(550, 15, "$9999", {
            fontSize: "18px",
            fontStyle: "bold",
            color: "#52b04c"
        })

        // setup
        this.cameras.main.fadeIn(500)
        this.setupUpgrades(groups, cashLabel)
        cashLabel.setOrigin(0.5, 0)
       
        // create objects
        const player = new Player(this, groups, 600, 325)

        player.leftScreen.on("leftScreen", () => {
            player.destroy(true)
            this.cameras.main.fadeOut(500)
            setTimeout(() => this.scene.start("Battle"), 600)
        })

        // bullet/hitblock collision
        this.physics.add.overlap(groups.bullets, groups.melons, (bullet, hitblock) => {
            (bullet as Bullet).destroy();
            (hitblock as HitBlock).hit();
        })

        const notifier = new Notifier(this)
        notifier.playOnce("tutorial2", "You can purchase upgrades by shooting them. When you're ready to leave, fly off the screen.")
    }

    protected setupUpgrades(groups: groups, cashLabel: Phaser.GameObjects.Text): void {
        // fire count
        new HitBlock(this, groups, 300, 550, {
            title: "Fire Count",
            subtitle: `${GameState.fireCount} -> ${GameState.fireCount + 1}`,
            price: 250
        }, () => {
            cashLabel.setText("$999")
            GameState.fireCount ++
        })

        // fire delay
        new HitBlock(this, groups, 550, 550, {
            title: "Fire Delay",
            subtitle: `${GameState.fireRate} -> ${GameState.fireRate - 20}`,
            price: 50
        }, () => {
            cashLabel.setText("$999")
            GameState.fireRate -= 20
        })

        // damage
        new HitBlock(this, groups, 800, 550, {
            title: "Damage",
            subtitle: `${GameState.fireDamage} -> ${GameState.fireDamage + 1}`,
            price: 150
        }, () => {
            cashLabel.setText("$999")
            GameState.fireDamage += 1
        })
    }
}