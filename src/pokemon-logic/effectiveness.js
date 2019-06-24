import {
    NORMAL,
    ROCK,
    GHOST,
    GRASS,
    GROUND,
    ICE,
    STEEL,
    WATER,
    DRAGON,
    POISON,
    FLYING,
    BUG,
    FAIRY,
    DARK,
    PSYCHIC,
    ELECTRIC,
    FIGHTING,
    FIRE
} from "./types";

export const attackEffectiveness = {
  [NORMAL]: {
    0.5: [ROCK, STEEL],
    0: [GHOST],
  },
  [FIRE]: {
    2: [GRASS, ICE, BUG, STEEL],
    0.5: [FIRE, WATER, ROCK, DRAGON]
  },
  [WATER]: {
    2: [FIRE, GROUND, ROCK],
    0.5: [WATER, GRASS, DRAGON],
  },
  [ELECTRIC]: {
    2: [WATER, FLYING],
    0.5: [ELECTRIC, GRASS, DRAGON],
    0: [GROUND]
  },
  [GRASS]: {
    2: [WATER, GROUND, ROCK],
    0.5: [FIRE, GRASS, POISON, FLYING, BUG, DRAGON, STEEL]
  },
  [ICE]: {
    2: [GRASS, GROUND, FLYING, DRAGON],
    0.5: [FIRE, WATER, ICE, STEEL]
  },
  [FIGHTING]: {
    2: [NORMAL, ICE, ROCK, DARK, STEEL],
    0.5: [POISON, FLYING, PSYCHIC, BUG, FAIRY],
    0: [GHOST]
  },
  [POISON]: {
    2: [GRASS, FAIRY],
    0.5: [POISON, GROUND, ROCK, GHOST],
    0: [STEEL]
  },
  [GROUND]: {
    2: [FIRE, ELECTRIC, POISON, ROCK, STEEL],
    0.5: [GRASS, BUG],
    0: [FLYING]
  },
  [FLYING]: {
    2: [GRASS, FIGHTING, BUG],
    0.5: [ELECTRIC, ROCK, STEEL]
  },
  [PSYCHIC]: {
    2: [FIGHTING, POISON],
    0.5: [PSYCHIC, STEEL],
    0: [DARK]
  },
  [BUG]: {
    2: [GRASS, PSYCHIC, DARK],
    0.5: [FIRE, FIGHTING, POISON, FLYING, GHOST, STEEL, FAIRY]
  },
  [ROCK]: {
    2: [FIRE, ICE, FLYING, BUG],
    0.5: [FIGHTING, GROUND, STEEL]
  },
  [GHOST]: {
    2: [PSYCHIC, GHOST],
    0.5: [DARK],
    0: [NORMAL]
  },
  [DRAGON]: {
    2: [DRAGON],
    0.5: [STEEL],
    0: [FAIRY]
  },
  [DARK]: {
    2: [PSYCHIC, GHOST],
    0.5: [FIGHTING, DARK, FAIRY] 
  },
  [STEEL]: {
    2: [ICE, ROCK, FAIRY],
    0.5: [FIRE, WATER, ELECTRIC, STEEL]
  },
  [FAIRY]: {
    2: [FIGHTING, DRAGON, DARK],
    0.5: [FIRE, POISON, STEEL]
  }
}

const attackToDefense = (defenseObject, attackType) => {
  const attackEffectivenessForType = attackEffectiveness[attackType]
  const { 0: noEffect=[], 0.5: notEffective=[], 2: superEffective=[] } = attackEffectivenessForType;
  
  // build default keys if they don't already exist in our defense object
  [...noEffect, ...notEffective, ...superEffective].forEach((defType) => {
    defenseObject[defType] = defenseObject[defType] || {0: [], 0.5: [], 2: []}
  })

  noEffect.forEach((defType) => {
    defenseObject[defType][0].push(attackType)
  })
  notEffective.forEach((defType) => {
    defenseObject[defType][0.5].push(attackType)
  })
  superEffective.forEach((defType) => {
    defenseObject[defType][2].push(attackType)
  })

  return defenseObject;
}

export const defenseEffectiveness = Object.keys(attackEffectiveness).reduce(attackToDefense, {});