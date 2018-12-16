import { Component, html, css } from "../../../decorators/component";
import { CustomElement } from './../../../component/component';

@Component({
		selector: 'my-element',
    template: html`
        <p>You</p>
        <p>Can</p>
        <p>Make</p>
        <slot name="make" >Anything</slot>
    `,
		style: css`
		 :host {
        display: block;
				background: rgba(24,24,24,1.0);
        width: 200px;
        height: 200px;
        color: white;
        padding: 1em;
        border-radius: 8px;
		  }
		`
})
class MyElementComponent extends CustomElement {
	constructor() {
		super();
	}
}


export { MyElementComponent }