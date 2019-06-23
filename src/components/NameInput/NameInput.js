import "./NameInput.scss"
import { registerHtml, useState, useGlobalState, useEffect } from "tram-one"
import Pokedex from 'pokedex-promise-v2'
const PokeAPI = new Pokedex()

const html = registerHtml()

const usePokemon = () => {
  const [pokemonName, setPokemonName] = useState('')
  const [pokemon, setPokemon] = useGlobalState('pokemon', null)

  const onUpdatePokemonName = (event) => setPokemonName(event.target.value)

  useEffect(async () => {
    const fetchedPokemon = await PokeAPI.getPokemonByName(pokemonName.toLowerCase())
    console.log({fetchedPokemon})
    setPokemon(fetchedPokemon)
  }, [pokemonName])

  return { pokemon, pokemonName, onUpdatePokemonName }
}

export default () => {
  const {pokemonName, onUpdatePokemonName} = usePokemon()

  return html`
    <input classname="NameInput" value=${pokemonName} onchange=${onUpdatePokemonName} placeholder="Pokemon Name" />
  `
}


