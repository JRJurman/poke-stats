import './TeamStats.scss';

import { registerHtml } from "tram-one"
import MoveTypeAdvantage from '../MoveTypeAdvantage'

const html = registerHtml({
  MoveTypeAdvantage
})

export default ({ pokemon }) => {

  const pokemonMoves = pokemon.reduce((allMovesObject, pokemon) => {
    return {
      pokemonMoveset: [
        ...allMovesObject.pokemonMoveset,
        ...Object.values(pokemon.pokemonMoveset)
      ],
      pokemonMoves: {
        ...allMovesObject.pokemonMoves,
        ...pokemon.pokemonMoves
      }
    }
  }, {pokemonMoveset: [], pokemonMoves: {}})

  return html`
    <div class="TeamStats">
      <div class="Label">Team Stats</div>
      <MoveTypeAdvantage ${pokemonMoves} />
    </div>
  `
}
