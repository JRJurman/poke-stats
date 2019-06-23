import "babel-polyfill";
import { registerHtml, useState, useEffect, start } from "tram-one"
import Pokedex from 'pokedex-promise-v2'
const PokeAPI = new Pokedex();

import ColorHeader from "./components/ColorHeader"
import "./styles.css"

const html = registerHtml({
  ColorHeader
})

const usePokemon = () => {
  const [pokemonName, setPokemonName] = useState('')
  const [pokemon, setPokemon] = useState(null)

  const onUpdatePokemonName = (event) => setPokemonName(event.target.value)

  useEffect(async () => {
    // const fetchedPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const fetchedPokemon = await PokeAPI.getPokemonByName(pokemonName)
    setPokemon(fetchedPokemon)
  }, [pokemonName])

  return { pokemon, pokemonName, onUpdatePokemonName }
}

const home = () => {
  const {pokemon, pokemonName, onUpdatePokemonName} = usePokemon()

  console.log(pokemon)

  return html`
    <div>
      <ColorHeader />
      <input value=${pokemonName} onchange=${onUpdatePokemonName} />
      <img src=${pokemon && pokemon.sprites.front_default} />
      Thank you for using Tram-One!
    </div>
  `
}

start("#app", home)
