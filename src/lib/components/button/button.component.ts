import { css, html, ButtonComponent, Component, Emitter, Listen } from '../../../index';

@Component({
  selector: 'my-button',
  template: html`
		{{model}} {{another.prop.on.state}}
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

    this.state.model = Math.floor(Math.random() * Math.floor(1200));
    this.state.another = {
      prop: {
        on: {
          state: Math.floor(Math.random() * Math.floor(1200))
        }
      }
    };

    setInterval(() => {
      this.state.model = Math.floor(Math.random() * Math.floor(1200));
      this.state.another.prop.on.state = Math.floor(Math.random() * Math.floor(1200));
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
