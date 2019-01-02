import { css, XComponent, XInputComponent, XListen } from '../../../index';

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
  public onFocus(event) {
    this.value = 'input';
  }
}

customElements.define('my-input', MyInputComponent, { extends: 'input'});

export { MyInputComponent };
