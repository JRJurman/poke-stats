import { registerHtml } from "tram-one"
import TypeBadge from "../TypeBadge";

const html = registerHtml({
  TypeBadge
})

export default ({ pokemon }) => {

  if (!pokemon) {
    return ''
  }

  const types = pokemon.types.map(({type: {name}}) => name)
  const typeBadges = types.map(type => html`<TypeBadge type=${type}/>`)

  return html`
    <div style="margin-top: 10px">
      ${typeBadges}
    </div>
  `
}
