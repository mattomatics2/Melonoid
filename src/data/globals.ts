import type { phases } from "./types"

export const Globals = {
    fireDelay: 225,
    fireDamage: 10,
    fireCount: 1,

    luck: 1,
    shieldCount: 0,
    pierceCount: 0,

    melonFrequency: 3000
}

export const Saved = {
    unlocks: [""],
    stars: 0
}

export const Phases: phases = {
    0: {
        sprite: "largeMelon",
        deathSound: "largeExplosion",
        health: 150,
        flashSize: 2,
        shardChance: 50
    },

    1: {
        sprite: "halfMelon",
        deathSound: "smallExplosion",
        health: 100,
        flashSize: 1.5,
        shardChance: 15
    },

    2: {
        sprite: "smallMelon",
        deathSound: "smallExplosion",
        health: 50,
        flashSize: 1,
        shardChance: 5
    },
}