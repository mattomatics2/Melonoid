import { Melon } from "./melon"
import type { groups } from "../main"

export class Spawner {
    private scene: Phaser.Scene
    private groups: groups

    constructor(scene: Phaser.Scene, groups: groups) {
        this.scene = scene
        this.groups = groups

        scene.time.addEvent({
            delay: 3000,
            callback: this.spawnMelon,
            callbackScope: this,
            loop: true
        })
    }

    spawnMelon() {
        const melon = new Melon(this.scene, -200, -200, 1)
        this.groups.melons.add(melon)
        melon.setup()
    }
}