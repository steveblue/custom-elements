import { ButtonComponent, ComponentMeta, html, css} from "../../../decorators/component";

@ComponentMeta({
		selector: 'red-button',
		template: html`
					<a href="#">Click me!</a>
			`,
		style: css`
			:host {
							background: red;
							cursor: pointer;
							padding: 10px;
							border-radius: 30px;
							border: 0 none;
				}
				:host a:link, :host a:visited {
							color: white;
							text-decoration: none;
				}
			`,
	})
class RedButtonComponent extends ButtonComponent {
	constructor() {
		super();
	}
	onClick(event) {
		console.log(this, event);
	}
}

export { RedButtonComponent };