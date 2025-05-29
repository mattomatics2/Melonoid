import Phaser from "phaser"
import { BattleScene } from "./scenes/battle"
import { UpgradeTree } from "./scenes/tree"
import { Saved } from "./data/globals"

const config = {
    type: Phaser.WEBGL,
    width: 1100,
    height: 650,
    backgroundColor: 0x09080a,

    fps: {
        target: 120,
        forceSetTimeOut: true
    },

    scene: [
        BattleScene,
        UpgradeTree
    ],

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: "arcade",
        arcade: {
            gravity: {x: 0, y: 0}
        }
    }
}

window.onbeforeunload = () => {
    localStorage.setItem("MelonoidSaved", JSON.stringify(Saved))
}

window.onload = () => {
    const savedData = localStorage.getItem("MelonoidSaved")
    if (savedData) {
        Object.assign(Saved, JSON.parse(savedData))
    }
}

new Phaser.Game(config)