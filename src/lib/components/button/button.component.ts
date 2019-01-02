import { XComponent, XEmitter, XListen, XButtonComponent, html, css, xquerySelectorAll, xquerySelector } from '../../../index';

@XComponent({
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
class MyButtonComponent extends XButtonComponent {

	constructor() {
		super();
	}
	@XEmitter('bang')
	@XListen('click')
	onClick(event) {
		const bang = this.emitter.get('bang');
		console.log(xquerySelectorAll('my-item'));
		xquerySelectorAll('my-item').forEach((elem: Element) => {
			elem.emitter.emit(bang);
		});
	}
	@XListen('keyup')
	onKeyUp(event) {
		if (event.key === "Enter") {
			const bang = this.emitter.get('bang');
			xquerySelectorAll('my-item').forEach((elem: Element) => {
				elem.emitter.emit(bang);
			});
		}
	}
}

customElements.define('my-button', MyButtonComponent, { extends: 'button'});

export { MyButtonComponent };
