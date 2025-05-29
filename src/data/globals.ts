import type { phases } from "./types"

export const Globals = {
    fireDelay: 225,
    fireDamage: 10,
    fireCount: 1,

    multiplier: 1,
    shieldCount: 0,
    pierceCount: 0,

    melonFrequency: 4000
}

export const Saved = {
    unlocks: [""],
    shards: 0,
    seeds: 0
}

export const Phases: phases = {
    0: {
        sprite: "largeMelon",
        deathSound: "largeExplosion",
        health: 150,
        flashSize: 2,
        seedReward: 10,
        shardChance: 50
    },

    1: {
        sprite: "halfMelon",
        deathSound: "smallExplosion",
        health: 100,
        flashSize: 1.5,
        seedReward: 5,
        shardChance: 15
    },

    2: {
        sprite: "smallMelon",
        deathSound: "smallExplosion",
        health: 50,
        flashSize: 1,
        seedReward: 2,
        shardChance: 5
    },
}