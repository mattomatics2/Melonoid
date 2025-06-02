import { Globals } from "../data/globals"
import type { Melon } from "./melon"

export class Bullet extends Phaser.Physics.Arcade.Sprite {
    private hitMelons = new Set<Melon>
    private health = Globals.pierceCount
    private damage = Globals.fireDamage
    
    constructor(scene: Phaser.Scene, x: integer, y: integer) {
        super(scene, x, y, "bullet")
        this.setup()
    }

    protected setup() {
        // add sprite to scene
        this.scene.add.existing(this)

        // properties
        this.setScale(0.12, 0.12)
        this.setDepth(1)
    }

    protected preUpdate(): void {
        // remove when out of bounds
        const camera = this.scene.cameras.main
        const cameraView = camera.worldView
        const bulletBounds = this.getBounds()

        const inBounds = Phaser.Geom.Intersects.RectangleToRectangle(cameraView, bulletBounds)
        if (!inBounds) {
            this.destroy()
        }
    }

    remove(melon: Melon) {
        // prevent bullet from hitting same melon twice
        if (this.hitMelons.has(melon)) return
        this.hitMelons.add(melon)

        // damage melon and reduce bullet damage/health
        melon.damage(this.damage)
        this.health --
        this.damage /= 2

        if (this.health < 0) this.destroy()
    }
}