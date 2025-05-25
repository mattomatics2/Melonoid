export class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: integer, y: integer) {
        super(scene, x, y, "bullet")
        this.setup()
    }

    protected setup() {
        // add sprite to scene
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)

        // properties
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