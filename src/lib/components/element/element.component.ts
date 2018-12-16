import { Component, html, css } from "../../../decorators/component";
import { CustomElement } from './../../../component/component';

@Component({
		selector: 'my-element',
    template: html`
        <my-item><span slot="msg">You</span></my-item>
        <my-item><span slot="msg">Can</span></my-item>
        <my-item><span slot="msg">Make</span></my-item>
        <my-item><span slot="msg">Anything</span></my-item>
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
  connectedCallback() {
    this.paragraphs = this.children;
    for (let paragraph of this.paragraphs) {
      paragraph.addEventListener('click', (ev: MouseEvent) => {
          console.log(ev);
      });
    }
  }
}


export { MyElementComponent }