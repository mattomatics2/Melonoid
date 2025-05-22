import Phaser from "phaser"
import { InputManager } from "./input"
import { Bullet } from "./bullet"
import type { groups } from "../main"

export class Player extends Phaser.Physics.Arcade.Sprite {
    private inputManager: InputManager
    private lastShot: integer = 0
    private fireDelay: integer = 150
    private groups: groups

    constructor(scene: Phaser.Scene, x: integer, y: integer, groups: groups) {
        super(scene, x, y, "player")

        scene.physics.add.existing(this)
        scene.add.existing(this)
        scene.events.on("update", this.onUpdate, this)
        
        this.groups = groups
        this.inputManager = new InputManager(scene)
        this.setup()
    }

    setup() {
        // properties
        this.setScale(0.2, 0.2)
        this.setDrag(50)
        this.setMaxVelocity(500, 500)
        
        // inputs
        this.inputManager.setAction("left", ["left", "a"])
        this.inputManager.setAction("right", ["right", "d"])
        this.inputManager.setAction("up", ["up", "w"])
        this.inputManager.setAction("down", ["down", "s"])
        this.inputManager.setAction("shoot", ["space"])
    }

    onUpdate(time: number) {
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

        // bullet spawning
        if (this.inputManager.isPressed("shoot") && time > this.lastShot + this.fireDelay) {
            this.spawnBullet()
            this.lastShot = time
        }
    }

    spawnBullet() {
        const bullet = new Bullet(this.scene, this.x, this.y)
        bullet.rotation = this.rotation
        this.groups.bullets.add(bullet)
        this.scene.physics.velocityFromRotation(this.rotation, 500, bullet.body?.velocity)
    }
}