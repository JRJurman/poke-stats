import "./NameInput.scss"
import { registerHtml } from "tram-one"

const html = registerHtml()

export default ({value, onUpdate}) => {
  return html`
    <div>
      <input 
        class="NameInput" 
        list="pokemon-options" 
        value=${value} 
        onchange=${onUpdate} 
        placeholder="Pokemon Name" 
      />
    </div>
  `
}
