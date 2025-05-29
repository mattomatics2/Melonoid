export class Billboard extends Phaser.GameObjects.Text {
    constructor(scene: Phaser.Scene, x: integer, y: integer, text: string) {
        super(scene, x, y, text, {
            fontSize: "26px",
            fontStyle: "bold",
            color: "#b960db",
            stroke: "#000000",
            strokeThickness: 2
        })

        scene.add.existing(this)

        this.setOrigin(0.5, 0.5)
        this.setDepth(15)
        this.start()
    }

    protected start(): void {
        this.scene.tweens.add({
            targets: this,
            y: this.y - 30,
            alpha: 0,
            ease: Phaser.Math.Easing.Linear,
            duration: 1000
        })

        this.scene.time.delayedCall(1000, () => this.destroy())
    }
}