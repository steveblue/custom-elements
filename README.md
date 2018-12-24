# custom-elements

A playground for building Web Components with TypeScript Decorators.

### Problem

When developing Web Components with Custom Elements API there is a lot of boilerplate that is repeated in all class declarations.


### Solution

Provide a Functional approach to encapsulate some of this logic into reusable Function, specifically a special kinda of higher order Function called a Decorator. Decorators are available in TypeScript. Decorators are used my libraries like Angular and Stencil. This approach can be applied to Custom Elements v1, giving the engineer a consistent interface for generating UI components.

These methods below define the `Component` decorator which uses the `compileTemplate` Function to compile a HTML template. `attachShadow` provides a Function for calling `attachShadow` to the new Element to give it Shadow DOM.

```
function compileTemplate(elementMeta: ElementMeta, target: Function) {
    target.prototype.elementMeta = elementMeta;
    target.prototype.template = document.createElement('template');
    target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
};

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

function attachShadow(instance: any, options: any) {
    const shadowRoot : ShadowRoot = instance.attachShadow(options || {});
    const t = document.createElement('template');
    t.innerHTML = instance.template;
    shadowRoot.appendChild(t.content.cloneNode(true));
}

```


### Examples


With functions available in `src/decorators/component.ts` you can use the following syntax to create a Custom Element. In this example MyListComponent extends from HTMLElement making it an autonomous Custom Element. This means we can compile ShadowDOM inside the new Element by calling attachShadow and take advantage of slots so the user can define a custom template.

In our template we can create a custom list element that has a user selectable list item. Let's call it `my-list`. It also has a child `my-item` that is not shown in this example, but is another Component in the test library.

```html
<my-list>
	<ul slot="menu">
		<li>
			<my-item><span slot="msg">Make</span></my-item>
		</li>
		<li>
			<my-item><span slot="msg">Custom</span></my-item>
		</li>
		<li>
			<my-item><span slot="msg">Elements</span></my-item>
		</li>
		<li>
			<my-item><span slot="msg">Accessible</span></my-item>
		</li>
	</ul>
</my-list>
```

To define the class attached to MyListComponent we can implement it like so with the Decorator in this repo:

```js
import { Component, html, css, attachShadow, getSiblings, getElementIndex } from 'src/decorators/component';

export class CustomElement extends HTMLElement {
	constructor() {
		super();
		attachShadow(this, { mode: 'open' });
	}
}

@Component({
	selector: 'my-list',
	template: html`
		<slot name="menu"></slot>
	`,
	style: css`
		:host {
			display: block;
			background: rgba(24, 24, 24, 1);
			width: 200px;
			height: 200px;
			color: white;
			padding: 1em;
			border-radius: 8px;
		}
	`,
})
class MyListComponent extends CustomElement {
	constructor() {
		super();
		this.currentIndex = 0;
	}

	deactivateElement(elem: HTMLElement) {
		elem.setAttribute('tabindex', '-1');
		elem.querySelector('my-item').setAttribute('state', '');
	}

	activateElement(elem: HTMLElement) {
		elem.setAttribute('tabindex', '0');
		elem.querySelector('my-item').setAttribute('state', '--selected');
	}

	connectedCallback() {
		this.setAttribute('tabindex', '0');
		this.addEventListener('keydown', (ev: KeyboardEvent) => {
			let currentElement = this.querySelector('[tabindex]:not([tabindex="-1"])');
			let siblings = getSiblings(currentElement);
			this.currentIndex = getElementIndex(currentElement);
			if (ev.keyCode === 13) {
				this.onSubmit(ev);
			}
			if (ev.keyCode === 38) {
				// up
				if (this.currentIndex === 0) {
					this.currentIndex = siblings.length - 1;
				} else {
					this.currentIndex -= 1;
				}
				siblings.forEach((elem: HTMLElement) => {
					if (getElementIndex(elem) === this.currentIndex) {
						this.activateElement(elem);
					} else {
						this.deactivateElement(elem);
					}
				});
			}
			if (ev.keyCode === 40) {
				// down
				if (this.currentIndex === siblings.length - 1) {
					this.currentIndex = 0;
				} else {
					this.currentIndex += 1;
				}
				siblings.forEach((elem: HTMLElement) => {
					if (getElementIndex(elem) === this.currentIndex) {
						this.activateElement(elem);
					} else {
						this.deactivateElement(elem);
					}
				});
			}
		});
		this.addEventListener('focus', (ev: FocusEvent) => {
			for (let li of this.children[0].children) {
				if (li === this.children[0].children[this.currentIndex]) {
					this.activateElement(li);
				} else {
					this.deactivateElement(li);
				}
				li.addEventListener('click', (ev: MouseEvent) => {
					getSiblings(li).forEach((elem: HTMLElement) => {
						this.deactivateElement(elem);
					});
					this.activateElement(li);
					this.onSubmit(ev);
				});
			}
		});
	}
	onSubmit(event) {
		console.log(this, event);
	}
}

customElements.define('my-list', MyListComponent);
```

The below example is a button that extends HTMLButtonElement. Since this is a customized built-in elements, MyButtonComponent extends from the native HTMLButtonElement, we cannot attach Shadow DOM. attachDOM compiles the template as the my-button innerHTML and places a style tag in the `<head>` to style the Element.

```js
import { Component, html, css, attachDOM, attachStyle } from 'src/decorators/component';

class ButtonComponent extends HTMLButtonElement {
	constructor() {
		super();
		attachDOM(this);
		attachStyle(this);
	}
}

@Component({
	selector: 'my-button',
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
class MyButtonComponent extends ButtonComponent {
	constructor() {
		super();
	}
	onConnectedCallback() {
		this.addEventListener('click', this.onClick);
	}
	onClick(ev) {
		console.log('click!');
	}
}

customElements.define('my-button', MyButtonComponent, { extends: 'button' });
```

In a template somewhere...

```html
<button is="my-button"></button>
```

Wa la! A Custom Element that retains all the behaviors of a button, yet extends button to do other things. In this nieve implementation all that is changed is the style of the button. Creating a customized built in element like this will retain all the behaviors of the element that is extended.

## Getting Started

```
npm install
```

## Development

The dev build implements a watcher to compile and bundle the app on file change.

```
npm start
```

Run the express server in a separate tab.

```
node backend/server.js
```

or use a tool like live-server.

```
cd dist
live-server
```

## Production

The prod build minifies the test package and provides an entry point for using the Components defined in the library.

```
NODE_ENV=prod node index.js
```
