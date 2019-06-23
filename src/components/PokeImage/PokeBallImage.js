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

  console.log(pokeBall && pokeBall.sprites.default)
  
  if (!pokeBall) {
    return null
  }

  return html`
    <img classname="PokeImage" src=${pokeBall.sprites.default} />
  `
}
