import { ButtonComponent, ComponentMeta, html, css} from "../../../decorators/component";

@ComponentMeta({
		selector: 'red-button',
		template: html`
					<b>Click me!</b>
			`,
		style: css`
			:host {
							background: red;
							cursor: pointer;
							padding: 10px;
							border-radius: 30px;
							border: 0 none;
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