import "./MoveDropdown.scss"
import { registerHtml } from "tram-one"
import usePokemon from '../../hooks/usePokemon'

const html = registerHtml()

export default ({index}) => {
  const {pokemon, pokemonMoveset, pokemonMoves, onUpdatePokemonMove} = usePokemon()

  if (!pokemon) {
    return null
  }

  const options = pokemon.moves.map((({move: {name}}) => html`
    <option value=${name}>
      ${name.replace('-', ' ')}
    </option>
  `))

  const moveName = pokemonMoveset[index];
  const moveType = pokemonMoves[moveName] ? pokemonMoves[moveName].type.name : ''

  return html`
    <select 
      classname="MoveDropdown type-${moveType}" 
      value=${moveName || ""}
      onchange=${onUpdatePokemonMove(index)}
    >
      <option disabled value="" selected >Move ${parseInt(index) + 1}</option>
      ${options}
    </select>
  `
}
