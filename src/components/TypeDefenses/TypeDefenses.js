import { registerHtml, useGlobalState } from "tram-one"
import TypeBadge from "../TypeBadge";
import usePokemon from "../../hooks/usePokemon"
import { getDefenseEffectiveness } from "../../pokemon-logic/effectiveness"

const html = registerHtml({
  TypeBadge
})

const sortByEffectiveness = (typeA, typeB) => {
  return typeA.effectiveness - typeB.effectiveness
}

export default () => {
  const { pokemon } = usePokemon()

  if (!pokemon) {
    return ''
  }

  const types = pokemon.types.map(({type: {name}}) => name)
  const defenseTypes = getDefenseEffectiveness(types).sort(sortByEffectiveness)
  const defenseTypeBadges = defenseTypes.map(({type, effectiveness}) => html`<TypeBadge type=${type} effectiveness=${effectiveness} />`)
  return html`
    <div style="margin-top: 50px">
      Type Defenses
      <hr />
      <div>${defenseTypeBadges}</div>
    </div>
  `
}
