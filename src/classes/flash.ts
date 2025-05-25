export class Flash extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: integer, y: integer, scale: number) {
        super(scene, x, y, "flash")
        this.setScale(scale)
        this.setAlpha(0.5)
        this.flash()
    }

    flash() {
        this.scene.add.existing(this)
        setTimeout(() => this.destroy(), 50)
    }
}