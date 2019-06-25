import "./TypeBadge.scss"
import { registerHtml } from "tram-one"

const html = registerHtml()

export default (props) => {
  const displayName = props.short ? props.type.slice(0,3) : props.type;
  if (props.vertical) {
    return html`
    <div classname="vertical-container">
      <div classname=${`TypeBadgeTop type-${props.type}`}> ${displayName} </div>
      <div classname=${`TypeBadgeBottom level-${props.effectiveness}`}></div>
    </div>
    `
  }
  if (props.effectiveness) {
    return html`
    <div classname="horizontal-container">
      <div classname=${`TypeBadgeLeft type-${props.type}`}> ${displayName} </div>
      <div classname=${`TypeBadgeRight level-${props.effectiveness}`}></div>
    </div>
    `
  }
  return html`
    <span classname=${`TypeBadge type-${props.type}`}>${displayName}</span>
  `
}
