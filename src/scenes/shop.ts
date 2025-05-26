import { Player } from "../objects/player"
import { Globals } from "../globals"
import { Hitblock } from "../objects/hitblock"
import { Notifier } from "../effects/notifier"
import type { groups } from "../types"
import type { Bullet } from "../objects/bullet"

export class ShopScene extends Phaser.Scene {
    constructor() {
        super("Shop")
    }

    protected preload(): void {
        // images
        this.load.image("player", "images/ship.png")
        this.load.image("bullet", "images/bullet.png")
        this.load.image("hitblock", "images/hitblock.png")

        // sounds
        this.load.audio("melonHit", "sounds/melon-hit.wav")
        this.load.audio("laserShoot", "sounds/laser-shoot.wav")
        this.load.audio("blockHit", "sounds/block-hit.wav")
        this.load.audio("cashRegister", "sounds/cash-register.mp3")
        this.load.audio("error", "sounds/error.wav")
    }

    protected create(): void {
        // setup items
        const groups: groups = {
            player: this.physics.add.group(),
            bullets: this.physics.add.group(),
            enemies: this.physics.add.group()
        }

        const cashLabel = this.add.text(550, 25, `$${Globals.cash}`, {
            fontSize: "24px",
            fontStyle: "bold",
            color: "#52b04c"
        })

        // properties
        this.cameras.main.fadeIn(500)
        cashLabel.setOrigin(0.5, 0)
        cashLabel.setDepth(10)
        this.setupCollisions(groups)
        this.setupUpgrades(groups, cashLabel)

        // create objects
        const player = new Player(this, groups, 550, 325)
        player.enableWrapping = false

        player.eventEmitter.on("OutOfBounds", () => {
            player.destroy()
            this.cameras.main.fadeOut(500)
            this.time.delayedCall(600, () => this.scene.start("Battle"))
        })

        // notifier
        const notifier = new Notifier(this)
        notifier.playOnce("tutorial2", "Purchase upgrades by shooting on them. Return to battle by leaving the screen.")
    }

    protected setupCollisions(groups: groups): void {
        // bullet/hitblock
        this.physics.add.overlap(groups.bullets, groups.enemies, (bullet, hitblock) => {
            (bullet as Bullet).destroy();
            (hitblock as Hitblock).damage();
        })
    }

    protected setupUpgrades(groups: groups, cashLabel: Phaser.GameObjects.Text): void {
        // prices
        const fireCountPrice = Globals.fireCountCost * Globals.fireCount
        const fireDelayPrice = 50 + ((225 - Globals.fireDelay) / 25) * Globals.fireDelayCost
        const fireDamagePrice = (Globals.fireDamage - 10 + 1) * Globals.fireDamageCost

        // fire count
        new Hitblock(this, groups, 200, 550, {
            title: "Fire Count",
            subtitle: `${Globals.fireCount} ➤ ${Globals.fireCount + 1}`,
            price: fireCountPrice,
            handler: () => {
                cashLabel.setText(`$${Globals.cash}`)
                Globals.fireCount ++
            }
        })

        // fire delay
        new Hitblock(this, groups, 550, 550, {
            title: "Fire Delay",
            subtitle: `${Globals.fireDelay} ➤ ${Globals.fireDelay - 25}`,
            price: fireDelayPrice,
            handler: () => {
                cashLabel.setText(`$${Globals.cash}`)
                Globals.fireDelay -= 25
            }
        })

        // fire damage
        new Hitblock(this, groups, 900, 550, {
            title: "Damage",
            subtitle: `${Globals.fireDamage} ➤ ${Globals.fireDamage + 1}`,
            price: fireDamagePrice,
            handler: () => {
                cashLabel.setText(`$${Globals.cash}`)
                Globals.fireDamage ++
            }
        })
    }
}