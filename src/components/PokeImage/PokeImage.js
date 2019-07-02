import "./PokeImage.scss"
import { registerHtml } from "tram-one"
import PokeBallImage from "../PokeBallImage"

const html = registerHtml({
  PokeBallImage
})

export default ({pokemon, defaultImage}) => {
  if (!pokemon) {
    return html`<PokeBallImage />`
  }

  return html`
    <img class="PokeImage" src=${(pokemon && pokemon.sprites.front_default) || defaultImage} />
  `
}
