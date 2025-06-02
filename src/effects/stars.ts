export class Stars extends Phaser.GameObjects.TileSprite {
    private deltaX = 0
    private deltaY = 0

    constructor(scene: Phaser.Scene, deltaX?: integer, deltaY?: integer) {
        super(scene, 0, -50, 1100, 700, "stars")

        this.deltaX = deltaX || 0
        this.deltaY = deltaY || 0

        this.setDepth(-100)
        this.setOrigin(0, 0)
        this.setScrollFactor(0)

        scene.add.existing(this)
    }

    protected preUpdate() {
        // parralax background effect
        if (this.deltaX == 0 && this.deltaY == 0) {
            this.tilePositionX = this.scene.cameras.main.scrollX * 0.5 
            this.tilePositionY = this.scene.cameras.main.scrollY * 0.5
        }

        // predefined delta
        this.tilePositionX += this.deltaX
        this.tilePositionY += this.deltaY
    }
}