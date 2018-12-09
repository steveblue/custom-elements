import { ComponentMeta, html, css } from './decorators/component';
import { ButtonComponent } from './lib/components/button/button.component';

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
class FxButtonComponent extends ButtonComponent {
    constructor() {
        super();
    }
}
window.customElements.define('a-button', ButtonComponent);
window.customElements.define('fx-button', FxButtonComponent);

