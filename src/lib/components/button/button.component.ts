import { ButtonComponent, ComponentMeta, html, css, attachDOM, attachStyle } from "../../../decorators/component";

@ComponentMeta({
	selector: 'a-button',
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
class AButtonComponent extends ButtonComponent {
	constructor() {
		super();
		attachDOM(this);
		attachStyle(this);
	}

	connectedCallback() {
		this.addEventListener('click', this.handleClick);
	}

	handleClick(event) {
		console.log(this);
	}
}

export { AButtonComponent };