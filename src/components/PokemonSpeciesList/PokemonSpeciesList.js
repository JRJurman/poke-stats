import { registerHtml } from "tram-one"

const html = registerHtml()

const PokemonSpeciesList = ({species}) => {
  const pokemonOptions = species.map(
    ({name}) => html`<option value=${name} />`
  )
  return html`
    <datalist id="pokemon-options">
      ${pokemonOptions}
    </datalist>
  `
}

export default PokemonSpeciesList