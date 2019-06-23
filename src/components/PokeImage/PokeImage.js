import "./PokeImage.scss"
import { registerHtml, useGlobalState } from "tram-one"
import PokeBallImage from "./PokeBallImage"

const html = registerHtml({
  PokeBallImage
})

export default () => {
  const [pokemon] = useGlobalState('pokemon', null)

  if (!pokemon) {
    html`<PokeBallImage />`
  }
  
  return html`
    <img classname="PokeImage" src=${pokemon && pokemon.sprites.front_default} />
  `
}
