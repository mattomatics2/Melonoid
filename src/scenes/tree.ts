import { Player } from "../objects/player"
import { Unlock } from "../objects/unlock"
import { Bullet } from "../objects/bullet"
import { Notifier } from "../effects/notifier"
import { treeData } from "../data/unlocks"
import { Line } from "../objects/line"
import type { groups } from "../types"

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

        const player = new Player(this, groups, 550, 325)
        player.enableWrapping = false

        this.setupCamera(player)
        this.setupCollisions(groups)
        this.setupUnlocks(groups)

        // notification
        const notifier = new Notifier(this)
        notifier.playOnce("Tutorial2", "You can purchase upgrades by shooting them. Exit the screen to return to battle.")
    }

    protected setupCamera(player: Player): void {
        // camera bounds
        const bounds = new Phaser.Math.Vector2(300, 500)
        const width = this.cameras.main.width
        const height = this.cameras.main.height
        
        const pos = new Phaser.Math.Vector2(-bounds.x / 2, -bounds.y)
        const size = new Phaser.Math.Vector2(width + bounds.x, height + bounds.y - 200)
        this.cameras.main.setBounds(pos.x, pos.y, size.x, size.y)

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