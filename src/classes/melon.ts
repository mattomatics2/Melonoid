import Phaser from "phaser"

export class Melon extends Phaser.Physics.Arcade.Sprite {
    health: integer = 100
    phase: integer = 1

    constructor(scene: Phaser.Scene, x: integer, y: integer) {
        super(scene, x, y, "largeMelon")

        scene.physics.add.existing(this)
        scene.add.existing(this)
        scene.events.on("update", this.onUpdate, this)
    }

    onUpdate() {
        // wrapping
        this.scene.physics.world.wrap(this, 125)
    }
}