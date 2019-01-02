import { XComponent, XListen, XInputComponent, css } from '../../../index';

@XComponent({
	selector: 'my-input',
	style: css`
		:host {
			background: rgba(24, 24, 24, 1);
			border: 0px none;
			color: white;
		}
	`,
})
class MyInputComponent extends XInputComponent {
	constructor() {
		super();
	}
	@XListen('focus')
	onFocus(event) {
		console.log(this, event);
		this.value = 'input';
	}
	@XListen('blur')
	onBlur(event) {
		console.log(this, event);
	}
}

customElements.define('my-input', MyInputComponent, { extends: 'input'});

export { MyInputComponent };
