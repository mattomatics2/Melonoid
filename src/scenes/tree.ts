import { Player } from "../objects/player"
import { Unlock } from "../objects/unlock"
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

        this.cameras.main.startFollow(player)
        this.cameras.main.setBounds(-200, -500, 1500, 1000)

        // test upgrade item
        const item = new Unlock(this, 200, 300)

        // // test upgrade item
        // const item = this.add.sprite(200, 200, "unlockblock")
        // item.setScale(0.4)
        // item.setOrigin(0.5, 0.5)

        // // test label
        // const title = this.add.text(200, 200, "Pierce III", {
        //     fontFamily: "Verdana",
        //     fontSize: "20px",
        //     fontStyle: "bold",
        //     stroke: "black",
        //     strokeThickness: 5,
        //     wordWrap: {width: 1},
        //     align: "center"
        // })

        // title.setOrigin(0.5, 0.5)
    }
}