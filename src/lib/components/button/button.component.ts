import { css, html, XButtonComponent, XComponent, XEmitter, XListen, xquerySelector, xquerySelectorAll } from '../../../index';

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
  public onClick(event) {
			this.emitter.broadcast('bang');
  }
  @XListen('keyup')
  public onKeyUp(event) {
    if (event.key === 'Enter') {
      this.emitter.broadcast('bang');
    }
  }
}

customElements.define('my-button', MyButtonComponent, { extends: 'button'});

export { MyButtonComponent };
