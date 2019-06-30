import './MoveSet.scss'
import { registerHtml } from "tram-one"
import MoveDropdown from '../MoveDropdown'

const html = registerHtml({
  MoveDropdown
})

export default ({ pokemon, pokemonMoveset, pokemonMoves, onUpdatePokemonMove }) => {
  if (!pokemon) {
    return ''
  }

  const moveOptions = pokemon && pokemon.moves.map(({move}) => move.name)

  const selectedNames = [pokemonMoveset[0], pokemonMoveset[1], pokemonMoveset[2], pokemonMoveset[3]]
  const selectedMoves = selectedNames.map(name => ({
    name: name,
    type: pokemonMoves[name] ? pokemonMoves[name].type.name : ''
  }));

  return html`
    <div class="MoveSet">
      Move Set
      <hr />
      <div>
        <MoveDropdown moveOptions=${moveOptions} moveName=${selectedMoves[0].name} moveType=${selectedMoves[0].type} onUpdatePokemonMove=${onUpdatePokemonMove(0)} />
        <MoveDropdown moveOptions=${moveOptions} moveName=${selectedMoves[1].name} moveType=${selectedMoves[1].type} onUpdatePokemonMove=${onUpdatePokemonMove(1)} />
        <MoveDropdown moveOptions=${moveOptions} moveName=${selectedMoves[2].name} moveType=${selectedMoves[2].type} onUpdatePokemonMove=${onUpdatePokemonMove(2)} />
        <MoveDropdown moveOptions=${moveOptions} moveName=${selectedMoves[3].name} moveType=${selectedMoves[3].type} onUpdatePokemonMove=${onUpdatePokemonMove(3)} />
      </div>
    </div>
  `
}
