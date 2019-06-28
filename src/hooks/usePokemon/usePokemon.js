import { useGlobalState, useEffect } from "tram-one"
import Pokedex from 'pokedex-promise-v2'
const PokeAPI = new Pokedex()

const usePokemonName = () => {
  const { clearMoves } = usePokemonMove()
  const [pokemonName, setPokemonName] = useGlobalState('pokemon-name', '')
  const onUpdatePokemonName = (event) => {
    setPokemonName(event.target.value)
    clearMoves()
  }

  return {
    pokemonName, onUpdatePokemonName
  }
}

const usePokemonMap = () => {
  const [pokemonMap, setPokemonMap] = useGlobalState('pokemon-map', {})
  const { pokemonName } = usePokemonName()
  useEffect(async () => {
    if (pokemonMap[pokemonName]) {
      return pokemonMap[pokemonName]
    }
    setPokemonMap({ ...pokemonMap, [pokemonName]: "LOADING"})
    const pokemonObject = await PokeAPI.getPokemonByName(pokemonName.toLowerCase())
    setPokemonMap({ ...pokemonMap, [pokemonName]: pokemonObject})
  }, [pokemonName])
  return { pokemonMap }
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

  const clearMoves = () => {
    setMoveDetails({})
  }

  return { pokemonMoveset, onUpdatePokemonMove, pokemonMoves, clearMoves }
}

export default () => {
  const { pokemonName, onUpdatePokemonName } = usePokemonName()
  const { pokemonMoveset, onUpdatePokemonMove, pokemonMoves } = usePokemonMove()
  const { pokemonMap } = usePokemonMap()

  const pokemon = pokemonMap[pokemonName] === "LOADING" ? null : pokemonMap[pokemonName]

  return { pokemon, pokemonName, onUpdatePokemonName, pokemonMoveset, onUpdatePokemonMove, pokemonMoves }
}
