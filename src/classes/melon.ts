import Phaser from "phaser"

const phases: Record<integer, string> = {
    1: "largeMelon"
}

export class Melon extends Phaser.Physics.Arcade.Sprite {
    private health: integer = 100
    private phase: integer = 1
    private running: boolean = true

    constructor(scene: Phaser.Scene, x: integer, y: integer, phase: integer) {
        super(scene, x, y, phases[phase])

        scene.physics.add.existing(this)
        scene.add.existing(this)
        scene.events.on("update", this.onUpdate, this)
    }

    onUpdate() {
        // remove check
        if (!this.running) {
            return
        }

        // wrapping
        this.scene.physics.world.wrap(this, 125)
    }

    setup() {
        const rotation = Phaser.Math.Between(0, 360)
        const speed = Phaser.Math.Between(100, 200)
        this.setAngularVelocity(Phaser.Math.Between(-200, 200))
        this.scene.physics.velocityFromRotation(rotation, speed, this.body?.velocity)
    }

    damage() {
        // flash effect
        this.setTintFill(0xc9c9c9)
        setTimeout(() => this.clearTint(), 10)

        // on death
        this.health -= 25
        if (this.health <= 0) {
            this.scene.cameras.main.shake(125, 0.01)
            this.remove()


        }
    }

    remove() {
        this.running = false
        this.scene.events.removeListener("update", this.onUpdate, this)
        this.destroy()
    }
}