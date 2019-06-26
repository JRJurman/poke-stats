import "./PokeImage.scss"
import { registerHtml } from "tram-one"

const POKEBALLSPRITE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"

const html = registerHtml()

export default () => {
  return html`
    <img classname="PokeBallImage" src=${POKEBALLSPRITE} />
  `
}
