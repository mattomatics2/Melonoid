export class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: integer, y: integer) {
        super(scene, x, y, "bullet")
        this.setup()
    }

    protected setup() {
        // add sprite to scene
        this.scene.add.existing(this)

        // properties
        this.setScale(0.12, 0.12)
        this.setDepth(1)
    }

    protected preUpdate(): void {
        // remove when out of bounds
        const camera = this.scene.cameras.main
        const cameraView = camera.worldView
        const bulletBounds = this.getBounds()

        const inBounds = Phaser.Geom.Intersects.RectangleToRectangle(cameraView, bulletBounds)
        if (!inBounds) {
            this.destroy()
        }
    }
}