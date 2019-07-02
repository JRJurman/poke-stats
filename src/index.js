import "babel-polyfill"
import { registerHtml, start } from "tram-one"

import TitleHeader from "./components/TitleHeader"
import Pokemon from "./components/Pokemon";
import PageFooter from './components/PageFooter'
import usePokemon from "./hooks/usePokemon";
import "./styles.scss"

const html = registerHtml({
  TitleHeader,
  Pokemon,
  PageFooter
})

const home = () => {
  const maxNumberOfPokemon = 20

  const pokemonObjects = [...Array(maxNumberOfPokemon)]
    .map(() => usePokemon())
    .filter((pokemonObject, index, pokemonObjects) => {
      const current = pokemonObject
      const currentHasName = current.pokemonName !== ''
      if (currentHasName) return true

      const previous = pokemonObjects[index - 1]
      if (!previous) return true
      const previousHasName = previous.pokemonName !== ''

      if (!currentHasName && !previousHasName) return false

      const next = pokemonObjects[index + 1]
      if (!next) return true
      const nextHasName = next.pokemonName !== ''

      if (!currentHasName && nextHasName) return false

      return true
    })

  const pokemonComponents = pokemonObjects.map(pokemonObject => Pokemon({ pokemon: pokemonObject }))

  return html`
    <div class="Page">
      <TitleHeader />
      <div class="PokemonContainers">
        ${pokemonComponents}
      </div>
      <PageFooter />
    </div>
  `
}

start("#app", home)
