import "./PokeImage.scss"
import { registerHtml, useEffect, useGlobalState } from "tram-one"
import Pokedex from 'pokedex-promise-v2'
const PokeAPI = new Pokedex()

const html = registerHtml()

export default () => {
  const [pokeBall, setPokeBall] = useGlobalState('pokeBall', null)

  useEffect(async () => {
    const fetchedPokeBall = await PokeAPI.getItemByName('poke-ball')
    setPokeBall(fetchedPokeBall)
  })
  
  if (!pokeBall) {
    return html`<div className="emptyImage" />`
  }

  return html`
    <img classname="PokeBallImage" src=${pokeBall.sprites.default} />
  `
}
