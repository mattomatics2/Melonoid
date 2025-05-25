import type { phases } from "./types"

export const Globals = {
    fireDelay: 225,
    fireDamage: 10,
    fireCount: 1,

    fireCountCost: 250,
    fireDelayCost: 50,
    fireDamageCost: 100,

    melonFrequency: 2000,
    score: 0,
    cash: 999
}

export const Phases: phases = {
    0: {
        sprite: "largeMelon",
        deathSound: "largeExplosion",
        health: 150,
        flashSize: 2
    },

    1: {
        sprite: "halfMelon",
        deathSound: "smallExplosion",
        health: 100,
        flashSize: 1.5
    },

    2: {
        sprite: "smallMelon",
        deathSound: "smallExplosion",
        health: 50,
        flashSize: 1
    },
}