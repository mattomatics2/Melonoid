import { Melon } from "./melon"

export class Spawner {
    private scene: Phaser.Scene

    constructor(scene: Phaser.Scene) {
        this.scene = scene

        scene.time.addEvent({
            delay: 1500,
            callback: this.spawnMelon,
            callbackScope: this,
            loop: true
        })
    }

    spawnMelon() {
        const melon = new Melon(this.scene, -200, -200)
        const rotation = Phaser.Math.Between(0, 360)
        const speed = Phaser.Math.Between(100, 200)

        melon.setAngularVelocity(Phaser.Math.Between(-200, 200))
        this.scene.physics.velocityFromRotation(rotation, speed, melon.body?.velocity)
    }
}