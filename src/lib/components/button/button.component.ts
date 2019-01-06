import { css, html, ButtonComponent, Component, Emitter, Listen, querySelector, querySelectorAll } from '../../../index';

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
  @Emitter('bang', { bubbles: true, composed: true })
  @Listen('click')
  public onClick(event) {
			this.emitter.broadcast('bang');
  }
  @Listen('keyup')
  public onKeyUp(event) {
    if (event.key === 'Enter') {
      this.emitter.broadcast('bang');
    }
  }
}

customElements.define('my-button', MyButtonComponent, { extends: 'button'});

export { MyButtonComponent };
