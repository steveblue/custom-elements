import { XComponent, XListen, XCustomElement, html, css, xgetSiblings, xgetElementIndex,  } from '../../../index';

@XComponent({
	selector: 'my-list',
	template: html`
		<slot name="menu"></slot>
	`,
	style: css`
		:host {
			display: block;
			background: rgba(24, 24, 24, 1);
			width: 200px;
			height: 200px;
			color: white;
			padding: 1em;
			border-radius: 8px;
		}
	`,
})
class MyListComponent extends XCustomElement {
	constructor() {
		super();
		this.currentIndex = 0;
	}
	deactivateElement(elem: HTMLElement) {
		elem.setAttribute('tabindex', '-1');
		elem.querySelector('my-item').setAttribute('state', '');
	}
	activateElement(elem: HTMLElement) {
		elem.setAttribute('tabindex', '0');
		elem.querySelector('my-item').setAttribute('state', '--selected');
	}
	connectedCallback() {
		this.setAttribute('tabindex', '0');
	}
	@XListen('focus')
	onFocus(ev: FocusEvent) {
			for (let li of this.children[0].children) {
				if (li === this.children[0].children[this.currentIndex]) {
					this.activateElement(li);
				} else {
					this.deactivateElement(li);
				}
				li.addEventListener('click', (ev: MouseEvent) => {
					xgetSiblings(li).forEach((elem: HTMLElement) => {
						this.deactivateElement(elem);
					});
					this.activateElement(li);
					this.onSubmit(ev);
				});
			}
	}
	@XListen('keydown')
	onKeydown(ev: KeyboardEvent) {
			let currentElement = this.querySelector('[tabindex]:not([tabindex="-1"])');
			let siblings = xgetSiblings(currentElement);
			this.currentIndex = xgetElementIndex(currentElement);
			if (ev.keyCode === 13) {
				this.onSubmit(ev);
			}
			if (ev.keyCode === 38) {
				// up
				if (this.currentIndex === 0) {
					this.currentIndex = siblings.length - 1;
				} else {
					this.currentIndex -= 1;
				}
				siblings.forEach((elem: HTMLElement) => {
					if (xgetElementIndex(elem) === this.currentIndex) {
						this.activateElement(elem);
					} else {
						this.deactivateElement(elem);
					}
				});
			}
			if (ev.keyCode === 40) {
				// down
				if (this.currentIndex === siblings.length - 1) {
					this.currentIndex = 0;
				} else {
					this.currentIndex += 1;
				}
				siblings.forEach((elem: HTMLElement) => {
					if (xgetElementIndex(elem) === this.currentIndex) {
						this.activateElement(elem);
					} else {
						this.deactivateElement(elem);
					}
				});
			}
	}
	onSubmit(event) {
		console.log(this, event);
	}
}

customElements.define('my-list', MyListComponent);

export { MyListComponent };
