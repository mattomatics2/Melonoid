import Phaser from "phaser"
import { InputManager } from "./input"

export class Player extends Phaser.Physics.Arcade.Sprite {
    private inputManager: InputManager

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "player")

        scene.physics.add.existing(this)
        scene.add.existing(this)
        scene.events.on("update", this.onUpdate, this)

        this.inputManager = new InputManager(scene)
        this.setup()
    }

    setup() {
        // properties
        this.setScale(0.2, 0.2)
        this.setDrag(500)
        this.setMaxVelocity(500, 500)
        
        // inputs
        this.inputManager.addAction("left", ["left", "a"])
        this.inputManager.addAction("right", ["right", "d"])
        this.inputManager.addAction("up", ["up", "w"])
        this.inputManager.addAction("down", ["down", "s"])
        
    }

    onUpdate() {
        // rotation
        const mouseX = this.scene.input.mousePointer.x
        const mouseY = this.scene.input.mousePointer.y

        const angle = Phaser.Math.Angle.Between(this.x, this.y, mouseX, mouseY)
        this.rotation = angle

        // movement
        const directionX = this.inputManager.getInputAxis("right", "left")
        const directionY = this.inputManager.getInputAxis("down", "up")
        this.setAcceleration(directionX * 1500, directionY * 1500)

        // wrapping
        this.scene.physics.world.wrap(this, 32)
    }
}