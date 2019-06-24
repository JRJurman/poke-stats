import "babel-polyfill"
import "./styles.css"
import { registerHtml, start } from "tram-one"

import ColorHeader from "./components/ColorHeader"
import NameInput from "./components/NameInput"
import PokeImage from "./components/PokeImage"
import PokemonTypes from "./components/PokemonTypes"
import { attackEffectiveness, defenseEffectiveness } from "./pokemon-logic/effectiveness";

const html = registerHtml({
  ColorHeader,
  NameInput,
  PokeImage,
  PokemonTypes
})

const home = () => {
  return html`
    <div>
      <ColorHeader />
      <PokeImage />
      <NameInput />
      <PokemonTypes />
    </div>
  `
}

console.log({attackEffectiveness})
console.log({defenseEffectiveness})

start("#app", home)
