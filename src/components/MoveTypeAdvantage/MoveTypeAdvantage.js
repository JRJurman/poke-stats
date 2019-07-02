import { registerHtml } from "tram-one"
import TypeBadge from "../TypeBadge";
import { getAttackEffectiveness } from "../../pokemon-logic/effectiveness"
import "./MoveTypeAdvantage.scss"

const html = registerHtml({
  TypeBadge
})

const sortByEffectiveness = (typeA, typeB) => {
  return typeB.effectiveness - typeA.effectiveness
}

const filterStrong = ({effectiveness}) => effectiveness >= 1
const filterWeak = ({effectiveness}) => effectiveness <= 1

export default ({ pokemonMoveset, pokemonMoves, showEffectiveness=true }) => {
  if (!pokemonMoveset) {
    return
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
  const strongTypes = attackTypes.filter(filterStrong).map(
    ({type, effectiveness}) => html`<TypeBadge type=${type} effectiveness=${showEffectiveness && effectiveness} />`
  )
  const weakTypes = attackTypes.filter(filterWeak).map(
    ({type, effectiveness}) => html`<TypeBadge type=${type} effectiveness=${showEffectiveness && effectiveness} />`
  )

  return html`
    <div class="MoveTypeAdvantage">
      <div class="strong-container">
        Strong Against
        <div class="Badges">${strongTypes}</div>
      </div>
      <div class="weak-container">
        Weak Against
        <div class="Badges">${weakTypes}</div>
      </div>
    </div>
  `
}
