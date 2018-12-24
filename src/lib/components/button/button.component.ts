import { Component, html, css } from '../../../decorators/component';
import { ButtonComponent } from './../../../component/component';

@Component({
	selector: 'my-button',
	template: html`
		<span>button</span>
	`,
	style: css`
		:host {
			background: rgba(24, 24, 24, 1);
			cursor: pointer;
			color: white;
			font-weight: 400;
		}
	`,
})
class MyButtonComponent extends ButtonComponent {
	constructor() {
		super();
	}
	connectedCallback() {
		this.addEventListener('click', this.onClick);
	}
	onClick(event) {
		console.log(this, event);
	}
}

export { MyButtonComponent };
