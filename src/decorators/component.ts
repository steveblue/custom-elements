interface ElementMeta {
    selector: string;
    style?: string;
    template?: string;
}

const html = (...args)=>{ return args };
const css = (...args)=>{ return args };

function compileTemplate(elementMeta: ElementMeta, target: Function) {
    target.prototype.elementMeta = elementMeta;
    target.prototype.template = document.createElement('template');
    target.prototype.template = `
                <style>
                ${elementMeta.style}
                </style>
                ${elementMeta.template}
                `;
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

function attachDOM(instance: any, options: any) {
    const t = document.createElement('template');
    t.innerHTML = instance.elementMeta.template;
    instance.appendChild(t.content.cloneNode(true));
}

function attachStyle(instance: any, options: any) {
    const t = document.createElement('style');
    t.innerText = instance.elementMeta.style;
    t.innerText = t.innerText.replace(/:host/gi, `[is=${instance.elementMeta.selector}]`);
    document.head.appendChild(t);
}


function getSiblings(el, filter) {
    if (!filter) {
      filter = [];
    }
    return Array.from(el.parentNode.children).filter((elem) => {
      return elem.tagName !== 'TEXT' && elem.tagName !== 'STYLE';
    });
}

function getParent(el) {
    return el.parentNode;
}



export { ElementMeta, Component, compileTemplate, attachDOM, attachStyle, attachShadow, getSiblings, getParent, html, css };