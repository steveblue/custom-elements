import { Component, Listen, css, InputComponent } from '../../../index';

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
	@Listen('focus')
	onFocus(event) {
		console.log(this, event);
		this.value = 'input';
	}
	@Listen('blur')
	onBlur(event) {
		console.log(this, event);
	}
}

export { MyInputComponent };
