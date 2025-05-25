import Phaser from "phaser"
import { InputManager } from "./input"
import { Bullet } from "./bullet"
import { Flash } from "./flash"

import type { groups } from "../scenes/battle"

export class Player extends Phaser.Physics.Arcade.Sprite {
    private inputManager: InputManager
    private lastShot: integer = 0
    private fireDelay: integer = 150
    private groups: groups
    immune: boolean = false

    constructor(scene: Phaser.Scene, groups: groups, x: integer, y: integer) {
        super(scene, x, y, "player")

        scene.physics.add.existing(this)
        scene.add.existing(this)
        groups.player.add(this)
        
        this.groups = groups
        this.inputManager = new InputManager(scene)
        this.setup()
    }

    setup(): void {
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

    kill(): void {
        // only damage once
        if (this.immune) {
            return
        }

        this.immune = true
        this.setVisible(false)

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
        if (this.inputManager.isPressed("shoot") && time > this.lastShot + this.fireDelay) {
            this.spawnBullet()
            this.lastShot = time
        }
    }

    protected spawnBullet(): void {
        const bullet = new Bullet(this.scene, this.x, this.y)
        bullet.rotation = this.rotation
        this.groups.bullets.add(bullet)
        this.scene.physics.velocityFromRotation(this.rotation, 500, bullet.body?.velocity)
        this.scene.sound.play("laserShoot")
    }
}