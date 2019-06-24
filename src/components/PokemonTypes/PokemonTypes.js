import { registerHtml, useGlobalState } from "tram-one"
import TypeBadge from "../TypeBadge";
import usePokemon from "../../hooks/usePokemon";

const html = registerHtml({
  TypeBadge
})

export default () => {
  const { pokemon } = usePokemon()

  const types = pokemon && pokemon.types.map(({type: {name}}) => html`<TypeBadge type=${name}/>`)

  return html`
    <div style="margin-top: 10px">
      ${types}
    </div>
  `
}
