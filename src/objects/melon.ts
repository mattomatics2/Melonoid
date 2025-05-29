import { Phases, Saved } from "../data/globals"
import { Flash } from "../effects/flash"
import { Billboard } from "../effects/billboard"
import type { groups } from "../data/types"

export class Melon extends Phaser.Physics.Arcade.Sprite {
    private health: integer
    private phase: integer
    private groups: groups

    constructor(scene: Phaser.Scene, groups: groups, x: integer, y: integer, phase: integer) {
        super(scene, x, y, Phases[phase].sprite)

        this.health = Phases[phase].health
        this.phase = phase
        this.groups = groups
        this.setup()
    }

    protected setup(): void {
        // add sprite to scene
        this.scene.add.existing(this)
        this.groups.enemies.add(this)

        // properties
        this.setDepth(4)

        // random rot/speed
        const rotation = Phaser.Math.Between(0, 360)
        const rotSpeed = Phaser.Math.Between(-200, 200)
        const moveSpeed = Phaser.Math.Between(100, 200)

        this.setAngularVelocity(rotSpeed)
        this.scene.physics.velocityFromRotation(rotation, moveSpeed, this.body?.velocity)
    }

    protected preUpdate(): void {
        // wrapping
        this.scene.physics.world.wrap(this, 125)
    }

    damage(damage: integer): void {
        // flash/sounds
        this.setTintFill(0xc9c9c9)
        this.scene.time.delayedCall(15, () => this.clearTint())
        this.scene.sound.play("melonHit")

        // death
        this.health -= damage
        if (this.health > 0) {
            return
        }

        // next phase
        const nextPhase = this.phase + 1
        if (Phases[nextPhase]) {
            // spawn new melons
            for (let x = 0; x <= nextPhase; x++) {
                new Melon(this.scene, this.groups, this.x, this.y, nextPhase)
            }
        }

        // rewards
        const shardChance = Phases[this.phase].shardChance

        // shard
        if (Math.random() < shardChance / 100) {
            Saved.shards ++
            new Billboard(this.scene, this.x, this.y, "★ 1")
        }

        // remove melon
        this.explode()
    }

    explode(): void {
        // flash
        const currentPhase = Phases[this.phase]
        new Flash(this.scene, this.x, this.y, currentPhase.flashSize)

        // sound/destroy
        this.scene.sound.play(currentPhase.deathSound)
        this.scene.cameras.main.shake(125, 0.01)
        this.destroy()
    }
}