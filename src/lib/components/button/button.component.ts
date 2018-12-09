import { Component, ComponentMeta, ElementMeta, html, css } from "../../../decorators/component";

@ComponentMeta({
	selector: 'fx-button',
	template: html`
         <a href="http://google.com" target="_blank">Click me!</a>
    `,
	style: css`
     :host {
            background: red;
            cursor: pointer;
            padding: 10px;
      }
    `,
})
class ButtonComponent extends Component {
	constructor() {
		super();
	}

	connectedCallback() {
		this.addEventListener('click', this.handleClick);
	}

	handleClick(event) {
		console.log(this);
	}
}

export { ButtonComponent };