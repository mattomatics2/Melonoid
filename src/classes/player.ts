import Phaser from "phaser"
import { InputManager } from "./input"
import { Bullet } from "./bullet"
import { Flash } from "./flash"
import { GameState } from "./globals"

import type { groups } from "../scenes/battle"

export class Player extends Phaser.Physics.Arcade.Sprite {
    private inputManager: InputManager
    private lastShot: integer = 0
    private groups: groups
    disabled: boolean = false

    constructor(scene: Phaser.Scene, groups: groups, x: integer, y: integer) {
        super(scene, x, y, "player")

        // add sprite to scene
        scene.physics.add.existing(this)
        scene.add.existing(this)
        groups.player.add(this)
        
        // variables/setup
        this.groups = groups
        this.inputManager = new InputManager(scene)
        this.setup()
    }

    protected setup(): void {
        // properties
        this.setScale(0.2, 0.2)
        this.setDrag(50)
        this.setMaxVelocity(500, 500)
        this.setDepth(5)
        
        // inputs
        this.inputManager.setAction("left", ["left", "a"])
        this.inputManager.setAction("right", ["right", "d"])
        this.inputManager.setAction("up", ["up", "w"])
        this.inputManager.setAction("down", ["down", "s"])
        this.inputManager.setAction("shoot", ["space"])
    }

    protected preUpdate(time: number): void {
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
        if (this.inputManager.isPressed("shoot") && time > this.lastShot + GameState.fireRate) {
            this.spawnBullets()
            this.lastShot = time
        }
    }

    protected spawnBullets(): void {
        const fireCount = GameState.fireCount
        const angleSpread = Phaser.Math.DegToRad(15)
        const baseAngle = this.rotation

        for (let i = 0; i < fireCount; i++) {
            const offset = angleSpread * (i - (fireCount - 1) / 2)
            const angle = baseAngle + offset
            
            const bullet = new Bullet(this.scene, this.x, this.y)
            bullet.rotation = angle
            this.groups.bullets.add(bullet)
            this.scene.physics.velocityFromRotation(angle, 500, bullet.body?.velocity)
        }

        this.scene.sound.play("laserShoot")
    }

    kill(): void {
        // only damage once
        if (this.disabled) {
            return
        }

        this.disabled = true
        this.disableBody(true, true)
        this.disableInteractive()

        // visuals
        const explosion = this.scene.add.sprite(this.x, this.y, "playerExplosion")
        explosion.setScale(2)
        explosion.play("playerExplosion")

        new Flash(this.scene, this.x, this.y, 1.25)
        this.scene.sound.play("boom")
        this.scene.cameras.main.shake(350, 0.02)

        // shop scene
        setTimeout(() => this.scene.cameras.main.fadeOut(1000), 5000)
        setTimeout(() => this.scene.scene.start("Shop"), 6500)
    }
}