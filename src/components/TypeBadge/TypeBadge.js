import "./TypeBadge.scss"
import { registerHtml } from "tram-one"

const html = registerHtml()

export default (props) => {
  const displayName = props.short ? props.type.slice(0,3) : props.type;
  if (props.vertical) {
    return html`
    <div class="TypeBadge vertical-container">
      <div class=${`TypeBadgeTop type-${props.type}`}> ${displayName} </div>
      <div class=${`TypeBadgeBottom level-${props.effectiveness}`}></div>
    </div>
    `
  }
  if (props.effectiveness) {
    return html`
    <div class="TypeBadge horizontal-container">
      <div class=${`TypeBadgeLeft type-${props.type}`}> ${displayName} </div>
      <div class=${`TypeBadgeRight level-${props.effectiveness}`}></div>
    </div>
    `
  }
  return html`
    <span class=${`TypeBadge type-${props.type}`}>${displayName}</span>
  `
}
