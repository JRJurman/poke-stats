import { useGlobalState, useEffect } from "tram-one"
import Pokedex from 'pokedex-promise-v2'
const PokeAPI = new Pokedex()

const usePokemonName = () => {
  const [pokemonName, setPokemonName] = useGlobalState('pokemon-name', '')
  const onUpdatePokemonName = (event) => setPokemonName(event.target.value)

  return {
    0: pokemonName, 1: onUpdatePokemonName,
    pokemonName, onUpdatePokemonName
  }
}

const usePokemonMove = () => {
  const [pokemonMoveset, setPokemonMove] = useGlobalState('pokemon-moveset', [])
  const [pokemonMoves, setMoveDetails] = useGlobalState('pokemon-moves', {})
  const onUpdatePokemonMove = (index) => async (event) => {
    const moveName = event.target.value;
    setPokemonMove({
      ...pokemonMoveset, [index]: moveName
    })

    if (!pokemonMoves[moveName]) {
      const fetchedMove = await PokeAPI.getMoveByName(moveName)
      setMoveDetails({[moveName]: fetchedMove, ...pokemonMoves})
    }
  }

  return { pokemonMoveset, onUpdatePokemonMove, pokemonMoves }
}

export default () => {
  const { pokemonName, onUpdatePokemonName } = usePokemonName()
  const { pokemonMoveset, onUpdatePokemonMove, pokemonMoves } = usePokemonMove()
  const [pokemon, setPokemon] = useGlobalState('pokemon', null)

  useEffect(async () => {
    const fetchedPokemon = await PokeAPI.getPokemonByName(pokemonName.toLowerCase())
    setPokemon(fetchedPokemon)
  }, [pokemonName])

  return { pokemon, pokemonName, onUpdatePokemonName, pokemonMoveset, onUpdatePokemonMove, pokemonMoves }
}
