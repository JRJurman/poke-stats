import "./NameInput.scss"
import { registerHtml } from "tram-one"

const html = registerHtml()

export default ({ value, onUpdate }) => {
  return html`
    <input classname="NameInput" value=${value} onchange=${onUpdate} placeholder="Pokemon Name" />
  `
}
