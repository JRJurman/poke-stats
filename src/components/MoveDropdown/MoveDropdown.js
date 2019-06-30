import "./MoveDropdown.scss"
import { registerHtml } from "tram-one"

const html = registerHtml()

export default ({moveOptions, moveName, moveType, onUpdatePokemonMove}) => {
  if (!moveOptions) {
    return null
  }

  const options = moveOptions.map(((name) => html`
    <option value=${name}>
      ${name.replace('-', ' ')}
    </option>
  `))

  return html`
    <select
      class="MoveDropdown type-${moveType}"
      value=${moveName || ""}
      onchange=${onUpdatePokemonMove}
    >
      <option value=${null}></option>
      ${options}
    </select>
  `
}
