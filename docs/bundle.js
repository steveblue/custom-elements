/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

const html = (...args) => {
    return args;
};
const css = (...args) => {
    return args;
};
const noop = () => { };
function compileTemplate(elementMeta, target) {
    target.prototype.elementMeta = Object.assign({}, elementMeta);
    target.prototype.template = document.createElement('template');
    target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
}
function Component(attributes) {
    if (!attributes) {
        console.warn('Component must include ElementMeta to compile');
        return;
    }
    return (target) => {
        compileTemplate(attributes, target);
        return target;
    };
}
function Listen(eventName) {
    return function decorator(target, key, descriptor) {
        const { onInit = noop, onDestroy = noop } = target;
        const symbolHandler = Symbol(key);
        function addListener() {
            const handler = this[symbolHandler] = (...args) => {
                descriptor.value.apply(this, args);
            };
            this.addEventListener(eventName, handler);
        }
        function removeListener() {
            this.removeEventListener(eventName, this[symbolHandler]);
        }
        target.onInit = function onInitWrapper() {
            onInit.call(this);
            addListener.call(this);
        };
        target.onDestroy = function onDestroyWrapper() {
            onDestroy.call(this);
            removeListener.call(this);
        };
    };
}
function attachShadow(instance, options) {
    const shadowRoot = instance.attachShadow(options || {});
    const t = document.createElement('template');
    t.innerHTML = instance.template;
    shadowRoot.appendChild(t.content.cloneNode(true));
}
function attachDOM(instance, options) {
    const t = document.createElement('template');
    t.innerHTML = instance.elementMeta.template;
    instance.appendChild(t.content.cloneNode(true));
}
function attachStyle(instance, options) {
    const t = document.createElement('style');
    t.innerText = instance.elementMeta.style;
    t.innerText = t.innerText.replace(/:host/gi, `[is=${instance.elementMeta.selector}]`);
    document.head.appendChild(t);
}
function getParent(el) {
    return el.parentNode;
}
function getSiblings(el, filter) {
    if (!filter) {
        filter = [];
    }
    return Array.from(getParent(el).children).filter(elem => {
        return elem.tagName !== 'TEXT' && elem.tagName !== 'STYLE';
    });
}
function getElementIndex(el) {
    return getSiblings(el).indexOf(el);
}

class CustomElement extends HTMLElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
        if (this.onInit)
            this.onInit();
    }
}
class ButtonComponent extends HTMLButtonElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class InputComponent extends HTMLInputElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}

let MyButtonComponent = class MyButtonComponent extends ButtonComponent {
    constructor() {
        super();
    }
    onClick(event) {
        console.log(this, event);
    }
};
__decorate([
    Listen('click')
], MyButtonComponent.prototype, "onClick", null);
MyButtonComponent = __decorate([
    Component({
        selector: 'my-button',
        template: html `<span>button</span>`,
        style: css `:host{background:#181818;cursor:pointer;color:#fff;font-weight:400}`,
    })
], MyButtonComponent);

let MyInputComponent = class MyInputComponent extends InputComponent {
    constructor() {
        super();
    }
    onFocus(event) {
        console.log(this, event);
        this.value = 'input';
    }
    onBlur(event) {
        console.log(this, event);
    }
};
__decorate([
    Listen('focus')
], MyInputComponent.prototype, "onFocus", null);
__decorate([
    Listen('blur')
], MyInputComponent.prototype, "onBlur", null);
MyInputComponent = __decorate([
    Component({
        selector: 'my-input',
        style: css `:host{background:#181818;border:0;color:#fff}`,
    })
], MyInputComponent);

let MyListComponent = class MyListComponent extends CustomElement {
    constructor() {
        super();
        this.currentIndex = 0;
    }
    deactivateElement(elem) {
        elem.setAttribute('tabindex', '-1');
        elem.querySelector('my-item').setAttribute('state', '');
    }
    activateElement(elem) {
        elem.setAttribute('tabindex', '0');
        elem.querySelector('my-item').setAttribute('state', '--selected');
    }
    connectedCallback() {
        this.setAttribute('tabindex', '0');
    }
    onFocus(ev) {
        for (let li of this.children[0].children) {
            if (li === this.children[0].children[this.currentIndex]) {
                this.activateElement(li);
            }
            else {
                this.deactivateElement(li);
            }
            li.addEventListener('click', (ev) => {
                getSiblings(li).forEach((elem) => {
                    this.deactivateElement(elem);
                });
                this.activateElement(li);
                this.onSubmit(ev);
            });
        }
    }
    onKeydown(ev) {
        let currentElement = this.querySelector('[tabindex]:not([tabindex="-1"])');
        let siblings = getSiblings(currentElement);
        this.currentIndex = getElementIndex(currentElement);
        if (ev.keyCode === 13) {
            this.onSubmit(ev);
        }
        if (ev.keyCode === 38) {
            // up
            if (this.currentIndex === 0) {
                this.currentIndex = siblings.length - 1;
            }
            else {
                this.currentIndex -= 1;
            }
            siblings.forEach((elem) => {
                if (getElementIndex(elem) === this.currentIndex) {
                    this.activateElement(elem);
                }
                else {
                    this.deactivateElement(elem);
                }
            });
        }
        if (ev.keyCode === 40) {
            // down
            if (this.currentIndex === siblings.length - 1) {
                this.currentIndex = 0;
            }
            else {
                this.currentIndex += 1;
            }
            siblings.forEach((elem) => {
                if (getElementIndex(elem) === this.currentIndex) {
                    this.activateElement(elem);
                }
                else {
                    this.deactivateElement(elem);
                }
            });
        }
    }
    onSubmit(event) {
        console.log(this, event);
    }
};
__decorate([
    Listen('focus')
], MyListComponent.prototype, "onFocus", null);
__decorate([
    Listen('keydown')
], MyListComponent.prototype, "onKeydown", null);
MyListComponent = __decorate([
    Component({
        selector: 'my-list',
        template: html `<slot name=menu></slot>`,
        style: css `:host{display:block;background:#181818;width:200px;height:200px;color:#fff;padding:1em;border-radius:8px}`,
    })
], MyListComponent);

let MyItemComponent = class MyItemComponent extends CustomElement {
    constructor() {
        super();
    }
};
MyItemComponent = __decorate([
    Component({
        selector: 'my-item',
        template: html `<p><span><slot name=msg>item</slot></span></p>`,
        style: css `:host{display:block;cursor:pointer}:host([state='--selected']){background:#ff69b4;color:#000;font-weight:700}`,
    })
], MyItemComponent);

customElements.define('my-item', MyItemComponent);
customElements.define('my-list', MyListComponent);
customElements.define('my-input', MyInputComponent, { extends: 'input' });
customElements.define('my-button', MyButtonComponent, { extends: 'button' });
//# sourceMappingURL=bundle.js.map
