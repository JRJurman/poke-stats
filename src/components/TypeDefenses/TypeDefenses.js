import { registerHtml } from "tram-one"
import TypeBadge from "../TypeBadge";
import { getDefenseEffectiveness } from "../../pokemon-logic/effectiveness"
import "./TypeDefenses.scss"

const html = registerHtml({
  TypeBadge
})

const sortByEffectiveness = (typeA, typeB) => {
  return typeA.effectiveness - typeB.effectiveness
}

const filterWeak = ({effectiveness}) => effectiveness <= 1
const filterResistant = ({effectiveness}) => effectiveness >= 1

const renderBadge = ({type, effectiveness}) => html`<TypeBadge type=${type} effectiveness=${showEffectiveness && effectiveness} />`

export default ({ pokemon, showEffectiveness }) => {
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
  const weakToTypes = defenseTypes.filter(filterWeak).map(
    ({type, effectiveness}) => html`<TypeBadge type=${type} effectiveness=${showEffectiveness && effectiveness} />`
  )
  const resistantToTypes = defenseTypes.filter(filterResistant).map(
    ({type, effectiveness}) => html`<TypeBadge type=${type} effectiveness=${showEffectiveness && effectiveness} />`
  )

  return html`
    <div class="TypeDefenses">
      <div class="TypeResistant">
        Resistant To
        <div class="Badges">${weakToTypes}</div>
      </div>
      <div class="TypeWeakness">
        Weak To
        <div class="Badges">${resistantToTypes}</div>
      </div>
    </div>
  `
}
