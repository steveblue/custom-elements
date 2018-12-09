export interface ElementMeta {
    selector: string;
    style?: string;
    template?: string;
}

export class Component extends HTMLElement {
    template: string;
    constructor() {
        super();
        this.attachShadowDOM();
        return this;
    }
    attachShadowDOM() {
        const shadowRoot : ShadowRoot = this.attachShadow({mode: 'open'});
        const t = document.createElement('template');
        t.innerHTML = this.template;
        shadowRoot.appendChild(t.content.cloneNode(true));
    };
}

export function CustomElementMeta(attributes: ElementMeta) {
    const compileTemplate = function(template: string, target: Function) {
        target.prototype.template = document.createElement('template');
        target.prototype.template = `
                <style>
                ${attributes.style}
                </style> 
                ${attributes.template} 
                `;
        target.prototype.attachShadow = HTMLElement.prototype.attachShadow;
    };
    const compile = function(key: string, model: string, target: Function) {
        switch(key) {
            case 'selector':
                target.prototype.selector = model;
                break;
            case 'template':
                compileTemplate(model, target);
                break;
        }
    };
    return (target: any) => {
        const customElement = function(...args: any[]){};
        if (attributes !== undefined && attributes !== null) {
            Object.keys(attributes).forEach(key => {
                compile(key, attributes[key], target);
            });
        }
        customElement.prototype = target.prototype;
        return target;
    };
}