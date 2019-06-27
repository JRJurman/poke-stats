import "./PokemonVarietySelect.scss"
import { registerHtml } from "tram-one"
import usePokemon from '../../hooks/usePokemon'

const html = registerHtml()

export default () => {
  const {pokemon, pokemonName, pokemonVariation, onUpdatePokemonVariation, pokemonVariants} = usePokemon()

  if (!pokemon || !pokemonVariants || pokemonVariants[pokemonName] === "LOADING" || pokemonVariants[pokemonName].length < 2) {
    return null
  }

  const options = pokemonVariants[pokemonName].map((({pokemon: {name}}) => html`
    <option value=${name}>
      ${name.replace('-', ' ')}
    </option>
  `))

  return html`
    <select 
      classname="PokemonVarietySelect" 
      value=${pokemonVariation}
      onchange=${onUpdatePokemonVariation}
    >
      ${options}
    </select>
  `
}
