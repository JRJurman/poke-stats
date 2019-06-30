import "babel-polyfill"
import "./styles.css"
import { registerHtml, start } from "tram-one"

import ColorHeader from "./components/ColorHeader"
import Pokemon from "./components/Pokemon";
import MoveTypeAdvantage from './components/MoveTypeAdvantage'
import usePokemon from "./hooks/usePokemon";

const html = registerHtml({
  ColorHeader,
  Pokemon,
  MoveTypeAdvantage
})

const home = () => {
  const pokemon = [
    usePokemon(),
    usePokemon(),
    usePokemon(),
    usePokemon(),
    usePokemon(),
    usePokemon()
  ]

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
    <div>
      <ColorHeader />
      <Pokemon pokemon=${pokemon[0]} />
      <Pokemon pokemon=${pokemon[1]} />
      <Pokemon pokemon=${pokemon[2]} />
      <Pokemon pokemon=${pokemon[3]} />
      <Pokemon pokemon=${pokemon[4]} />
      <Pokemon pokemon=${pokemon[5]} />
      <div class="Foo">
        <MoveTypeAdvantage ${pokemonMoves} />
      </div>
    </div>
  `
}

start("#app", home)
