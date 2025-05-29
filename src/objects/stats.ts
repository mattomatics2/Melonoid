import { Saved } from "../data/globals"

export class Stats extends Phaser.GameObjects.Container {
    private shards: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene) {
        super(scene)

        this.shards = scene.add.text(0, 0, `★ ${Saved.shards}`, {
            fontFamily: "Verdana",
            fontSize: "18px",
            fontStyle: "bold",
            stroke: "black",
            strokeThickness: 5,
            color: "#b960db",
            align: "right"
        })

        this.setup()
    }

    protected setup(): void {
        // properties
        this.setScrollFactor(0)
        this.setDepth(100)
        this.shards.setOrigin(1, 0)
        
        // move container to top right
        this.x = this.scene.cameras.main.width - 10
        this.y = 10
        
        // add to scene
        this.add([this.shards])
        this.scene.add.existing(this)
    }

    protected preUpdate(): void {
        // update stats each frame
        this.shards.setText(`★ ${Saved.shards}`)
    }
}