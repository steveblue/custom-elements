export class ButtonComponent extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
        <style>
        :host { 
            background: red;
        }
        </style> 
        <b>Click me</b>   
        `;
        const shadowRoot : ShadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.addEventListener('click', this.handleClick);
    }

    handleClick(event) {
        console.log(event);
    }
}