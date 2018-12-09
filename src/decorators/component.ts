export interface ElementMeta {
    selector: string;
    style?: string;
    template?: string;
}

export const compileTemplate = function(elementMeta: ElementMeta, target: Function) {
    target.prototype.template = document.createElement('template');
    target.prototype.template = `
                <style>
                ${elementMeta.style}
                </style> 
                ${elementMeta.template} 
                `;
    target.prototype.attachShadow = HTMLElement.prototype.attachShadow;
};

export function ComponentMeta(attributes: ElementMeta) {
    return (target: any) => {
        const customElement = function(...args: any[]){};
        if (attributes !== undefined && attributes !== null) {
            compileTemplate(attributes, target);
        }
        customElement.prototype = target.prototype;
        customElement.prototype.elementMeta = attributes;
        return target;
    };
}

export class Component extends HTMLElement {
    template: string;
    constructor() {
        super();
        this.attachShadowDOM();
    }
    attachShadowDOM() {
        const shadowRoot : ShadowRoot = this.attachShadow({mode: 'open'});
        const t = document.createElement('template');
        t.innerHTML = this.template;
        shadowRoot.appendChild(t.content.cloneNode(true));
    };
}

// TODO: figure out how many other types should be extended