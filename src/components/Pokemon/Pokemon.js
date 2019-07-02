import { registerHtml } from "tram-one"

import NameInput from "../NameInput"
import PokeImage from "../PokeImage"
import PokemonTypes from "../PokemonTypes"
import TypeDefenses from "../TypeDefenses"
import MoveSet from "../MoveSet"
import MoveTypeAdvantage from "../MoveTypeAdvantage"
import VariantDropdown from "../VariantDropdown"
import './Pokemon.scss'

const html = registerHtml({
  NameInput,
  PokeImage,
  PokemonTypes,
  MoveSet,
  TypeDefenses,
  MoveTypeAdvantage,
  VariantDropdown
})

export default (props) => {
  const { 
    pokemon, 
    pokemonName, onUpdatePokemonName, 
    pokemonMoveset, pokemonMoves, onUpdatePokemonMove, 
    pokemonVariant, onUpdateVariant, pokemonVarieties,
    defaultImage 
  } = props.pokemon

  return html`
    <div class="Pokemon">
      <div class="Header">
        <PokeImage pokemon=${pokemon} defaultImage=${defaultImage} />
        <div>
          <NameInput value=${pokemonName} onUpdate=${onUpdatePokemonName} />
          <PokemonTypes pokemon=${pokemon} />
          <VariantDropdown 
            pokemonVariant=${pokemonVariant}
            onUpdateVariant=${onUpdateVariant}
            pokemonVarieties=${pokemonVarieties}
          />
        </div>
      </div>
      <TypeDefenses showEffectiveness=${true} pokemon=${[pokemon]} />
      <MoveSet pokemon=${pokemon} pokemonMoveset=${pokemonMoveset} pokemonMoves=${pokemonMoves} onUpdatePokemonMove=${onUpdatePokemonMove} />
      <MoveTypeAdvantage pokemonMoveset=${pokemonMoveset} pokemonMoves=${pokemonMoves} />
    </div>
  `
}
