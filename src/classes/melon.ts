import Phaser from "phaser"
import type { groups } from "../main"

// const phases: Record<integer, string> = {
//     0: "largeMelon",
//     1: "halfMelon",
//     2: "smallMelon"
// }

const phases: Record<number, [string, number, string]> = {
    0: ["largeMelon", 150, "largeExplosion"],
    1: ["halfMelon", 100, "smallExplosion"],
    2: ["smallMelon", 50, "smallExplosion"]
}

export class Melon extends Phaser.Physics.Arcade.Sprite {
    private running: boolean = true
    private health: integer
    private groups: groups
    private phase: integer

    constructor(scene: Phaser.Scene, groups: groups, x: integer, y: integer, phase: integer) {
        super(scene, x, y, phases[phase][0])
        
        groups.melons.add(this)
        scene.physics.add.existing(this)
        scene.add.existing(this)
        scene.events.on("update", this.onUpdate, this)

        this.health = phases[phase][1]
        this.phase = phase
        this.groups = groups
        this.setup()
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
        // flash/sound
        this.setTintFill(0xc9c9c9)
        setTimeout(() => this.clearTint(), 10)
        this.scene.sound.play("melonHit")

        // on death
        this.health -= 20
        if (this.health > 0) {
            return
        }

        // flash
        const flash = new Phaser.Physics.Arcade.Sprite(this.scene, this.x, this.y, "flash")
        flash.setAlpha(0.5)
        this.scene.add.existing(flash)
        setTimeout(() => flash.destroy(), 50)

        // new phase
        const nextPhase = this.phase + 1
        if (phases[nextPhase]) {
            // spawn new melons
            for (let x = 0; x <= nextPhase; x++) {
                new Melon(this.scene, this.groups, this.x, this.y, nextPhase)
            }
        }

        // destroy effects
        this.scene.sound.play(phases[this.phase][2])
        this.scene.cameras.main.shake(125, 0.01)
        this.remove()
    }

    remove() {
        this.running = false
        this.scene.events.removeListener("update", this.onUpdate, this)
        this.destroy()
    }
}