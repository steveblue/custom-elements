import { attachDOM, attachStyle, attachShadow, ButtonComponent } from './../decorators/component';

class Component extends HTMLElement {
    constructor() {
        super();
        attachShadow(this);
    }
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


// TODO: figure out how many other types should be extended


export { Component, ButtonComponent };