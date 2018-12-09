# custom-elements

A playground for building Web Components with TypeScript Decorators.

With functions available in `src/decorators/component.ts` you can use the following syntax to create a Custom Element. The below example is a button.

```
import { Component, CustomElementMeta } from "../../../decorators/component";

@CustomElementMeta({
    selector: 'fx-button',
    template: `
         <b>Click me</b>
    `,
    style: `
     :host {
            background: red;
            cursor: pointer;
      }
    `
})
class ButtonComponent extends Component {

    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('click', this.handleClick);
    }

    handleClick(event) {
        console.log(event);
    }
}

export { ButtonComponent };
```

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
