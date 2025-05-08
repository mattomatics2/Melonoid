import Phaser, { Scene } from "phaser"

export class InputManager {
    private scene: Phaser.Scene
    private keymap: Record<string, Phaser.Input.Keyboard.Key[]> = {}

    constructor(scene: Phaser.Scene) {
        this.scene = scene
    }

    addAction(action: string, keys: string[]) {
        const mapped = keys
            .map(key => this.scene.input.keyboard?.addKey(key))
            .filter((key): key is Phaser.Input.Keyboard.Key => key !== undefined)
        
        this.keymap[action] = mapped
    }

    isPressed(action: string): boolean {
        return this.keymap[action].some(key => key.isDown) || false
    }

    getInputAxis(action1: string, action2: string): integer {
        return (this.isPressed(action1) ? 1 : 0) - (this.isPressed(action2) ? 1 : 0)
    }
}