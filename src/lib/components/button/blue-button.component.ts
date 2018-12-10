import { ButtonComponent, ComponentMeta, html, css} from "../../../decorators/component";

@ComponentMeta({
    selector: 'blue-button',
    template: html`
         <i>Click me too!</i>
    `,
    style: css`
     :host {
            background: blue;
            cursor: pointer;
            padding: 10px;
            border-radius: 30px;
            color: orange;
      }
    `
})
class BlueButtonComponent extends ButtonComponent {
    constructor() {
        super();
    }

    onClick(event) {
      console.log(this, event);
    }
}


export { BlueButtonComponent };