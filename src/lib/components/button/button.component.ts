export class ButtonComponent extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('click', this.handleClick);
    }

    connectedCallback() {
        this.innerHTML = "<b>Click me</b>";
    }

    handleClick(event) {
        console.log(event);
    }
}