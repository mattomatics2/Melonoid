const playedNotifs: Record<string, boolean> = {}

export class Notifier extends Phaser.GameObjects.Container {
    private text: Phaser.GameObjects.Text
    private background: Phaser.GameObjects.Graphics

    constructor(scene: Phaser.Scene) {
        super(scene, 15, 15)

        this.text = scene.add.text(0, 0, "", {
            fontSize: "16px",
            color: "#ffffff",
            padding: {x: 10, y: 10},
            wordWrap: {width: 400},
            lineSpacing: 5
        })

        this.background = scene.add.graphics()

        this.setDepth(10)
        this.add([this.background, this.text])
        scene.add.existing(this)
    }

    play(message: string) {
        // text contents
        this.text.setText(message)
        this.background.clear()
        this.background.fillStyle(0x333333, 0.9)
        this.background.fillRect(0, 0, this.text.width, this.text.height)

        // setup for animations
        this.setX(-this.width)
        this.setAlpha(0)
    
        // tween in
        this.scene.tweens.add({
            targets: this,
            x: 15,
            alpha: 1,
            ease: "Sine.easeOut",
            duration: 500
        })

        // tween out
        this.scene.time.delayedCall(5000, () => {
            this.scene.tweens.add({
                targets: this,
                x: -this.width,
                alpha: 0,
                ease: "Sine.easeIn",
                duration: 500
            })
        })
    }

    playOnce(key: string, message: string) {
        if (playedNotifs[key]) {
            return
        }

        playedNotifs[key] = true
        this.play(message)
    }
}