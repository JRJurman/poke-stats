import "./VariantDropdown.scss"
import { registerHtml } from "tram-one"

const html = registerHtml()

export default ({ pokemonVariant, onUpdateVariant, pokemonVarieties=[] }) => {
  if (pokemonVarieties.length <= 1) {
    return null
  }

  const defaultOption = pokemonVarieties.find(({is_default}) => is_default).pokemon.name
  const isVariantInVarieties = pokemonVarieties.some(({pokemon: {name}}) => name === pokemonVariant)
  const selected = isVariantInVarieties ? pokemonVariant : defaultOption
  
  const options = pokemonVarieties.map((({pokemon: {name}}) => html`
    <option value=${name} ${selected === name ? 'selected' : ''}>
      ${name.replace('-', ' ')}
    </option>
  `))

  return html`
    <select
      class="VariantDropdown"
      value=${selected}
      onchange=${onUpdateVariant}
    >
      ${options}
    </select>
  `
}
