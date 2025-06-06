import { InputManager } from "./input"
import { Globals } from "../data/globals"
import { Bullet } from "./bullet"
import { Flash } from "../effects/flash"
import type { groups } from "../data/types"

export class Player extends Phaser.Physics.Arcade.Sprite {
    private inputManager: InputManager
    private groups: groups
    private lastShot = 0

    speed = 1500
    turnSpeed = 10

    disableUpgrades = false
    enableWrapping = true
    eventEmitter = new Phaser.Events.EventEmitter()

    constructor(scene: Phaser.Scene, groups: groups, x: integer, y: integer) {
        super(scene, x, y, "player")

        this.inputManager = new InputManager(scene)
        this.groups = groups
        this.setup()
    }

    protected setup(): void {
        // add sprite to scene
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.groups.player.add(this)

        // sprite properties
        this.setScale(0.2, 0.2)
        this.setDrag(50)
        this.setMaxVelocity(350, 350)
        this.setDepth(5)

        // inputs
        this.inputManager.setAction("left", ["left", "a"])
        this.inputManager.setAction("right", ["right", "d"])
        this.inputManager.setAction("up", ["up", "w"])
        this.inputManager.setAction("down", ["down", "s"])
        this.inputManager.setAction("shoot", ["space"])
    }

    protected preUpdate(time: number, delta: number): void {
        // rotation
        const mouseX = this.scene.input.activePointer.x
        const mouseY = this.scene.input.activePointer.y
        const worldPoint = this.scene.cameras.main.getWorldPoint(mouseX, mouseY)
        
        const angle = Phaser.Math.Angle.Between(this.x, this.y, worldPoint.x, worldPoint.y)
        this.rotation = Phaser.Math.Angle.RotateTo(this.rotation, angle, this.turnSpeed * (delta / 1000))

        // movement
        const directionX = this.inputManager.getInputAxis("right", "left")
        const directionY = this.inputManager.getInputAxis("down", "up")
        this.setAcceleration(directionX * this.speed, directionY * this.speed)

        // shooting
        if (this.inputManager.isPressed("shoot") && time > this.lastShot + Globals.fireDelay) {
            this.spawnBullets()
            this.lastShot = time
        }

        // wrapping
        if (this.enableWrapping) {
            this.scene.physics.world.wrap(this, 50)
        }

        // bounds
        const cameraView = this.scene.cameras.main.getBounds()
        const inCamera = Phaser.Geom.Rectangle.Overlaps(cameraView, this.getBounds())
        if (!inCamera && !this.enableWrapping) {
            this.eventEmitter.emit("OutOfBounds")
        }
    }

    protected spawnBullets(): void {
        const fireCount = this.disableUpgrades ? 1 : Globals.fireCount
        const angleSpread = Phaser.Math.DegToRad(30 * (Globals.fireCount / 3))
        const baseAngle = this.rotation

        for (let i = 0; i < fireCount; i ++) {
            const percent = fireCount === 1 ? 0 : (i / (fireCount - 1)) - 0.5
            const offset = angleSpread * percent
            const angle = baseAngle + offset

            const bullet = new Bullet(this.scene, this.x, this.y)
            bullet.rotation = angle

            this.groups.bullets.add(bullet)
            this.scene.physics.velocityFromRotation(angle, 500, bullet.body?.velocity)
        }

        this.scene.sound.play("laserShoot")
    }

    explode(): void {
        // explosion
        const explosion = this.scene.add.sprite(this.x, this.y, "explosion")
        explosion.setScale(2)
        explosion.play("explosion")

        // flash
        new Flash(this.scene, this.x, this.y, 1.25)
        this.scene.sound.play("boom")
        this.scene.cameras.main.shake(350, 0.02)

        // shop scene
        const scene = this.scene
        this.scene.time.delayedCall(2000, () => scene.cameras.main.fadeOut(500))
        this.scene.time.delayedCall(2700, () => scene.scene.start("UpgradeTree"))

        // remove player
        this.destroy()
    }
}