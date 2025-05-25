export class Flash extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: integer, y: integer, scale: number) {
        super(scene, x, y, "flash")
        this.setScale(scale)
        this.setAlpha(0.5)
        this.flash()
    }

    protected flash(): void {
        this.scene.add.existing(this)
        this.scene.time.delayedCall(50, () => this.destroy())
    }
}