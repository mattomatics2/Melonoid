import type { phases } from "./types"

export const Globals = {
    fireDelay: 225,
    fireDamage: 10,
    fireCount: 1,

    fireCountCost: 160,
    fireDelayCost: 25,
    fireDamageCost: 50,

    melonFrequency: 1000,
    score: 0,
    cash: 10
}

export const Phases: phases = {
    0: {
        sprite: "largeMelon",
        deathSound: "largeExplosion",
        health: 150,
        flashSize: 2,
        reward: 10
    },

    1: {
        sprite: "halfMelon",
        deathSound: "smallExplosion",
        health: 100,
        flashSize: 1.5,
        reward: 5
    },

    2: {
        sprite: "smallMelon",
        deathSound: "smallExplosion",
        health: 50,
        flashSize: 1,
        reward: 2
    },
}

export const SavedUnlocks = [""]