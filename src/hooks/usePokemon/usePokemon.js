import { useState, useGlobalState, useEffect } from "tram-one"
import Pokedex from 'pokedex-promise-v2'
const PokeAPI = new Pokedex()

export default () => {
  const [pokemonName, setPokemonName] = useState('')
  const [pokemon, setPokemon] = useGlobalState('pokemon', null)

  const onUpdatePokemonName = (event) => setPokemonName(event.target.value)

  useEffect(async () => {
    const fetchedPokemon = await PokeAPI.getPokemonByName(pokemonName.toLowerCase())
    setPokemon(fetchedPokemon)
  }, [pokemonName])

  return { pokemon, pokemonName, onUpdatePokemonName }
}
