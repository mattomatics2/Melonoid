import type { groups } from "../scenes/battle"

type config = {
    title: string,
    subtitle: string,
    price: integer
}

export class HitBlock extends Phaser.Physics.Arcade.Sprite {
    private priceLabel: Phaser.GameObjects.Text
    private startY: integer
    private config: config
    private handler: () => void

    private health: integer = 10
    private purchased: boolean = false

    constructor(
        scene: Phaser.Scene, 
        groups: groups, 
        x: integer, 
        y: integer, 
        config: config, 
        handler: () => void
    ) {
        super(scene, x, y, "hitblock")

        // add sprite to scene
        scene.physics.add.existing(this)
        scene.add.existing(this)
        groups.melons.add(this)

        // price label
        const priceStr = `$${config.price}`
        this.priceLabel = this.scene.add.text(this.x, this.y, priceStr, {
            fontStyle: "bold",
            fontSize: "24px",
            color: "#544724"
        })

        // variables/setup
        this.handler = handler
        this.config = config
        this.startY = y
        this.scene = scene
        this.setup()
    }

    protected setup(): void {
        // properties
        this.setScale(0.5)
        this.setDepth(3)
        this.setupLabels()

        this.priceLabel.setOrigin(0.5, 0.5)
        this.priceLabel.setDepth(4)
    }

    protected setupLabels(): void {
        // title label
        this.scene.add.text(this.x, this.y - 60, this.config.title, {
            fontStyle: "bold",
            fontSize: "24px",
            color: "#bababa"
        }).setOrigin(0.5, 0.5)

        // subtitle label
        this.scene.add.text(this.x, this.y - 37, this.config.subtitle, {
            fontSize: "18px",
            color: "#808080"
        }).setOrigin(0.5, 0.5)
    }

    protected preUpdate(): void {
        this.priceLabel.setPosition(this.x, this.y)
    }

    protected flash(): void {
        this.setTintFill(0xc9c9c9)

        setTimeout(() => {
            this.clearTint()
            if (this.purchased) this.setTint(0x88ff88)
        }, 15)
    }

    hit(): void {
        // flash/sound
        this.flash()
        this.scene.sound.play("blockHit")

        // hit effect
        this.setY(this.startY + 10)
        this.scene.tweens.add({
            targets: this,
            y: this.startY,
            duration: 100
        })

        // health
        if (this.purchased) {
            return
        }

        this.health --
        if (this.health <= 0) {
            // on purchase
            this.purchased = true
            this.priceLabel.setText("Owned")
            this.scene.sound.play("cashRegister")
            this.priceLabel.setColor("#325c26")

            this.setTint(0x88ff88)
            this.handler()
        }
    }
}