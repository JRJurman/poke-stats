import './MoveSet.scss'
import { registerHtml } from "tram-one"
import MoveDropdown from '../MoveDropdown'
import usePokemon from '../../hooks/usePokemon'

const html = registerHtml({
  MoveDropdown
})

export default ({index}) => {
  const { pokemon } = usePokemon()
  if (!pokemon) {
    return ''
  }

  return html`
    <div className="MoveSet">
      Move Set
      <hr />
      <div>
        <MoveDropdown index="0" />
        <MoveDropdown index="1" />
        <MoveDropdown index="2" />
        <MoveDropdown index="3" />
      </div>
    </div>
  `
}
