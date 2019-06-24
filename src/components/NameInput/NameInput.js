import "./NameInput.scss"
import { registerHtml } from "tram-one"
import usePokemon from '../../hooks/usePokemon'

const html = registerHtml()

export default () => {
  const {pokemonName, onUpdatePokemonName} = usePokemon()

  return html`
    <input classname="NameInput" value=${pokemonName} onchange=${onUpdatePokemonName} placeholder="Pokemon Name" />
  `
}
