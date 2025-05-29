export class Background extends Phaser.GameObjects.TileSprite {
    constructor(scene: Phaser.Scene) {
        super(scene, 0, -50, 1100, 700, "stars")

        this.setDepth(-100)
        this.setOrigin(0, 0)
        this.setScrollFactor(0)

        scene.add.existing(this)
    }

    protected preUpdate() {
        // parralax background effect 
        this.tilePositionX = this.scene.cameras.main.scrollX * 0.5
        this.tilePositionY = this.scene.cameras.main.scrollY * 0.5
    }
}