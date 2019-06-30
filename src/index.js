import "babel-polyfill"
import "./styles.scss"
import { registerHtml, start } from "tram-one"

import ColorHeader from "./components/ColorHeader"
import Pokemon from "./components/Pokemon";
import TeamStats from './components/TeamStats'
import usePokemon from "./hooks/usePokemon";

const html = registerHtml({
  ColorHeader,
  Pokemon,
  TeamStats
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

  return html`
    <div class="Page">
      <ColorHeader />
      <TeamStats pokemon=${pokemon} />
      <div class="PokemonContainers">
        <Pokemon pokemon=${pokemon[0]} />
        <Pokemon pokemon=${pokemon[1]} />
        <Pokemon pokemon=${pokemon[2]} />
        <Pokemon pokemon=${pokemon[3]} />
        <Pokemon pokemon=${pokemon[4]} />
        <Pokemon pokemon=${pokemon[5]} />
      </div>
    </div>
  `
}

start("#app", home)
