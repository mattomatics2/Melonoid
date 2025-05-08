import Phaser from "phaser"

export class Player extends Phaser.Physics.Arcade.Sprite {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "player")

        scene.physics.add.existing(this)
        scene.add.existing(this)
        scene.events.on("update", this.onUpdate, this)

        this.cursors = scene.input.keyboard?.createCursorKeys()!
        this.setScale(0.25, 0.25)
    }

    onUpdate() {
        // rotation
        const mouseX = this.scene.input.mousePointer.x
        const mouseY = this.scene.input.mousePointer.y

        const angle = Phaser.Math.Angle.Between(this.x, this.y, mouseX, mouseY)
        this.rotation = angle

        // movement
        const directionX = (this.cursors.right.isDown ? 1 : 0) - (this.cursors.left.isDown ? 1 : 0)
        const directionY = (this.cursors.down.isDown ? 1 : 0) - (this.cursors.up.isDown ? 1 : 0)
        this.setVelocity(directionX * 500, directionY * 500)
    }
}