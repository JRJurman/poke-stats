import { registerHtml } from "tram-one"
import TypeBadge from "../TypeBadge";
import usePokemon from "../../hooks/usePokemon"
import { getAttackEffectiveness } from "../../pokemon-logic/effectiveness"

const html = registerHtml({
  TypeBadge
})

const sortByEffectiveness = (typeA, typeB) => {
  return typeB.effectiveness - typeA.effectiveness
}

export default () => {
  const { pokemon, pokemonMoveset, pokemonMoves } = usePokemon()

  if (!pokemon) {
    return ''
  }

  const types = Object.values(pokemonMoveset)
    .map(move => pokemonMoves[move])
    .filter(moveObject => moveObject !== undefined)
    .map(moveObject => moveObject.type.name)

  // if we haven't loaded the information for any of the moves, don't render anything
  if (types.length === 0) {
    return ''
  }

  const attackTypes = getAttackEffectiveness(types).sort(sortByEffectiveness)
  const attackTypeBadges = attackTypes.map(({type, effectiveness}) => html`<TypeBadge type=${type} effectiveness=${effectiveness} />`)

  return html`
    <div style="margin-top: 50px">
      Move Type Advantage
      <hr />
      <div>${attackTypeBadges}</div>
    </div>
  `
}
