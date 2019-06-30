import { registerHtml } from "tram-one"
import "./TitleHeader.scss"
const html = registerHtml()

export default () => {
  return html`
    <h1 class="TitleHeader">
      Team-Dex
    </h1>
  `
}
