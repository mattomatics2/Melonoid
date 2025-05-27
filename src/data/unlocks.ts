import type { unlocks } from "../types"

export const treeData: unlocks = {
    // multishot
    "Multishot I": {
        x: -2, y: 0,
        requirement: "",
        unlock: () => console.log("purchase")
    },

    "Multishot II": {
        x: -2, y: -1,
        requirement: "Multishot I",
        unlock: () => console.log("purchase")
    },

    "Multishot III": {
        x: -2, y: -2,
        requirement: "Multishot II",
        unlock: () => console.log("purchase")
    },

    // quickshot
    "Quickshot I": {
        x: 0, y: 0,
        requirement: "",
        unlock: () => console.log("purchase")
    },

    "Quickshot II": {
        x: 0, y: -1,
        requirement: "Quickshot I",
        unlock: () => console.log("purchase")
    },

    "Quickshot III": {
        x: 0, y: -2,
        requirement: "Quickshot II",
        unlock: () => console.log("purchase")
    },

    // damage
    "Damage I": {
        x: 2, y: 0,
        requirement: "",
        unlock: () => console.log("purchase")
    },

    "Damage II": {
        x: 2, y: -1,
        requirement: "Damage I",
        unlock: () => console.log("purchase")
    },

    "Damage III": {
        x: 2, y: -2,
        requirement: "Damage II",
        unlock: () => console.log("purchase")
    },
}