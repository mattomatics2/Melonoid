import type { groups } from "../types"

export class Unlock extends Phaser.GameObjects.Container {
    private sprite: Phaser.GameObjects.Sprite
    private label: Phaser.GameObjects.Text
    private groups: groups
    private startX: integer
    private startY: integer

    constructor(scene: Phaser.Scene, groups: groups, x: integer, y: integer, name: string) {
        super(scene, x, y)

        this.label = scene.add.text(0, 0, name, {
            fontFamily: "Verdana",
            fontSize: "20px",
            fontStyle: "bold",
            stroke: "black",
            strokeThickness: 5,
            wordWrap: { width: 1 },
            align: "center"
        })

        this.startX = x
        this.startY = y
        this.groups = groups
        this.sprite = scene.add.sprite(0, 0, "unlockblock")
        this.setup()
    }

    protected setup(): void {
        // properties
        this.sprite.setScale(0.4)
        this.label.setOrigin(0.5, 0.5)
        this.setSize(this.sprite.displayWidth, this.sprite.displayHeight)

        // add children to container
        this.add([this.sprite, this.label])
        this.setupFloating()

        // add container to scene
        this.scene.add.existing(this)
        this.groups.enemies.add(this)
    }

    protected setupFloating(): void {
        const phase = Phaser.Math.FloatBetween(0, Math.PI * 2)
        const radius = 4

        // move sprite around randomly
        this.scene.time.addEvent({
            delay: 16,
            loop: true,
            callback: () => {
                const t = this.scene.time.now / 1000
                this.x = this.startX + Math.cos(t + phase) * radius
                this.y = this.startY + Math.sin(t + phase) * radius
            }
        })
    }

    protected bounce(): void {
        // change the sprite size
        this.setScale(1.2)

        // tween to original size
        this.scene.tweens.add({
            targets: this,
            scale: 1,
            duration: 100
        })
    }

    protected flash(): void {
        this.sprite.setTintFill(0xc9c9c9)
        this.scene.time.delayedCall(20, () => this.sprite.clearTint())
    }

    damage(): void {
        this.bounce()
        this.flash()
        this.scene.sound.play("blockHit")
    }
}