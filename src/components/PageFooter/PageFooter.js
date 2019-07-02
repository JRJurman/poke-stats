import { registerHtml } from 'tram-one'
import './PageFooter.scss'

const html = registerHtml()

export default () => {
  return html`
    <footer class="PageFooter">
      <a href="https://github.com/JRJurman/team-dex">Team-Dex Created By Ethan & Jesse Jurman</a> using <a href="https://tram-one.io">Tram-One</a>
    </footer>
  `
}
