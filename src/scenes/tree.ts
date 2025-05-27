import { Player } from "../objects/player"
import { Unlock } from "../objects/unlock"
import { Bullet } from "../objects/bullet"
import { treeData } from "../data/unlocks"
import type { groups } from "../types"

export class UpgradeTree extends Phaser.Scene {
    constructor() {
        super("UpgradeTree")
    }

    protected preload(): void {
        // images
        this.load.image("player", "images/ship.png")
        this.load.image("bullet", "images/bullet.png")
        this.load.image("unlockblock", "images/unlockblock.png")

        // sounds
        this.load.audio("laserShoot", "sounds/laser-shoot.wav")
        this.load.audio("melonHit", "sounds/melon-hit.wav")
        this.load.audio("blockHit", "sounds/block-hit.wav")
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
        this.setupCollisions(groups)

        // camera setup
        this.cameras.main.startFollow(player)
        this.cameras.main.setBounds(-200, -500, 1500, 1000)
        this.cameras.main.setDeadzone(100, 100)
        this.cameras.main.setLerp(0.02, 0.02) 

        // upgrade items
        for (const name in treeData) {
            const data = treeData[name]

            const posX = (data.x * 200) + 550
            const posY = (data.y * 200) + 150

            new Unlock(this, groups, posX, posY, name)
        }
    }

    protected setupCollisions(groups: groups): void {
        // bullet/unlock
        this.physics.add.overlap(groups.bullets, groups.enemies, (bullet, unlock) => {
            (bullet as Bullet).destroy();
            (unlock as Unlock).damage();
        })
    }
}