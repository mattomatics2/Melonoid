import Phaser from "phaser"

export class Bullet extends Phaser.Physics.Arcade.Sprite {
    private running: boolean = false
    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "bullet")

        scene.physics.add.existing(this)
        scene.add.existing(this)
        scene.events.on("update", this.onUpdate, this)

        this.setScale(0.12, 0.12)
    }

    onUpdate() {
        // remove check
        if (!this.running) {
            return
        }

        // remove when out of bounds
        const inBounds = Phaser.Geom.Rectangle.Overlaps(this.scene.physics.world.bounds, this.getBounds())
        if (!inBounds) {
            this.remove()
        }
    }

    remove() {
        this.running = false
        this.scene.events.removeListener("update", this.onUpdate, this)
        this.destroy()
    }
}