import { Player } from "../objects/player"
import { Unlock } from "../objects/unlock"
import { Bullet } from "../objects/bullet"
import { Notifier } from "../effects/notifier"
import { treeData } from "../data/unlocks"
import { Line } from "../objects/line"
import { Stats } from "../objects/stats"
import { Stars } from "../effects/stars"
import type { groups } from "../data/types"

export class UpgradeTree extends Phaser.Scene {
    constructor() {
        super("UpgradeTree")
    }

    protected preload(): void {
        // images
        this.load.image("player", "images/ship.png")
        this.load.image("bullet", "images/bullet.png")
        this.load.image("unlockBlock", "images/unlockblock.png")
        this.load.image("unlockOutline", "images/unlockoutline.png")

        // sounds
        this.load.audio("laserShoot", "sounds/laser-shoot.wav")
        this.load.audio("melonHit", "sounds/melon-hit.wav")
        this.load.audio("blockHit", "sounds/block-hit.wav")
        this.load.audio("purchase", "sounds/cash-register.mp3")
        this.load.audio("error", "sounds/error.wav")
    }

    protected create(): void {
        // collision groups
        const groups: groups = {
            player: this.physics.add.group(),
            bullets: this.physics.add.group(),
            enemies: this.physics.add.group()
        }

        // objects
        const player = new Player(this, groups, 550, 325)
        player.enableWrapping = false
        player.disableUpgrades = true
        
        new Stats(this)
        new Stars(this)

        // go to battle
        player.eventEmitter.on("OutOfBounds", () => {
            player.destroy()
            this.cameras.main.fadeOut(500)

            this.time.delayedCall(600, () => {
                this.scene.start("Battle")
            })
        })

        // setup
        this.setupCamera(player)
        this.setupCollisions(groups)
        this.setupUnlocks(groups)
        this.cameras.main.fadeIn(500)

        // notification
        const notifier = new Notifier(this)
        notifier.playOnce("Tutorial2", "You can purchase upgrades by shooting them. Exit the screen to return to battle.")
    }

    protected setupCamera(player: Player): void {
        // camera bounds
        const bounds = new Phaser.Math.Vector2(1000, 1000)
        const offset = new Phaser.Math.Vector2(0, -350)
        const cam = this.cameras.main

        const pos = new Phaser.Math.Vector2(-bounds.x / 2, -bounds.y / 2)
        const size = new Phaser.Math.Vector2(cam.width + bounds.x, cam.height + bounds.y)
        this.cameras.main.setBounds(pos.x + offset.x, pos.y + offset.y, size.x, size.y)

        // camera properties
        this.cameras.main.startFollow(player)
        this.cameras.main.setDeadzone(100, 100)
        this.cameras.main.setLerp(0.02, 0.02)
    }

    protected setupCollisions(groups: groups): void {
        // bullet/unlock
        this.physics.add.overlap(groups.bullets, groups.enemies, (bullet, unlock) => {
            (bullet as Bullet).destroy();
            (unlock as Unlock).damage();
        })
    }

    protected setupUnlocks(groups: groups): void {
        // create unlock sprites
        const connections: Record<string, Unlock> = {}

        for (const name in treeData) {
            const data = treeData[name]
            const posX = (data.x * 200) + 550
            const posY = (data.y * 200) + 150

            const sprite = new Unlock(this, groups, posX, posY, {
                name: name,
                info: data,
                connections: connections
            })

            connections[name] = sprite
        }

        // create unlock lines
        for (const name in connections) {
            const sprite1 = connections[name]
            const sprite2 = connections[sprite1.config.info.requirement]

            if (sprite1 && sprite2) {
                new Line(this, sprite1.sprite, sprite2.sprite)
            }
        }
    }
}