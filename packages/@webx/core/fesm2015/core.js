const html = (...args) => {
    return args;
};
const css = (...args) => {
    return args;
};
const noop = () => { };
class XEventDispatcher {
    constructor(context) {
        this.target = context;
        this.events = {};
    }
    get(eventName) {
        return this.events[eventName];
    }
    set(eventName, ev) {
        this.events[eventName] = ev;
        return this.get(eventName);
    }
    emit(ev) {
        (typeof ev === 'string') ? this.target.dispatchEvent(this.events[ev]) : this.target.dispatchEvent(ev);
    }
}
function xcompileTemplate(elementMeta, target) {
    target.prototype.elementMeta = Object.assign({}, elementMeta);
    target.prototype.template = document.createElement('template');
    target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
    target.prototype.getEvent = function (eventName) { return this.elementMeta.events[eventName]; };
    target.prototype.setEvent = function (eventName, eventModel) { return this.elementMeta.events[eventName] = eventModel; };
}
function XComponent(attributes) {
    if (!attributes) {
        console.warn('XComponent must include XElementMeta to compile');
        return;
    }
    return (target) => {
        xcompileTemplate(attributes, target);
        return target;
    };
}
function XEmitter(eventName, options) {
    return function decorator(target, key, descriptor) {
        const { onInit = noop } = target;
        function addEvent() {
            if (!this.emitter) {
                this.emitter = new XEventDispatcher(this);
            }
            this.emitter.set(eventName, new CustomEvent(eventName, options ? options : {}));
        }
        target.onInit = function onInitWrapper() {
            onInit.call(this);
            addEvent.call(this);
        };
    };
}
function XListen(eventName) {
    return function decorator(target, key, descriptor) {
        const { onInit = noop, onDestroy = noop } = target;
        const symbolHandler = Symbol(key);
        function addListener() {
            const handler = this[symbolHandler] = (...args) => {
                descriptor.value.apply(this, args);
            };
            if (!this.emitter) {
                this.emitter = new XEventDispatcher(this);
            }
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

function xattachShadow(instance, options) {
    const shadowRoot = instance.attachShadow(options || {});
    const t = document.createElement('template');
    t.innerHTML = instance.template;
    shadowRoot.appendChild(t.content.cloneNode(true));
}
function xattachDOM(instance, options) {
    const t = document.createElement('template');
    t.innerHTML = instance.elementMeta.template;
    instance.appendChild(t.content.cloneNode(true));
}
function xattachStyle(instance, options) {
    const id = `${instance.elementMeta.selector}`;
    if (!document.getElementById(`${id}-x`)) {
        const t = document.createElement('style');
        t.setAttribute('id', `${id}-x`);
        t.innerText = instance.elementMeta.style;
        t.innerText = t.innerText.replace(/:host/gi, `[is=${id}]`);
        document.head.appendChild(t);
    }
}
function xgetParent(el) {
    return el.parentNode;
}
function xquerySelector(selector) {
    return document.querySelector(selector);
}
function xquerySelectorAll(selector) {
    return Array.from(document.querySelectorAll(selector));
}
function xgetSiblings(el, filter) {
    if (!filter) {
        filter = [];
    }
    return Array.from(xgetParent(el).children).filter(elem => {
        return elem.tagName !== 'TEXT' && elem.tagName !== 'STYLE';
    });
}
function xgetElementIndex(el) {
    return xgetSiblings(el).indexOf(el);
}

class XElement extends HTMLElement {
    constructor() {
        super();
        xattachDOM(this);
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XCustomElement extends HTMLElement {
    constructor() {
        super();
        xattachShadow(this, { mode: 'open' });
        if (this.onInit)
            this.onInit();
    }
}
class XAllCollectionComponent extends HTMLAllCollection {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XAnchorComponent extends HTMLAnchorElement {
    constructor() {
        super();
        xattachDOM(this);
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XAreaComponent extends HTMLAreaElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XAudioComponent extends HTMLAudioElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XBRComponent extends HTMLBRElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XBodyComponent extends HTMLBodyElement {
    constructor() {
        super();
        xattachShadow(this, { mode: 'open' });
        if (this.onInit)
            this.onInit();
    }
}
class XButtonComponent extends HTMLButtonElement {
    constructor() {
        super();
        xattachDOM(this);
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XCanvasComponent extends HTMLCanvasElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XCollectionComponent extends HTMLCollection {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XContentComponent extends HTMLContentElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XDListComponent extends HTMLDListElement {
    constructor() {
        super();
        xattachDOM(this);
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XDataComponent extends HTMLDataElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XDataListComponent extends HTMLDataListElement {
    constructor() {
        super();
        xattachDOM(this);
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XDetailsComponent extends HTMLDetailsElement {
    constructor() {
        super();
        xattachDOM(this);
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XDialogComponent extends HTMLDialogElement {
    constructor() {
        super();
        xattachDOM(this);
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XDivComponent extends HTMLDivElement {
    constructor() {
        super();
        xattachShadow(this, { mode: 'open' });
        if (this.onInit)
            this.onInit();
    }
}
// export class XDocumentComponent extends HTMLDocumentElement {
//     constructor() {
//         super();
//         xattachShadow(this);
//     }
// }
class XEmbedComponent extends HTMLEmbedElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XFieldSetComponent extends HTMLFieldSetElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XFormControlsComponent extends HTMLFormControlsCollection {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XFormComponent extends HTMLFormElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XHRComponent extends HTMLHRElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XHeadComponent extends HTMLHeadElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XHeadingComponent extends HTMLHeadingElement {
    constructor() {
        super();
        xattachShadow(this, { mode: 'open' });
        if (this.onInit)
            this.onInit();
    }
}
class XHtmlComponent extends HTMLHtmlElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XIFrameComponent extends HTMLIFrameElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XImageComponent extends HTMLImageElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XInputComponent extends HTMLInputElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XLIComponent extends HTMLLIElement {
    constructor() {
        super();
        xattachDOM(this);
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XLabelComponent extends HTMLLabelElement {
    constructor() {
        super();
        xattachDOM(this);
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XLegendComponent extends HTMLLegendElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XLinkComponent extends HTMLLinkElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XMapComponent extends HTMLMapElement {
    constructor() {
        super();
        xattachDOM(this);
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XMediaComponent extends HTMLMediaElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XMenuComponent extends HTMLMenuElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XMetaComponent extends HTMLMetaElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XMeterComponent extends HTMLMeterElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XModComponent extends HTMLModElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XOListComponent extends HTMLOListElement {
    constructor() {
        super();
        xattachDOM(this);
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XObjectComponent extends HTMLObjectElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XOptGroupComponent extends HTMLOptGroupElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XOptionComponent extends HTMLOptionElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XOptionsCollectionComponent extends HTMLOptionsCollection {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XOutputComponent extends HTMLOutputElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XParagraphComponent extends HTMLParagraphElement {
    constructor() {
        super();
        xattachShadow(this, { mode: 'open' });
        if (this.onInit)
            this.onInit();
    }
}
class XParamComponent extends HTMLParamElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XPictureComponent extends HTMLPictureElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XPreComponent extends HTMLPreElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XProgressComponent extends HTMLProgressElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XQuoteComponent extends HTMLQuoteElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XScriptComponent extends HTMLScriptElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XSelectComponent extends HTMLSelectElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XShadowComponent extends HTMLShadowElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XSlotComponent extends HTMLSlotElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XSourceComponent extends HTMLSourceElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XSpanComponent extends HTMLSpanElement {
    constructor() {
        super();
        xattachShadow(this, { mode: 'open' });
        if (this.onInit)
            this.onInit();
    }
}
class XStyleComponent extends HTMLStyleElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XTableCaptionComponent extends HTMLTableCaptionElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XTableCellComponent extends HTMLTableCellElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XTableColComponent extends HTMLTableColElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XTableComponent extends HTMLTableElement {
    constructor() {
        super();
        xattachDOM(this);
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XTableRowComponent extends HTMLTableRowElement {
    constructor() {
        super();
        xattachDOM(this);
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XTableSectionComponent extends HTMLTableSectionElement {
    constructor() {
        super();
        xattachDOM(this);
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XTemplateComponent extends HTMLTemplateElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
// export class XTextareaComponent extends HTMLTextareaElement {
//     constructor() {
//         super();
//     }
// }
class XTimeComponent extends HTMLTimeElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XTitleComponent extends HTMLTitleElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XTrackComponent extends HTMLTrackElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XUListComponent extends HTMLUListElement {
    constructor() {
        super();
        xattachDOM(this);
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}
class XUnknownComponent extends HTMLUnknownElement {
    constructor() {
        super();
        if (this.onInit)
            this.onInit();
    }
}
class XVideoComponent extends HTMLVideoElement {
    constructor() {
        super();
        xattachStyle(this);
        if (this.onInit)
            this.onInit();
    }
}

export { XEventDispatcher, XComponent, XEmitter, XListen, xcompileTemplate, html, css, noop, XElement, XCustomElement, XAllCollectionComponent, XAnchorComponent, XAreaComponent, XAudioComponent, XBRComponent, XBodyComponent, XButtonComponent, XCanvasComponent, XCollectionComponent, XContentComponent, XDListComponent, XDataComponent, XDataListComponent, XDetailsComponent, XDialogComponent, XDivComponent, XEmbedComponent, XFieldSetComponent, XFormControlsComponent, XFormComponent, XHRComponent, XHeadComponent, XHeadingComponent, XHtmlComponent, XIFrameComponent, XImageComponent, XInputComponent, XLIComponent, XLabelComponent, XLegendComponent, XLinkComponent, XMapComponent, XMediaComponent, XMenuComponent, XMetaComponent, XMeterComponent, XModComponent, XOListComponent, XObjectComponent, XOptGroupComponent, XOptionComponent, XOptionsCollectionComponent, XOutputComponent, XParagraphComponent, XParamComponent, XPictureComponent, XPreComponent, XProgressComponent, XQuoteComponent, XScriptComponent, XSelectComponent, XShadowComponent, XSlotComponent, XSourceComponent, XSpanComponent, XStyleComponent, XTableCaptionComponent, XTableCellComponent, XTableColComponent, XTableComponent, XTableRowComponent, XTableSectionComponent, XTemplateComponent, XTimeComponent, XTitleComponent, XTrackComponent, XUListComponent, XUnknownComponent, XVideoComponent, xattachDOM, xattachStyle, xattachShadow, xgetSiblings, xgetElementIndex, xgetParent, xquerySelector, xquerySelectorAll };
