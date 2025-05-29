import { Player } from "../objects/player"
import { Spawner } from "../objects/spawner"
import { Notifier } from "../effects/notifier"
import { Stats } from "../objects/stats"
import { Saved } from "../data/globals"

import type { Bullet } from "../objects/bullet"
import type { Melon } from "../objects/melon"
import type { groups } from "../data/types"
import { treeData } from "../data/unlocks"

export class BattleScene extends Phaser.Scene {
    constructor() {
        super("Battle")
    }

    protected preload(): void {
        // images
        this.load.image("player", "images/ship.png")
        this.load.image("bullet", "images/bullet.png")
        this.load.image("flash", "images/flash.png")
        this.load.image("largeMelon", "images/large-melon.png")
        this.load.image("halfMelon", "images/half-melon.png")
        this.load.image("smallMelon", "images/small-melon.png")

        // sounds
        this.load.audio("laserShoot", "sounds/laser-shoot.wav")
        this.load.audio("boom", "sounds/boom.mp3")
        this.load.audio("largeExplosion", "sounds/large-explosion.wav")
        this.load.audio("smallExplosion", "sounds/small-explosion.wav")
        this.load.audio("melonHit", "sounds/melon-hit.wav")

        // sheets
        this.load.spritesheet("explosion", "images/explosion.png", {frameWidth: 64, frameHeight: 64})
    }

    protected create(): void {
        // animations
        this.anims.create({
            key: "explosion",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 15}),
            frameRate: 15,
            hideOnComplete: true
        })

        // collision groups
        const groups: groups = {
            player: this.physics.add.group(),
            bullets: this.physics.add.group(),
            enemies: this.physics.add.group()
        }

        this.setupCollisions(groups)
        this.setupUnlocks()
        this.cameras.main.fadeIn(500)

        // create objects
        new Player(this, groups, 550, 325)
        new Spawner(this, groups)
        new Stats(this)

        // notifier
        const notifier = new Notifier(this)
        notifier.playOnce("tutorial1", "Shoot melons by holding [Space] on your keyboard.")
    }

    protected setupCollisions(groups: groups): void {
        // bullet/melon
        this.physics.add.overlap(groups.bullets, groups.enemies, (bullet, enemy) => {
            const typedBullet = bullet as Bullet
            const typedEnemy = enemy as Melon
            typedBullet.remove(typedEnemy)
        })

        // player/melon
        this.physics.add.overlap(groups.player, groups.enemies, (player, enemy) => {
            (player as Player).explode();
            (enemy as Melon).explode();
        })
    }

    protected setupUnlocks(): void {
        for (const key in Saved.unlocks) {
            const name = Saved.unlocks[key]
            const data = treeData[name]
            if (data) data.unlock()
        }
    }
}