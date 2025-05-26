export type groups = {
    player: Phaser.Physics.Arcade.Group,
    bullets: Phaser.Physics.Arcade.Group,
    enemies: Phaser.Physics.Arcade.Group
}

export type phase = {
    sprite: string,
    deathSound: string,
    health: integer,
    flashSize: integer,
    reward: integer
}

export type hitblock = {
    title: string,
    subtitle: string,
    price: integer,
    handler: () => void
}

export type phases = Record<number, phase>