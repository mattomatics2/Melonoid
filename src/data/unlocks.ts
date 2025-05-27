import type { unlocks } from "../types"

export const treeData: unlocks = {
    // multishot
    "Multishot I": {
        x: -2, y: 0,
        requirement: ""
    },

    "Multishot II": {
        x: -2, y: -1,
        requirement: "Multishot I"
    },

    "Multishot III": {
        x: -2, y: -2,
        requirement: "Multishot II"
    },

    // quickshot
    "Quickshot I": {
        x: 0, y: 0,
        requirement: ""
    },

    "Quickshot II": {
        x: 0, y: -1,
        requirement: "Quickshot I"
    },

    "Quickshot III": {
        x: 0, y: -2,
        requirement: "Quickshot II"
    },

    // damage
    "Damage I": {
        x: 2, y: 0,
        requirement: ""
    },

    "Damage II": {
        x: 2, y: -1,
        requirement: "Damage I"
    },

    "Damage III": {
        x: 2, y: -2,
        requirement: "Damage II"
    },
}