import { MyButtonComponent } from './lib/components/button/button.component';
import { MyInputComponent } from './lib/components/input/input.component';
import { MyListComponent } from './lib/components/list/list.component';
import { MyItemComponent } from './lib/components/item/item.component';

customElements.define('my-item', MyItemComponent);
customElements.define('my-list', MyListComponent);
customElements.define('my-input', MyInputComponent, { extends: 'input'});
customElements.define('my-button', MyButtonComponent, { extends: 'button'});
