export class Line extends Phaser.GameObjects.Line {
    private sprite1: Phaser.GameObjects.Sprite
    private sprite2: Phaser.GameObjects.Sprite

    constructor(scene: Phaser.Scene, sprite1: Phaser.GameObjects.Sprite, sprite2: Phaser.GameObjects.Sprite) {
        super(scene)

        this.sprite1 = sprite1
        this.sprite2 = sprite2
        this.setup()
    }

    protected setup(): void {
        // properties
        this.setLineWidth(4)
        this.setOrigin(0, 0)
        this.setStrokeStyle(4, 0xffffff, 0.2)
        this.setDepth(-1)

        // add object to scene
        this.scene.add.existing(this)
    }

    protected preUpdate(): void {
        // get world position of sprites
        const pos1 = new Phaser.Math.Vector2()
        const pos2 = new Phaser.Math.Vector2()

        this.sprite1.getWorldTransformMatrix().transformPoint(0, 0, pos1)
        this.sprite2.getWorldTransformMatrix().transformPoint(0, 0, pos2)

        // move line in between sprites
        this.setTo(
            pos1.x, pos1.y,
            pos2.x, pos2.y
        )
    }
}