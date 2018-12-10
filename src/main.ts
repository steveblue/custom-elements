import { ComponentMeta, html, css } from './decorators/component';
import { AButtonComponent } from './lib/components/button/button.component';
import { FxButtonComponent } from './lib/components/button/fx-button.component';


customElements.define('a-button', AButtonComponent, { extends: 'button'});
customElements.define('fx-button', FxButtonComponent, { extends: 'button'});
