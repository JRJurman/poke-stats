import "./TypeBadge.scss"
import { registerHtml } from "tram-one"

const html = registerHtml()

export default (props) => {
  const displayName = props.short ? props.type.slice(0,3) : props.type;
  if (props.effectiveness) {
    return html`
    <span>
      <span classname=${`TypeBadgeLeft type-${props.type}`}> ${displayName} </span>
      <span classname=${`TypeBadgeRight level-${props.effectiveness}`}>${props.effectiveness}</span>
    </span>
    `
  }
  return html`
    <span classname=${`TypeBadge type-${props.type}`}>${displayName}</span>
  `
}
