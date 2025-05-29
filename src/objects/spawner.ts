import { Melon } from "./melon"
import { Globals } from "../data/globals"
import type { groups } from "../data/types"

export class Spawner {
    private scene: Phaser.Scene
    private groups: groups

    constructor(scene: Phaser.Scene, groups: groups) {
        this.scene = scene
        this.groups = groups

        scene.time.addEvent({
            delay: Globals.melonFrequency,
            callback: this.spawnMelon,
            callbackScope: this,
            loop: true
        })

        this.spawnMelon()
    }

    protected spawnMelon(): void {
        new Melon(this.scene, this.groups, -150, -150, 0)
        Globals.melonFrequency = Phaser.Math.Clamp(Globals.melonFrequency - 25, 500, 4000)
    }
}