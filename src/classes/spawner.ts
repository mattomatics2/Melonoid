import { Melon } from "./melon"
import type { groups } from "../scenes/battle"

export class Spawner {
    private scene: Phaser.Scene
    private groups: groups

    constructor(scene: Phaser.Scene, groups: groups) {
        this.scene = scene
        this.groups = groups

        scene.time.addEvent({
            delay: 5000,
            callback: this.spawnMelon,
            callbackScope: this,
            loop: true
        })

        this.spawnMelon()
    }

    spawnMelon(): void {
        new Melon(this.scene, this.groups, -150, -150, 0)
    }
}