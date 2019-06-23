import "babel-polyfill";
import { registerHtml, useGlobalState, start } from "tram-one"

import ColorHeader from "./components/ColorHeader"
import NameInput from "./components/NameInput"
import PokeImage from "./components/PokeImage"
import "./styles.css"

const html = registerHtml({
  ColorHeader,
  NameInput,
  PokeImage
})

const home = () => {
  return html`
    <div>
      <ColorHeader />
      <PokeImage />
      <NameInput />
    </div>
  `
}

start("#app", home)
