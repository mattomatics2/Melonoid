import Phaser from "phaser"

export class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "bullet")

        // add sprite to scene
        scene.physics.add.existing(this)
        scene.add.existing(this)

        // setup
        this.setScale(0.12, 0.12)
        this.setDepth(1)
    }

    protected preUpdate(): void {
        // remove when out of bounds
        const inBounds = Phaser.Geom.Rectangle.Overlaps(this.scene.physics.world.bounds, this.getBounds())
        if (!inBounds) {
            this.destroy()
        }
    }
}