export type groups = {
    player: Phaser.Physics.Arcade.Group,
    bullets: Phaser.Physics.Arcade.Group,
    enemies: Phaser.Physics.Arcade.Group
}

export type unlock = {
    x: integer,
    y: integer,
    price: integer,
    requirement: string,
    unlock: () => void
}

export type phase = {
    sprite: string,
    deathSound: string,
    health: integer,
    flashSize: integer,
    shardChance: integer
}

export type savedUnlocks = Array<string>
export type phases = Record<number, phase>
export type unlocks = Record<string, unlock>