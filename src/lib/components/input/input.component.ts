import { Component, html, css} from "../../../decorators/component";
import { InputComponent } from './../../../component/component';

@Component({
		selector: 'my-input',
		style: css`
		 :host {
				background: green;
        color: white;
			 }
			`,
})
class MyInputComponent extends InputComponent {
	constructor() {
		super();
	}
	onFocus(event) {
		console.log(this, event);
	}
  onBlur(event) {
    	console.log(this, event);
  }
}


export { MyInputComponent }