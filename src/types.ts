export type groups = {
    player: Phaser.Physics.Arcade.Group,
    bullets: Phaser.Physics.Arcade.Group,
    enemies: Phaser.Physics.Arcade.Group
}

export type unlock = {
    x: integer,
    y: integer,
    requirement: string
}

export type phase = {
    sprite: string,
    deathSound: string,
    health: integer,
    flashSize: integer,
    reward: integer
}

export type phases = Record<number, phase>
export type unlocks = Record<string, unlock>