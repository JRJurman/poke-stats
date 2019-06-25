import "babel-polyfill"
import "./styles.css"
import { registerHtml, start } from "tram-one"

import ColorHeader from "./components/ColorHeader"
import NameInput from "./components/NameInput"
import PokeImage from "./components/PokeImage"
import PokemonTypes from "./components/PokemonTypes"
import MoveDropdown from "./components/MoveDropdown";

const html = registerHtml({
  ColorHeader,
  NameInput,
  PokeImage,
  PokemonTypes,
  MoveDropdown
})

const home = () => {
  return html`
    <div>
      <ColorHeader />
      <PokeImage />
      <NameInput />
      <PokemonTypes />
      <MoveDropdown index=${0} />
      <MoveDropdown index=${1} />
      <MoveDropdown index=${2} />
      <MoveDropdown index=${3} />
    </div>
  `
}

start("#app", home)
