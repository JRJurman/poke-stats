import "./PokeImage.scss"
import { registerHtml } from "tram-one"
import PokeBallImage from "./PokeBallImage"
import usePokemon from '../../hooks/usePokemon'

const html = registerHtml({
  PokeBallImage
})

export default () => {
  const { pokemon } = usePokemon()

  if (!pokemon) {
    return html`<PokeBallImage />`
  }

  return html`
    <img classname="PokeImage" src=${pokemon && pokemon.sprites.front_default} />
  `
}
