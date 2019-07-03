import { useState, useEffect } from "tram-one"
import Pokedex from 'pokedex-promise-v2'
import PokemonSpeciesList from "../../components/PokemonSpeciesList"

const PokeAPI = new Pokedex()

export default () => {
  useEffect(async () => {
    const pokemonSpecies = await PokeAPI.getPokemonSpeciesList()
    const pokemonSpeciesList = PokemonSpeciesList({ species:pokemonSpecies.results })

    document.body.appendChild(pokemonSpeciesList)
  })
}
