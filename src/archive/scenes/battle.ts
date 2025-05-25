import { Player } from "../classes/player"
import { Spawner } from "../classes/spawner"
import { Notifier } from "../classes/notification";

import type { Bullet } from "../classes/bullet";
import type { Melon } from "../classes/melon";

export type groups = {
    player: Phaser.Physics.Arcade.Group;
    bullets: Phaser.Physics.Arcade.Group;
    melons: Phaser.Physics.Arcade.Group;
}

export class BattleScene extends Phaser.Scene {
    constructor() {
        super("Battle")
    }

    preload() {
        // images
        this.load.image("player", "images/ship.png")
        this.load.image("bullet", "images/bullet.png")
        this.load.image("largeMelon", "images/large-melon.png")
        this.load.image("halfMelon", "images/half-melon.png")
        this.load.image("smallMelon", "images/small-melon.png")
        this.load.image("flash", "images/flash.png")

        // sounds
        this.load.audio("largeExplosion", "sounds/large-explosion.wav")
        this.load.audio("smallExplosion", "sounds/small-explosion.wav")
        this.load.audio("melonHit", "sounds/melon-hit.wav")
        this.load.audio("laserShoot", "sounds/laser-shoot.wav")
        this.load.audio("boom", "sounds/boom.mp3")

        // sprite sheets
        this.load.spritesheet("playerExplosion", "images/explosion.png", {
            frameWidth: 64, frameHeight: 64
        })
    }

    create() {
        // fade in the scene
        this.cameras.main.fadeIn(500)

        // animations
        this.anims.create({
            key: "playerExplosion",
            frames: this.anims.generateFrameNumbers("playerExplosion", {
                start: 0, end: 15
            }),
            frameRate: 15,
            hideOnComplete: true
        })

        // collision groups
        const groups: groups = {
            player: this.physics.add.group(),
            bullets: this.physics.add.group(),
            melons: this.physics.add.group()
        }

        // create objects
        new Player(this, groups, 600, 325)
        new Spawner(this, groups)

        // bullet/melon collision
        this.physics.add.overlap(groups.bullets, groups.melons, (bullet, melon) => {
            (bullet as Bullet).destroy();
            (melon as Melon).damage();
        })

        // player/melon collision
        this.physics.add.overlap(groups.player, groups.melons, (col1, col2) => {
            const player = col1 as Player
            const melon = col2 as Melon
            
            if (!player.disabled) {
                player.kill()
                melon.explosion()
            }
        })

        // notifications
        const notifier = new Notifier(this)
        notifier.playOnce("tutorial1", "Shoot melons by holding [Space] on your keyboard.")
    }
}