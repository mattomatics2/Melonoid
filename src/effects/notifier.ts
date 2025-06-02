const playedNotifs: Record<string, boolean> = {}

export class Notifier extends Phaser.GameObjects.Container {
    private text: Phaser.GameObjects.Text
    private background: Phaser.GameObjects.Graphics

    constructor(scene: Phaser.Scene) {
        super(scene, 15, 15)

        this.text = scene.add.text(0, 0, "", {
            fontFamily: "Verdana",
            fontSize: "18px",
            color: "#ffffff",
            padding: {x: 13, y: 13},
            wordWrap: {width: 300},
            lineSpacing: 5
        })

        this.background = scene.add.graphics()
        this.setup()
    }

    protected setup(): void {
        // properties
        this.setDepth(10)
        this.setScrollFactor(0)

        // add sprite to scene
        this.add([this.background, this.text])
        this.scene.add.existing(this)
    }

    play(message: string): void {
        // text contents
        this.text.setText(message)
        this.background.clear()
        this.background.fillStyle(0x333333, 0.9)
        this.background.fillRoundedRect(0, 0, this.text.width, this.text.height, 10)

        // setup
        this.setX(-this.width)
        this.setAlpha(0)

        // tween in
        this.scene.tweens.add({
            targets: this,
            x: 15,
            alpha: 1,
            ease: Phaser.Math.Easing.Sine.Out,
            duration: 500
        })

        // tween out
        this.scene.time.delayedCall(5000, () => {
            this.scene.tweens.add({
                targets: this,
                x: -this.width,
                alpha: 0,
                ease: Phaser.Math.Easing.Sine.In,
                duration: 500
            })
        })
    }

    playOnce(key: string, message: string): void {
        if (playedNotifs[key]) {
            return
        }

        playedNotifs[key] = true
        this.play(message)
    }
}