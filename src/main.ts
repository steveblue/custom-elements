import { RedButtonComponent } from './lib/components/button/red-button.component';
import { BlueButtonComponent } from './lib/components/button/blue-button.component';

customElements.define('red-button', RedButtonComponent, { extends: 'button'});
customElements.define('blue-button', BlueButtonComponent, { extends: 'button'});
