import "./VariantDropdown.scss"
import { registerHtml } from "tram-one"

const html = registerHtml()

export default ({ pokemonVariant, onUpdateVariant, pokemonVarieties=[] }) => {
  if (pokemonVarieties.length <= 1) {
    return null
  }

  const defaultOption = pokemonVarieties.find(({is_default}) => is_default)

  const options = pokemonVarieties.map((({pokemon: {name}}) => html`
    <option value=${name}>
      ${name.replace('-', ' ')}
    </option>
  `))

  return html`
    <select
      class="VariantDropdown"
      value=${pokemonVariant || defaultOption}
      onchange=${onUpdateVariant}
    >
      ${options}
    </select>
  `
}
