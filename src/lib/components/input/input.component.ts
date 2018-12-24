import { Component, html, css } from '../../../decorators/component';
import { InputComponent } from './../../../component/component';

@Component({
	selector: 'my-input',
	style: css`
		:host {
			background: rgba(24, 24, 24, 1);
			border: 0px none;
			color: white;
		}
	`,
})
class MyInputComponent extends InputComponent {
	constructor() {
		super();
	}
	connectedCallback() {
		this.addEventListener('blur', this.onBlur);
		this.addEventListener('focus', this.onFocus);
	}
	onFocus(event) {
		console.log(this, event);
		this.value = 'input';
	}
	onBlur(event) {
		console.log(this, event);
	}
}

export { MyInputComponent };
