import { Melon } from "./melon"
import { Globals } from "../data/globals"
import type { groups } from "../data/types"

export class Spawner {
    private scene: Phaser.Scene
    private groups: groups
    private frequency = Globals.melonFrequency

    constructor(scene: Phaser.Scene, groups: groups) {
        this.scene = scene
        this.groups = groups
        this.spawnMelon()
    }

    protected spawnMelon(): void {
        new Melon(this.scene, this.groups, -150, -150, 0)
        this.frequency = Phaser.Math.Clamp(this.frequency - 25, 1000, 4500)
        console.log(this.frequency)
        this.scene.time.delayedCall(this.frequency, () => this.spawnMelon())
    }
}