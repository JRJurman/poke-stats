import "babel-polyfill"
import "./styles.css"
import { registerHtml, start } from "tram-one"

import ColorHeader from "./components/ColorHeader"
import NameInput from "./components/NameInput"
import PokeImage from "./components/PokeImage"
import PokemonTypes from "./components/PokemonTypes"
import TypeDefenses from "./components/TypeDefenses"
import MoveSet from "./components/MoveSet";
import MoveTypeAdvantage from "./components/MoveTypeAdvantage";
import usePokemon from "./hooks/usePokemon";

const html = registerHtml({
  ColorHeader,
  NameInput,
  PokeImage,
  PokemonTypes,
  MoveSet,
  TypeDefenses,
  MoveTypeAdvantage
})

const home = () => {
  const { pokemon, pokemonName, onUpdatePokemonName, pokemonMoveset, pokemonMoves, onUpdatePokemonMove } = usePokemon()
  return html`
    <div>
      <ColorHeader />
      <PokeImage pokemon=${pokemon} />
      <NameInput value=${pokemonName} onUpdate=${onUpdatePokemonName} />
      <PokemonTypes pokemon=${pokemon} />
      <TypeDefenses pokemon=${pokemon} />
      <MoveSet pokemon=${pokemon} pokemonMoveset=${pokemonMoveset} pokemonMoves=${pokemonMoves} onUpdatePokemonMove=${onUpdatePokemonMove} />
      <MoveTypeAdvantage />
    </div>
  `
}

start("#app", home)
