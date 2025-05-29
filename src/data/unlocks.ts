import { Globals } from "./globals"
import type { unlocks } from "./types"

export const treeData: unlocks = {
    // quickshot
    "Quickshot I": {
        x: 0, y: 0,
        requirement: "", price: 1,
        unlock: () => Globals.fireDelay = 200
    },

    "Quickshot II": {
        x: 0, y: -1,
        requirement: "Quickshot I", price: 5,
        unlock: () => Globals.fireDelay = 175
    },

    "Quickshot III": {
        x: 0, y: -2,
        requirement: "Quickshot II", price: 15,
        unlock: () => Globals.fireDelay = 150
    },

    "Quickshot IV": {
        x: 0, y: -3,
        requirement: "Quickshot III", price: 30,
        unlock: () => Globals.fireDelay = 125
    },

    // multiplier
    "Luck I": {
        x: -2, y: 0,
        requirement: "Quickshot I", price: 15,
        unlock: () => Globals.multiplier = 1.1
    },

    "Luck II": {
        x: -4, y: 0,
        requirement: "Luck I", price: 25,
        unlock: () => Globals.multiplier = 1.2
    },

    // damage
    "Damage I": {
        x: 2, y: -1,
        requirement: "Quickshot II", price: 5,
        unlock: () => Globals.fireDamage = 11
    },

    "Damage II": {
        x: 2, y: -2,
        requirement: "Damage I", price: 15,
        unlock: () => Globals.fireDamage = 12
    },

    "Damage III": {
        x: 2, y: -3,
        requirement: "Damage II", price: 25,
        unlock: () => Globals.fireDamage = 13
    },

    "Damage IV": {
        x: 2, y: -4,
        requirement: "Damage III", price: 40,
        unlock: () => Globals.fireDamage = 14
    },

    // multishot
    "Multishot I": {
        x: -2, y: -2,
        requirement: "Quickshot III", price: 20,
        unlock: () => Globals.fireCount = 2
    },

    "Multishot II": {
        x: -2, y: -3,
        requirement: "Multishot I", price: 35,
        unlock: () => Globals.fireCount = 3
    },

    "Multishot III": {
        x: -2, y: -4,
        requirement: "Multishot II", price: 50,
        unlock: () => Globals.fireCount = 4
    },

    // shield
    "Shield I": {
        x: -4, y: -2,
        requirement: "Multishot I", price: 15,
        unlock: () => Globals.shieldCount = 1
    },

    "Shield II": {
        x: -4, y: -3,
        requirement: "Shield I", price: 20,
        unlock: () => Globals.shieldCount = 2
    },

    // piercing
    "Piercing I": {
        x: 4, y: -1,
        requirement: "Damage I", price: 10,
        unlock: () => Globals.pierceCount = 1
    },

    "Piercing II": {
        x: 4, y: -2,
        requirement: "Piercing I", price: 20,
        unlock: () => Globals.pierceCount = 2
    }
}