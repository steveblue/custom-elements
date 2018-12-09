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