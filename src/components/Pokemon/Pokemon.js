import { registerHtml } from "tram-one"

import NameInput from "../NameInput"
import PokeImage from "../PokeImage"
import PokemonTypes from "../PokemonTypes"
import TypeDefenses from "../TypeDefenses"
import MoveSet from "../MoveSet";
import MoveTypeAdvantage from "../MoveTypeAdvantage";
import './Pokemon.scss';

const html = registerHtml({
  NameInput,
  PokeImage,
  PokemonTypes,
  MoveSet,
  TypeDefenses,
  MoveTypeAdvantage
})

export default (props) => {
  const { pokemon, pokemonName, onUpdatePokemonName, pokemonMoveset, pokemonMoves, onUpdatePokemonMove } = props.pokemon;

  return html`
    <div class="Pokemon">
      <div class="Header">
        <PokeImage pokemon=${pokemon} />
        <div>
          <NameInput value=${pokemonName} onUpdate=${onUpdatePokemonName} />
          <PokemonTypes pokemon=${pokemon} />
        </div>
      </div>
      <TypeDefenses pokemon=${pokemon} />
      <MoveSet pokemon=${pokemon} pokemonMoveset=${pokemonMoveset} pokemonMoves=${pokemonMoves} onUpdatePokemonMove=${onUpdatePokemonMove} />
      <MoveTypeAdvantage pokemonMoveset=${pokemonMoveset} pokemonMoves=${pokemonMoves} />
    </div>
  `
}
