import { css, html, ButtonComponent, Component, Emitter, Listen, querySelector, querySelectorAll, BoundNode, BoundModel } from '../../../index';

@Component({
  selector: 'my-button',
  template: html`
		{{model}} {{another}}
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

  public model = 'Click';

  constructor() {
    super();
      this.model = this.another = Math.floor(Math.random() * Math.floor(1200));
      this.setState('model');
      this.setState('another');
    setInterval(() => {
      this.model = this.another = Math.floor(Math.random() * Math.floor(1200));
      this.setState('model');
      this.setState('another');
    },10);
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
