import { Globals } from "../data/globals"

export class Stats extends Phaser.GameObjects.Container {
    private shards: Phaser.GameObjects.Text
    private seeds: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene) {
        super(scene)

        this.shards = scene.add.text(0, 0, `★ ${Globals.shards}`, {
            fontFamily: "Verdana",
            fontSize: "18px",
            fontStyle: "bold",
            stroke: "black",
            strokeThickness: 5,
            color: "#b960db",
            align: "right"
        })

        this.seeds = scene.add.text(0, 26, `❖ ${Globals.seeds}`, {
            fontFamily: "Verdana",
            fontSize: "18px",
            fontStyle: "bold",
            stroke: "black",
            strokeThickness: 5,
            color: "#22a335",
            align: "right"
        })

        this.setup()
    }

    protected setup(): void {
        // properties
        this.setScrollFactor(0)
        this.setDepth(100)
        this.shards.setOrigin(1, 0)
        this.seeds.setOrigin(1, 0)
        
        // move container to top right
        this.x = this.scene.cameras.main.width - 10
        this.y = 10
        
        // add to scene
        this.add([this.shards, this.seeds])
        this.scene.add.existing(this)
    }

    protected preUpdate(): void {
        // update stats each frame
        this.shards.setText(`★ ${Globals.shards}`)
        this.seeds.setText(`❖ ${Globals.seeds}`)
    }
}