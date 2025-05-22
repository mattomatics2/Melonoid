import { Melon } from "./melon"
import type { groups } from "../main"

export class Spawner {
    private scene: Phaser.Scene
    private groups: groups

    constructor(scene: Phaser.Scene, groups: groups) {
        this.scene = scene
        this.groups = groups

        scene.time.addEvent({
            delay: 2500,
            callback: this.spawnMelon,
            callbackScope: this,
            loop: true
        })
    }

    spawnMelon() {
        const melon = new Melon(this.scene, -200, -200)
        const rotation = Phaser.Math.Between(0, 360)
        const speed = Phaser.Math.Between(100, 200)
        this.groups.melons.add(melon)

        melon.setAngularVelocity(Phaser.Math.Between(-200, 200))
        this.scene.physics.velocityFromRotation(rotation, speed, melon.body?.velocity)
    }
}