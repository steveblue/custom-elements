export interface ElementMeta {
    selector: string;
    style?: string;
    template?: string;
}

export const html = (...args)=>{ return args };
export const css = (...args)=>{ return args };

export const compileTemplate = function(elementMeta: ElementMeta, target: Function) {
    target.prototype.elementMeta = elementMeta;
    target.prototype.template = document.createElement('template');
    target.prototype.template = `
                <style>
                ${elementMeta.style}
                </style>
                ${elementMeta.template}
                `;
};

export function ComponentMeta(attributes: ElementMeta) {
    return (target: any) => {
        const customElement = function(...args: any[]){};
        if (attributes !== undefined && attributes !== null) {
            compileTemplate(attributes, target);
        }
        customElement.prototype = target.prototype;
        return target;
    };
}

export function attachShadow(instance: any, options: any) {
    const shadowRoot : ShadowRoot = instance.attachShadow(options || {});
    const t = document.createElement('template');
    t.innerHTML = instance.template;
    shadowRoot.appendChild(t.content.cloneNode(true));
}

export function attachDOM(instance: any, options: any) {
    const t = document.createElement('template');
    t.innerHTML = instance.elementMeta.template;
    instance.appendChild(t.content.cloneNode(true));
}

export function attachStyle(instance: any, options: any) {
    const t = document.createElement('style');
    t.innerText = instance.elementMeta.style;
    t.innerText = t.innerText.replace(/:host/gi, `[is=${instance.elementMeta.selector}]`);
    document.head.appendChild(t);
}

export class Component extends HTMLElement {
    constructor() {
        super();
        attachShadow(this);
    }
}

export class ButtonComponent extends HTMLButtonElement {
    constructor() {
        super();
    }
    click() {
        console.log('button click!');
    }
}


// TODO: figure out how many other types should be extended