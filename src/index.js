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
  return html`
    <div>
      <ColorHeader />
      <PokeImage />
      <NameInput />
      <PokemonTypes />
      <TypeDefenses />
      <MoveSet />
      <MoveTypeAdvantage />
    </div>
  `
}

start("#app", home)
