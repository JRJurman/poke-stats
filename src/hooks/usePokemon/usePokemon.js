import { useState, useEffect } from "tram-one"
import Pokedex from 'pokedex-promise-v2'
const PokeAPI = new Pokedex()

const usePokemonName = ({clearMoves}) => {
  const [pokemonName, setPokemonName] = useState('')
  const onUpdatePokemonName = (event) => {
    setPokemonName(event.target.value)
    clearMoves()
  }

  return {
    pokemonName, onUpdatePokemonName
  }
}

const usePokemonMap = ({pokemonName}) => {
  const [pokemonMap, setPokemonMap] = useState({})
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
  const [pokemonMoveset, setPokemonMove] = useState([])
  const [pokemonMoves, setMoveDetails] = useState({})
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
  const { pokemonMoveset, onUpdatePokemonMove, pokemonMoves, clearMoves } = usePokemonMove()
  const { pokemonName, onUpdatePokemonName } = usePokemonName({clearMoves})
  const { pokemonMap } = usePokemonMap({pokemonName})

  const pokemon = pokemonMap[pokemonName] === "LOADING" ? null : pokemonMap[pokemonName]

  return { pokemon, pokemonName, onUpdatePokemonName, pokemonMoveset, onUpdatePokemonMove, pokemonMoves }
}
