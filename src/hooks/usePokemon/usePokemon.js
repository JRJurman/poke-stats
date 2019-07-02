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

const usePokemonData = ({pokemonVarieties, pokemonVariant}) => {
  const [pokemonData, setPokemonMap] = useState(null)
  useEffect(async () => {
    const isVariantInVarities = pokemonVarieties.some(({pokemon: {name}}) => name === pokemonVariant)
    if (pokemonVariant && isVariantInVarities) {
      const pokemonVariantObject = await PokeAPI.getPokemonByName(pokemonVariant)
      setPokemonMap(pokemonVariantObject)
    } else if (pokemonVarieties.length > 0) {
      const defaultPokemon = pokemonVarieties.find(({is_default}) => is_default);
      const pokemonDefaultObject = await PokeAPI.getPokemonByName(defaultPokemon.pokemon.name)
      setPokemonMap(pokemonDefaultObject)
    }
  }, [ 
    pokemonVariant, 
    pokemonVarieties[0] ? pokemonVarieties[0].pokemon.name : ''
  ])
  return { pokemonData }
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

const usePokemonVarieties = ({pokemonName}) => {
  const [pokemonVarieties, setPokemonVarieties] = useState([])

  useEffect(async () => {
    if (pokemonName) {
      const pokemonSpecies = await PokeAPI.getPokemonSpeciesByName(pokemonName.toLowerCase())
      setPokemonVarieties(pokemonSpecies ? pokemonSpecies.varieties : pokemonVarieties);
    }
  }, [pokemonName])

  return { pokemonVarieties };
}

const usePokemonVariant = ({pokemonVarieties, pokemonName}) => {
  const [pokemonVariant, setPokemonVariant] = useState('')
  const onUpdateVariant = ({target: {value}}) => {
    const pokemonVariantChoice = pokemonVarieties.find(({pokemon: {name}}) => name === value)
    setPokemonVariant(pokemonVariantChoice.pokemon.name)
  }
  
  useEffect(() => {
    if (pokemonName && pokemonVariant) {
      setPokemonVariant('')
    }
  }, [pokemonName])

  return { pokemonVariant, onUpdateVariant }
}

const useDefaultImage = ({pokemonVarieties}) => {
  const [defaultImage, setPokemonImage] = useState('')

  useEffect(async () => {
    if (pokemonVarieties.length > 0) {
      const defaultPokemon = pokemonVarieties.find(({is_default}) => is_default).pokemon
      console.log({defaultPokemon})
      const defaultPokemonObject = await PokeAPI.getPokemonByName(defaultPokemon.name)
      console.log({defaultPokemonObject})
      setPokemonImage(defaultPokemonObject.sprites.front_default)
    }
  }, [pokemonVarieties])

  return { defaultImage }
}

export default () => {
  const { pokemonMoveset, onUpdatePokemonMove, pokemonMoves, clearMoves } = usePokemonMove()
  const { pokemonName, onUpdatePokemonName } = usePokemonName({clearMoves})
  const { pokemonVarieties } = usePokemonVarieties({pokemonName})
  const { pokemonVariant, onUpdateVariant } = usePokemonVariant({pokemonVarieties, pokemonName})
  const { pokemonData } = usePokemonData({pokemonVarieties, pokemonVariant})
  const { defaultImage } = useDefaultImage({pokemonVarieties})

  return { 
    pokemon: pokemonData, 
    pokemonName, onUpdatePokemonName, 
    pokemonMoveset, onUpdatePokemonMove, pokemonMoves, 
    pokemonVariant, pokemonVarieties, onUpdateVariant,
    defaultImage,
  }
}
