import { Component, Emitter, Listen, html, css, querySelectorAll, ButtonComponent } from '../../../index';

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
	@Emitter('bang')
	@Listen('click')
	onClick(event) {
		const bang = this.emitter.get('bang');
		querySelectorAll('my-item').forEach((elem: Element) => {
			elem.emitter.emit(bang);
		});
	}
}

customElements.define('my-button', MyButtonComponent, { extends: 'button'});

export { MyButtonComponent };
