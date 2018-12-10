import { ComponentMeta, html, css, attachDOM, attachStyle} from "../../../decorators/component";
import { AButtonComponent } from './button.component';


@ComponentMeta({
    selector: 'fx-button',
    template: html`
         <i>Click me too!</i>
    `,
    style: css`
     :host {
            background: blue;
            cursor: pointer;
            padding: 10px;
      }
    `
})
class FxButtonComponent extends AButtonComponent {
    constructor() {
        super();
    }

    handleClick(event) {
      console.log('foo');
      this.click();
    }
}


export { FxButtonComponent };