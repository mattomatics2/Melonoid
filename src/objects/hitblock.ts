import { Globals } from "../globals"
import type { groups } from "../types";

type hitblock = {
    title: string,
    subtitle: string,
    price: integer,
    handler: () => void
}

export class Hitblock extends Phaser.Physics.Arcade.Sprite {
    private label: Phaser.GameObjects.Text
    private config: hitblock
    private groups: groups
    private startY: integer

    private health = 10 * Globals.fireCount
    private purchased = false

    constructor(scene: Phaser.Scene, groups: groups, x: integer, y: integer, config: hitblock) {
        super(scene, x, y, "hitblock")

        this.label = this.scene.add.text(this.x, this.y, `$${config.price}`, {
            fontStyle: "bold",
            fontSize: "24px",
            color: "#544724"
        })

        this.config = config
        this.groups = groups
        this.startY = y
        this.setup()
    }

    protected setup(): void {
        // add sprite to scene
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.groups.enemies.add(this)

        // properties
        this.setScale(0.5)
        this.setDepth(3)
        this.setupLabels()
    }

    protected setupLabels(): void {
        // content
        this.label.setOrigin(0.5, 0.5)
        this.label.setDepth(4)

        // title
        this.scene.add.text(this.x, this.y - 60, this.config.title, {
            fontStyle: "bold",
            fontSize: "24px",
            color: "#bababa"
        }).setOrigin(0.5, 0.5)

        // subtitle
        this.scene.add.text(this.x, this.y - 37, this.config.subtitle, {
            fontSize: "18px",
            color: "#808080"
        }).setOrigin(0.5, 0.5)
    }

    protected preUpdate(): void {
        this.label.setPosition(this.x, this.y)
    }

    protected flash(): void {
        const tintColor = Globals.cash < this.config.price && 0xd13b30 || 0xc9c9c9
        this.setTintFill(tintColor)

        this.scene.time.delayedCall(20, () => {
            this.clearTint()
            if (this.purchased) this.setTint(0x88ff88)
        })
    }

    damage(): void {
        // visuals
        this.flash()
        this.setY(this.startY + 10)

        this.scene.tweens.add({
            targets: this,
            y: this.startY,
            duration: 100
        })

        // cash check
        if (Globals.cash < this.config.price) {
            this.scene.sound.play("error")
            return
        } else this.scene.sound.play("blockHit")

        // health
        this.health --
        if (this.health <= 0 && !this.purchased) {
            // on purchase
            this.purchased = true
            Globals.cash -= this.config.price

            this.label.setText("Owned")
            this.label.setColor("#325c26")
            this.scene.sound.play("cashRegister")

            this.setTint(0x88ff88)
            this.config.handler()
        }

        // reset health
        const recordedHealth = this.health
        this.scene.time.delayedCall(2000, () => {
            if (recordedHealth == this.health) this.health = 10 * Globals.fireCount
        })
    }
}