import "babel-polyfill"
import "./styles.css"
import { registerHtml, start } from "tram-one"

import ColorHeader from "./components/ColorHeader"
import NameInput from "./components/NameInput"
import PokeImage from "./components/PokeImage"
import PokemonTypes from "./components/PokemonTypes"
import TypeDefenses from "./components/TypeDefenses"
import MoveSet from "./components/MoveSet"
import MoveTypeAdvantage from "./components/MoveTypeAdvantage"
import PokemonVarietySelect from "./components/PokemonVarietySelect"

const html = registerHtml({
  ColorHeader,
  NameInput,
  PokeImage,
  PokemonTypes,
  MoveSet,
  TypeDefenses,
  MoveTypeAdvantage,
  PokemonVarietySelect
})

const home = () => {
  return html`
    <div>
      <ColorHeader />
      <PokeImage />
      <NameInput />
      <PokemonTypes />
      <PokemonVarietySelect />
      <TypeDefenses />
      <MoveSet />
      <MoveTypeAdvantage />
    </div>
  `
}

start("#app", home)
