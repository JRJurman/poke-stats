import { registerHtml } from "tram-one"
import "./TitleHeader.scss"
const html = registerHtml()

export default () => {
  return html`
    <div class="TitleHeader">
      <div class="TitleBar" />
      <div class="TitleCircle" />
    </div>
  `
}
