import './TeamStats.scss';

import { registerHtml } from "tram-one"
import MoveTypeAdvantage from '../MoveTypeAdvantage'
import TypeDefenses from '../TypeDefenses'

const html = registerHtml({
  MoveTypeAdvantage,
  TypeDefenses
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

  const pokemonObjects = pokemon.map(pokemon => pokemon.pokemon)

  return html`
    <div class="TeamStats">
      <div class="Label">Team Stats</div>
      <TypeDefenses pokemon=${pokemonObjects} />
      <MoveTypeAdvantage ${pokemonMoves} />
    </div>
  `
}
