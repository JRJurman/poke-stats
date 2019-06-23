import "./TypeBadge.scss"
import { registerHtml } from "tram-one"

const html = registerHtml()

export default (props) => {
  const displayName = props.short ? props.type.slice(0,3) : props.type;
  return html`
    <span classname=${`TypeBadge type-${props.type}`}>${displayName}</span>
  `
}
