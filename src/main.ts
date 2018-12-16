import { MyButtonComponent } from './lib/components/button/button.component';
import { MyInputComponent } from './lib/components/input/input.component';
import { MyElementComponent } from './lib/components/element/element.component';

customElements.define('my-element', MyElementComponent)
customElements.define('my-input', MyInputComponent, { extends: 'input'});
customElements.define('my-button', MyButtonComponent, { extends: 'button'});
