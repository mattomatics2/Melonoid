import type { groups } from "../scenes/battle"

export class HitBlock extends Phaser.Physics.Arcade.Sprite {
    private groups: groups

    constructor(scene: Phaser.Scene, groups: groups, x: integer, y: integer) {
        super(scene, x, y, "hitblock")

        scene.physics.add.existing(this)
        scene.add.existing(this)
        groups.melons.add(this)

        this.groups = groups
        this.scene = scene
        this.setup()
    }

    setup(): void {
        // properties
        this.setScale(0.5)
    }
}