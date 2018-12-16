# custom-elements

A playground for building Web Components with TypeScript Decorators.

With functions available in `src/decorators/component.ts` you can use the following syntax to create a Custom Element. The below example is a button.

```js
function Component(attributes: ElementMeta) {
    return (target: any) => {
        const customElement = function(...args: any[]){};
        if (attributes !== undefined && attributes !== null) {
            compileTemplate(attributes, target);
        }
        customElement.prototype = target.prototype;
        return target;
    };
}

class ButtonComponent extends HTMLButtonElement {
    constructor() {
        super();
        attachDOM(this);
		attachStyle(this);
    }
    connectedCallback() {
        this.addEventListener('click', this.onClick);
    }
}

@Component({
	selector: 'red-button',
	template: html`
            <b>Click me!</b>
    `,
	style: css`
        :host {
            background: red;
            cursor: pointer;
            padding: 10px;
            border-radius: 30px;
            border: 0 none;
            color: white;
            text-decoration: none;
        }
    `,
	})
class RedButtonComponent extends ButtonComponent {
	constructor() {
		super();
	}
        onClick() {
            console.log('click!');
        }
}

customElements.define('red-button', RedButtonComponent, { extends: 'button'});

```

In a template somewhere...

```html
<button is="red-button"></button>
```

Wa la!

## Getting Started

```
npm install
```

## Development

```
npm start
```

## Production

```
node index.js --prod
```
