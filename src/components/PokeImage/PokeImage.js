import "./PokeImage.scss"
import { registerHtml, useGlobalState } from "tram-one"


const html = registerHtml()

export default () => {
  const [pokemon] = useGlobalState('pokemon', null)
  console.log({pokemon})

  return html`
    <img classname="PokeImage" src=${pokemon && pokemon.sprites.front_default} />
  `
}


