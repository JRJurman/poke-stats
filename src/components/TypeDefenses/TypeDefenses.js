import { registerHtml, useGlobalState } from "tram-one"
import TypeBadge from "../TypeBadge";
import { getDefenseEffectiveness } from "../../pokemon-logic/effectiveness"

const html = registerHtml({
  TypeBadge
})

const sortByEffectiveness = (typeA, typeB) => {
  return typeA.effectiveness - typeB.effectiveness
}

export default ({ pokemon }) => {
  if (!pokemon || !pokemon[0]) {
    return ''
  }

  const pokemonObjects = pokemon.filter(pokemonObject => !!pokemonObject)

  const types = pokemonObjects.reduce((pokemonTypes, pokemonObject) => {
    return [
      ...pokemonTypes,
      ...(pokemonObject.types.map(({type: {name}}) => name))
    ]
  }, [])

  const defenseTypes = getDefenseEffectiveness(types).sort(sortByEffectiveness)
  const defenseTypeBadges = defenseTypes.map(({type, effectiveness}) => html`<TypeBadge type=${type} effectiveness=${effectiveness} />`)
  return html`
    <div class="TypeDefenses">
      Type Defenses
      <hr />
      <div>${defenseTypeBadges}</div>
    </div>
  `
}
