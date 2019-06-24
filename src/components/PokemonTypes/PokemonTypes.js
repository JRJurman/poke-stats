import { registerHtml, useGlobalState } from "tram-one"
import TypeBadge from "../TypeBadge";
import usePokemon from "../../hooks/usePokemon"
import { getDefenseEffectiveness } from "../../pokemon-logic/effectiveness"

const html = registerHtml({
  TypeBadge
})

export default () => {
  const { pokemon } = usePokemon()

  if (!pokemon) {
    return ''
  }

  const types = pokemon.types.map(({type: {name}}) => name)
  const typeBadges = types.map(type => html`<TypeBadge type=${type}/>`)
  const defenseTypes = getDefenseEffectiveness(types)
  const defenseTypeBadges = defenseTypes.map(({type, effectiveness}) => html`<TypeBadge type=${type} effectiveness=${effectiveness}/>`)
  return html`
    <div style="margin-top: 10px">
      ${typeBadges}
      <div>
        ${defenseTypeBadges}
      </div>
    </div>
  `
}
