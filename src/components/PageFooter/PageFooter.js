import { registerHtml } from 'tram-one'
import './PageFooter.scss'

const html = registerHtml()

export default () => {
  return html`
    <footer class="PageFooter">
      <a href="https://github.com/JRJurman/team-dex">Team-Dex</a> created by Ethan & Jesse Jurman using <a href="https://tram-one.io">Tram-One</a> and the <a href="https://pokeapi.co/">PokéAPI</a>
    </footer>
  `
}
