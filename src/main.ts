import { ComponentMeta } from './decorators/component';
import { ButtonComponent } from './lib/components/button/button.component';

@ComponentMeta({
    selector: 'fx-button',
    template: `
         <i>Click me</i>
    `,
    style: `
     :host {
            background: blue;
            cursor: pointer;
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

