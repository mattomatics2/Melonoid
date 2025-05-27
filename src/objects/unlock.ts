import type { groups } from "../types"
import type { Bullet } from "./bullet"

export class Unlock extends Phaser.GameObjects.Container {
    private sprite: Phaser.GameObjects.Sprite
    private label: Phaser.GameObjects.Text
    private groups: groups
    private startX: integer
    private startY: integer

    constructor(scene: Phaser.Scene, groups: groups, x: integer, y: integer) {
        super(scene, x, y)

        this.label = scene.add.text(0, 0, "Pierce III", {
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

        // add container to scene
        this.scene.add.existing(this)
        this.groups.enemies.add(this)
    }

    protected bounce(rotation: number): void {
        // bounce the sprite backwards
        const nx = Math.cos(rotation)
        const ny = Math.sin(rotation)

        const outX = this.x + nx * 10
        const outY = this.y + ny * 10
        this.setPosition(outX, outY)
        this.setScale(1.2)

        // tween to original position
        this.scene.tweens.add({
            targets: this,
            x: this.startX,
            y: this.startY,
            scale: 1,
            duration: 100
        })
    }

    protected flash(): void {
        this.sprite.setTintFill(0xc9c9c9)
        this.scene.time.delayedCall(20, () => this.sprite.clearTint())
    }

    damage(bulletRot: number): void {
        this.bounce(bulletRot)
        this.flash()
        this.scene.sound.play("blockHit")
    }
}