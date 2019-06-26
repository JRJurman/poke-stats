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
import * as ALL_TYPES from './types'

const attackEffectiveness = {
  [NORMAL]: {
    1: [NORMAL, GRASS, GROUND, ICE, WATER, DRAGON, POISON, FLYING, BUG, FAIRY, DARK, PSYCHIC, ELECTRIC, FIGHTING, FIRE],
    0.5: [ROCK, STEEL],
    0: [GHOST],
  },
  [FIRE]: {
    2: [GRASS, ICE, BUG, STEEL],
    1: [NORMAL, GHOST, GROUND, POISON, FLYING, FAIRY, DARK, PSYCHIC, ELECTRIC, FIGHTING],
    0.5: [FIRE, WATER, ROCK, DRAGON]
  },
  [WATER]: {
    2: [FIRE, GROUND, ROCK],
    1: [NORMAL, GHOST, ICE, STEEL, POISON, FLYING, BUG, FAIRY, DARK, PSYCHIC, ELECTRIC, FIGHTING],
    0.5: [WATER, GRASS, DRAGON],
  },
  [ELECTRIC]: {
    2: [WATER, FLYING],
    1: [NORMAL, ROCK, GHOST, ICE, STEEL, POISON, BUG, FAIRY, DARK, PSYCHIC, FIGHTING, FIRE],
    0.5: [ELECTRIC, GRASS, DRAGON],
    0: [GROUND]
  },
  [GRASS]: {
    2: [WATER, GROUND, ROCK],
    1: [NORMAL, GHOST, ICE, FAIRY, DARK, PSYCHIC, ELECTRIC, FIGHTING],
    0.5: [FIRE, GRASS, POISON, FLYING, BUG, DRAGON, STEEL]
  },
  [ICE]: {
    2: [GRASS, GROUND, FLYING, DRAGON],
    1: [NORMAL, ROCK, GHOST, POISON, BUG, FAIRY, DARK, PSYCHIC, ELECTRIC, FIGHTING],
    0.5: [FIRE, WATER, ICE, STEEL]
  },
  [FIGHTING]: {
    2: [NORMAL, ICE, ROCK, DARK, STEEL],
    1: [GRASS, GROUND, WATER, DRAGON, ELECTRIC, FIGHTING, FIRE],
    0.5: [POISON, FLYING, PSYCHIC, BUG, FAIRY],
    0: [GHOST]
  },
  [POISON]: {
    2: [GRASS, FAIRY],
    1: [NORMAL, ICE, WATER, DRAGON, FLYING, BUG, DARK, PSYCHIC, ELECTRIC, FIGHTING, FIRE],
    0.5: [POISON, GROUND, ROCK, GHOST],
    0: [STEEL]
  },
  [GROUND]: {
    1: [NORMAL, GHOST, GROUND, ICE, WATER, DRAGON, FAIRY, DARK, PSYCHIC, FIGHTING],
    2: [FIRE, ELECTRIC, POISON, ROCK, STEEL],
    0.5: [GRASS, BUG],
    0: [FLYING]
  },
  [FLYING]: {
    1: [NORMAL, GHOST, GROUND, ICE, WATER, DRAGON, POISON, FLYING, FAIRY, DARK, PSYCHIC, FIRE],
    2: [GRASS, FIGHTING, BUG],
    0.5: [ELECTRIC, ROCK, STEEL]
  },
  [PSYCHIC]: {
    1: [NORMAL, ROCK, GHOST, GRASS, GROUND, ICE, WATER, DRAGON, FLYING, BUG, FAIRY, ELECTRIC, FIRE],
    2: [FIGHTING, POISON],
    0.5: [PSYCHIC, STEEL],
    0: [DARK]
  },
  [BUG]: {
    1: [NORMAL, ROCK, GROUND, ICE, WATER, DRAGON, BUG, ELECTRIC],
    2: [GRASS, PSYCHIC, DARK],
    0.5: [FIRE, FIGHTING, POISON, FLYING, GHOST, STEEL, FAIRY]
  },
  [ROCK]: {
    1: [NORMAL, ROCK, GHOST, GRASS, WATER, DRAGON, POISON, FAIRY, DARK, PSYCHIC, ELECTRIC],
    2: [FIRE, ICE, FLYING, BUG],
    0.5: [FIGHTING, GROUND, STEEL]
  },
  [GHOST]: {
    1: [ROCK, GRASS, GROUND, ICE, STEEL, WATER, DRAGON, POISON, FLYING, BUG, FAIRY, ELECTRIC, FIGHTING, FIRE],
    2: [PSYCHIC, GHOST],
    0.5: [DARK],
    0: [NORMAL]
  },
  [DRAGON]: {
    1: [NORMAL, ROCK, GHOST, GRASS, GROUND, ICE, WATER, POISON, FLYING, BUG, DARK, PSYCHIC, ELECTRIC, FIGHTING, FIRE],
    2: [DRAGON],
    0.5: [STEEL],
    0: [FAIRY]
  },
  [DARK]: {
    1: [NORMAL, ROCK, GRASS, GROUND, ICE, STEEL, WATER, DRAGON, POISON, FLYING, BUG, ELECTRIC, FIRE],
    2: [PSYCHIC, GHOST],
    0.5: [FIGHTING, DARK, FAIRY]
  },
  [STEEL]: {
    1: [NORMAL, GHOST, GRASS, GROUND, DRAGON, POISON, FLYING, BUG, DARK, PSYCHIC, FIGHTING],
    2: [ICE, ROCK, FAIRY],
    0.5: [FIRE, WATER, ELECTRIC, STEEL]
  },
  [FAIRY]: {
    1: [NORMAL, ROCK, GHOST, GRASS, GROUND, ICE, WATER, FLYING, BUG, FAIRY, PSYCHIC, ELECTRIC],
    2: [FIGHTING, DRAGON, DARK],
    0.5: [FIRE, POISON, STEEL]
  }
}

const buildTypeEffectivenessMap = (types, effectivenessMap, mergeFunction, defaultMap = {}) => {
  return types.reduce((effectivenessObject, pokemonType) => {
    const {0: noEffect = [], 0.5: notEffective = [], 1: standardEffect = [], 2: superEffective = []} = effectivenessMap[pokemonType];
    noEffect.forEach(type => {
      effectivenessObject[type] = mergeFunction(effectivenessObject[type], 0)
    })
    notEffective.forEach(type => {
      effectivenessObject[type] = mergeFunction(effectivenessObject[type], 0.5)
    })
    standardEffect.forEach(type => {
      effectivenessObject[type] = mergeFunction(effectivenessObject[type], 1)
    })
    superEffective.forEach(type => {
      effectivenessObject[type] = mergeFunction(effectivenessObject[type], 2)
    })
    return effectivenessObject;
  }, defaultMap)
}

const effectivenessMapToList = (effectivenessMap) => {
  return Object.keys(effectivenessMap).reduce((typeObjects, type) =>
    [
      {
        type,
        effectiveness: effectivenessMap[type]
      },
      ...typeObjects
    ]
  , []).filter(({effectiveness}) => effectiveness !== 1)
}

export const getAttackEffectiveness = (types) => {
  const attackTypeEffectivenessMap = buildTypeEffectivenessMap(types, attackEffectiveness,
    (existingType = -1, newType) => Math.max(existingType, newType)
  )

  return effectivenessMapToList(attackTypeEffectivenessMap)
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

const defenseEffectiveness = Object.keys(attackEffectiveness).reduce(attackToDefense, {});

export const getDefenseEffectiveness = (types) => {
  const defenseTypeEffectivenessMap = buildTypeEffectivenessMap(types, defenseEffectiveness,
    (existingType, newType) => existingType === undefined ? newType : existingType * newType
  )
  return effectivenessMapToList(defenseTypeEffectivenessMap)
}
