import { Globals, Saved } from "../data/globals"
import type { groups, unlock } from "../data/types"

type config = {
    name: string,
    info: unlock,
    connections: Record<string, Unlock>
}

export class Unlock extends Phaser.GameObjects.Container {
    private title: Phaser.GameObjects.Text
    private price: Phaser.GameObjects.Text
    private outline: Phaser.GameObjects.Sprite
    private startPos: Phaser.Math.Vector2
    private groups: groups

    private health = 5
    private unlocked = false

    sprite: Phaser.GameObjects.Sprite
    config: config

    constructor(scene: Phaser.Scene, groups: groups, x: integer, y: integer, config: config) {
        super(scene, x, y)

        this.title = scene.add.text(0, 0, config.name, {
            fontFamily: "Verdana",
            fontSize: "20px",
            fontStyle: "bold",
            stroke: "black",
            strokeThickness: 5,
            wordWrap: {width: 1},
            align: "center"
        })

        this.price = scene.add.text(0, -30, `★ ${config.info.price}`, {
            fontFamily: "Verdana",
            fontSize: "16px",
            fontStyle: "bold",
            stroke: "black",
            strokeThickness: 5,
            color: "#b960db",
            align: "center"
        })

        this.sprite = scene.add.sprite(0, 0, "unlockBlock")
        this.outline = scene.add.sprite(0, 0, "unlockOutline")
        this.startPos = new Phaser.Math.Vector2(x, y)

        this.config = config
        this.name = config.name
        this.groups = groups

        this.setup()
    }

    // setup
    protected setup(): void {
        // properties
        this.sprite.setScale(0.4)
        this.title.setOrigin(0.5, 0.5)
        this.price.setOrigin(0.5, 1)
        this.outline.setScale(0.4)
        this.outline.setVisible(false)

        // add children to container
        this.setSize(this.sprite.displayWidth, this.sprite.displayHeight)
        this.add([this.sprite, this.outline, this.title, this.price])

        this.setupAnim()
        this.update()

        // add container to scene
        this.scene.add.existing(this)
        this.groups.enemies.add(this)
    }

    protected setupAnim(): void {
        // get random rotation seed
        const seed = Phaser.Math.FloatBetween(0, Math.PI * 2)
        const radius = 15

        // drift sprite around
        this.scene.time.addEvent({
            delay: 16,
            loop: true,
            callback: () => {
                const t = this.scene.time.now / 1000
                this.x = this.startPos.x + Math.cos(t + seed) * radius
                this.y = this.startPos.y + Math.sin(t + seed) * radius
            }
        })
    }

    // effects
    protected bounceEffect(): void {
        // change the sprite size
        this.setScale(1.2)

        // tween to original size
        this.scene.tweens.add({
            targets: this,
            scale: 1,
            duration: 100
        })
    }

    protected flashEffect(flashColor: number): void {
        // flash the sprite white
        this.sprite.setTintFill(flashColor)

        // reset to default tint
        this.scene.time.delayedCall(20, () => {
            this.sprite.clearTint()
            if (this.unlocked) this.sprite.setTint(0x66ff54)
        })
    }

    protected purchaseEffect(): void {
        // audio
        this.scene.sound.play("purchase")

        // reset outline
        this.outline.setAlpha(1)
        this.outline.setVisible(true)
        this.outline.setScale(0.4)

        // tween out
        this.scene.tweens.add({
            targets: this.outline,
            scale: 1,
            alpha: 0,
            duration: 200
        })
    }

    // public
    update(): void {
        // dimming
        const hasRequirement = Saved.unlocks.includes(this.config.info.requirement)
        this.setAlpha(hasRequirement ? 1 : 0.5)

        // unlocked
        if (Saved.unlocks.includes(this.name)) {
            this.unlock()
        }
    }

    unlock(): void {
        this.unlocked = true
        this.sprite.setTint(0x66ff54)
        this.price.destroy()
        this.config.info.unlock()

        // sub unlock visibility
        for (const name in this.config.connections) {
            const data = this.config.connections[name]
            const requirement = data.config.info.requirement
            
            if (requirement == this.name) {
                data.setAlpha(1)
            }
        }
    }

    damage(): void {
        // visuals
        this.scene.sound.play("blockHit")
        this.bounceEffect()
        this.flashEffect(0xc9c9c9)
        
        // validate unlockability
        const hasRequirement = Saved.unlocks.includes(this.config.info.requirement)
        const hasShards = Saved.shards >= this.config.info.price
        const canUnlock = hasRequirement && !this.unlocked && hasShards
        if (!canUnlock) {
            // can't unlock
            this.flashEffect(0xeb4034)
            this.scene.sound.play("error")
            return
        }

        // purchasing
        this.health --
        if (this.health <- 1) {
            Saved.unlocks.push(this.name)
            Saved.shards -= this.config.info.price
            this.purchaseEffect()
            this.unlock()
        }
    }
}