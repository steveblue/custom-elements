'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const TEMPLATE_BIND_REGEX = /\{\{(\s*)(.*?)(\s*)\}\}/g;
const BIND_SUFFIX = ' _state';
const html = (...args) => {
    return args;
};
const css = (...args) => {
    return args;
};
const noop = () => { };
class EventDispatcher {
    constructor(context) {
        this.target = context;
        this.channels = {
            'default': new BroadcastChannel('default')
        };
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
        if (typeof ev === 'string')
            ev = this.events[ev];
        this.target.dispatchEvent(ev);
    }
    broadcast(ev, name) {
        if (typeof ev === 'string')
            ev = this.events[ev];
        this.target.dispatchEvent(ev);
        ev = { type: ev.type, detail: ev.detail };
        if (ev.detail === null)
            delete ev.detail;
        (name) ? this.channels[name].postMessage(ev) : this.channels['default'].postMessage(ev);
    }
    setChannel(name) {
        this.channels[name] = new BroadcastChannel(name);
    }
    removeChannel(name) {
        this.channels[name].close();
        delete this.channels[name];
    }
}
class BoundNode {
    constructor(node) {
        this.template = node.innerHTML;
        this.node = node;
    }
    update(data) {
        let tempTemplate = this.template.slice(0);
        this.node.innerHTML = tempTemplate.replace(TEMPLATE_BIND_REGEX, (match, variable) => {
            const lastProp = /\{\{(\s*)(.*?)(\s*)\}\}/.exec(match)[2].split('.')[1];
            return data.elementMeta.boundState['model' + BIND_SUFFIX]['message' + ' __'][lastProp] || '';
        });
    }
}
class BoundModel {
    constructor() {
        const callbacks = [];
        const data = {
            onUpdate: function onUpdate(fn) {
                callbacks.push(fn);
            }
        };
        const proxy = new Proxy(data, {
            set: function (target, property, value) {
                target[property] = value;
                callbacks.forEach((callback) => callback());
                return true;
            }
        });
        return proxy;
    }
}
function bindTemplate() {
    if (!this.elementMeta)
        this.elementMeta = {};
    this.elementMeta.templateRegex = TEMPLATE_BIND_REGEX;
    this.elementMeta.boundState = {
        ['node' + BIND_SUFFIX]: new BoundNode(this),
        ['model' + BIND_SUFFIX]: new BoundModel()
    };
    this.elementMeta.boundState['model' + BIND_SUFFIX].onUpdate(() => {
        this.elementMeta.boundState['node' + BIND_SUFFIX].update(this);
    });
}
function setState(state, model) {
    this.elementMeta.boundState['model' + BIND_SUFFIX]['message' + ' __'] = model;
}
function compileTemplate(elementMeta, target) {
    target.prototype.elementMeta = Object.assign({}, elementMeta);
    target.prototype.elementMeta.eventMap = {};
    target.prototype.template = document.createElement('template');
    target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
    target.prototype.getChildNodes = getChildNodes;
    target.prototype.bindTemplate = bindTemplate;
    target.prototype.setState = setState;
}
function getChildNodes() {
    function getChildren(node, path = [], result = []) {
        if (!node.children.length)
            result.push(path.concat(node));
        for (const child of node.children)
            getChildren(child, path.concat(child), result);
        return result;
    }
    const nodes = getChildren(this, []).reduce((nodes, curr) => {
        return nodes.concat(curr);
    }, []);
    return nodes.filter((item, index) => { return nodes.indexOf(item) >= index; });
}
function Component(attributes) {
    if (!attributes) {
        console.error('Component must include ElementMeta to compile');
        return;
    }
    return (target) => {
        compileTemplate(attributes, target);
        return target;
    };
}
function Emitter(eventName, options) {
    return function decorator(target, key, descriptor) {
        const { onInit = noop } = target;
        function addEvent() {
            if (!this.emitter) {
                this.emitter = new EventDispatcher(this);
            }
            this.emitter.set(eventName, new CustomEvent(eventName, options ? options : {}));
        }
        target.onInit = function onInitWrapper() {
            onInit.call(this);
            addEvent.call(this);
        };
    };
}
function Listen(eventName, channelName) {
    return function decorator(target, key, descriptor) {
        const { onInit = noop, onDestroy = noop } = target;
        const symbolHandler = Symbol(key);
        function addListener() {
            const handler = this[symbolHandler] = (...args) => {
                descriptor.value.apply(this, args);
            };
            if (!this.emitter) {
                this.emitter = new EventDispatcher(this);
                if (channelName) {
                    this.elementMeta.eventMap[eventName] = {
                        key: eventName,
                        handler: key
                    };
                    this.emitter.channels[channelName].onmessage = (ev) => {
                        this[this.elementMeta.eventMap[eventName].handler](ev.data);
                    };
                }
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

function attachShadow(instance, options) {
    const shadowRoot = instance.attachShadow(options || {});
    const t = document.createElement('template');
    t.innerHTML = instance.template;
    shadowRoot.appendChild(t.content.cloneNode(true));
    instance.bindTemplate();
}
function attachDOM(instance, options) {
    const t = document.createElement('template');
    t.innerHTML = instance.elementMeta.template;
    instance.appendChild(t.content.cloneNode(true));
    instance.bindTemplate();
}
function attachStyle(instance, options) {
    const id = `${instance.elementMeta.selector}`;
    if (!document.getElementById(`${id}-x`)) {
        const t = document.createElement('style');
        t.setAttribute('id', `${id}-x`);
        t.innerText = instance.elementMeta.style;
        t.innerText = t.innerText.replace(/:host/gi, `[is=${id}]`);
        document.head.appendChild(t);
    }
}
function getParent(el) {
    return el.parentNode;
}
function querySelector(selector) {
    return document.querySelector(selector);
}
function querySelectorAll(selector) {
    return Array.from(document.querySelectorAll(selector));
}
function getSiblings(el, filter) {
    if (!filter) {
        filter = [];
    }
    return Array.from(getParent(el).children).filter((elem) => {
        return elem.tagName !== 'TEXT' && elem.tagName !== 'STYLE';
    });
}
function getElementIndex(el) {
    return getSiblings(el).indexOf(el);
}

class PseudoElement extends HTMLElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class CustomElement extends HTMLElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
        if (this.onInit) {
            this.onInit();
        }
    }
}
class AllCollectionComponent extends HTMLAllCollection {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class AnchorComponent extends HTMLAnchorElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class AreaComponent extends HTMLAreaElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class AudioComponent extends HTMLAudioElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class BRComponent extends HTMLBRElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class BodyComponent extends HTMLBodyElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ButtonComponent extends HTMLButtonElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class CanvasComponent extends HTMLCanvasElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class CollectionComponent extends HTMLCollection {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ContentComponent extends HTMLContentElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class DListComponent extends HTMLDListElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class DataComponent extends HTMLDataElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class DataListComponent extends HTMLDataListElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class DetailsComponent extends HTMLDetailsElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class DialogComponent extends HTMLDialogElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class DivComponent extends HTMLDivElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
        if (this.onInit) {
            this.onInit();
        }
    }
}
class EmbedComponent extends HTMLEmbedElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class FieldSetComponent extends HTMLFieldSetElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class FormControlsComponent extends HTMLFormControlsCollection {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class FormComponent extends HTMLFormElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class HRComponent extends HTMLHRElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class HeadComponent extends HTMLHeadElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class HeadingComponent extends HTMLHeadingElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
        if (this.onInit) {
            this.onInit();
        }
    }
}
class HtmlComponent extends HTMLHtmlElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class IFrameComponent extends HTMLIFrameElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ImageComponent extends HTMLImageElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class InputComponent extends HTMLInputElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class LIComponent extends HTMLLIElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class LabelComponent extends HTMLLabelElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class LegendComponent extends HTMLLegendElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class LinkComponent extends HTMLLinkElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class MapComponent extends HTMLMapElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class MediaComponent extends HTMLMediaElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class MenuComponent extends HTMLMenuElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class MetaComponent extends HTMLMetaElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class MeterComponent extends HTMLMeterElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ModComponent extends HTMLModElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class OListComponent extends HTMLOListElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ObjectComponent extends HTMLObjectElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class OptGroupComponent extends HTMLOptGroupElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class OptionComponent extends HTMLOptionElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class OptionsCollectionComponent extends HTMLOptionsCollection {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class OutputComponent extends HTMLOutputElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ParagraphComponent extends HTMLParagraphElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ParamComponent extends HTMLParamElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class PictureComponent extends HTMLPictureElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class PreComponent extends HTMLPreElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ProgressComponent extends HTMLProgressElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class QuoteComponent extends HTMLQuoteElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ScriptComponent extends HTMLScriptElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class SelectComponent extends HTMLSelectElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class ShadowComponent extends HTMLShadowElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class SlotComponent extends HTMLSlotElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class SourceComponent extends HTMLSourceElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class SpanComponent extends HTMLSpanElement {
    constructor() {
        super();
        attachShadow(this, { mode: 'open' });
        if (this.onInit) {
            this.onInit();
        }
    }
}
class StyleComponent extends HTMLStyleElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TableCaptionComponent extends HTMLTableCaptionElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TableCellComponent extends HTMLTableCellElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TableColComponent extends HTMLTableColElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TableComponent extends HTMLTableElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TableRowComponent extends HTMLTableRowElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TableSectionComponent extends HTMLTableSectionElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TemplateComponent extends HTMLTemplateElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TimeComponent extends HTMLTimeElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TitleComponent extends HTMLTitleElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class TrackComponent extends HTMLTrackElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class UListComponent extends HTMLUListElement {
    constructor() {
        super();
        attachDOM(this);
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}
class UnknownComponent extends HTMLUnknownElement {
    constructor() {
        super();
        if (this.onInit) {
            this.onInit();
        }
    }
}
class VideoComponent extends HTMLVideoElement {
    constructor() {
        super();
        attachStyle(this);
        if (this.onInit) {
            this.onInit();
        }
    }
}

exports.EventDispatcher = EventDispatcher;
exports.BoundNode = BoundNode;
exports.BoundModel = BoundModel;
exports.Component = Component;
exports.Emitter = Emitter;
exports.Listen = Listen;
exports.compileTemplate = compileTemplate;
exports.html = html;
exports.css = css;
exports.noop = noop;
exports.PseudoElement = PseudoElement;
exports.CustomElement = CustomElement;
exports.AllCollectionComponent = AllCollectionComponent;
exports.AnchorComponent = AnchorComponent;
exports.AreaComponent = AreaComponent;
exports.AudioComponent = AudioComponent;
exports.BRComponent = BRComponent;
exports.BodyComponent = BodyComponent;
exports.ButtonComponent = ButtonComponent;
exports.CanvasComponent = CanvasComponent;
exports.CollectionComponent = CollectionComponent;
exports.ContentComponent = ContentComponent;
exports.DListComponent = DListComponent;
exports.DataComponent = DataComponent;
exports.DataListComponent = DataListComponent;
exports.DetailsComponent = DetailsComponent;
exports.DialogComponent = DialogComponent;
exports.DivComponent = DivComponent;
exports.EmbedComponent = EmbedComponent;
exports.FieldSetComponent = FieldSetComponent;
exports.FormControlsComponent = FormControlsComponent;
exports.FormComponent = FormComponent;
exports.HRComponent = HRComponent;
exports.HeadComponent = HeadComponent;
exports.HeadingComponent = HeadingComponent;
exports.HtmlComponent = HtmlComponent;
exports.IFrameComponent = IFrameComponent;
exports.ImageComponent = ImageComponent;
exports.InputComponent = InputComponent;
exports.LIComponent = LIComponent;
exports.LabelComponent = LabelComponent;
exports.LegendComponent = LegendComponent;
exports.LinkComponent = LinkComponent;
exports.MapComponent = MapComponent;
exports.MediaComponent = MediaComponent;
exports.MenuComponent = MenuComponent;
exports.MetaComponent = MetaComponent;
exports.MeterComponent = MeterComponent;
exports.ModComponent = ModComponent;
exports.OListComponent = OListComponent;
exports.ObjectComponent = ObjectComponent;
exports.OptGroupComponent = OptGroupComponent;
exports.OptionComponent = OptionComponent;
exports.OptionsCollectionComponent = OptionsCollectionComponent;
exports.OutputComponent = OutputComponent;
exports.ParagraphComponent = ParagraphComponent;
exports.ParamComponent = ParamComponent;
exports.PictureComponent = PictureComponent;
exports.PreComponent = PreComponent;
exports.ProgressComponent = ProgressComponent;
exports.QuoteComponent = QuoteComponent;
exports.ScriptComponent = ScriptComponent;
exports.SelectComponent = SelectComponent;
exports.ShadowComponent = ShadowComponent;
exports.SlotComponent = SlotComponent;
exports.SourceComponent = SourceComponent;
exports.SpanComponent = SpanComponent;
exports.StyleComponent = StyleComponent;
exports.TableCaptionComponent = TableCaptionComponent;
exports.TableCellComponent = TableCellComponent;
exports.TableColComponent = TableColComponent;
exports.TableComponent = TableComponent;
exports.TableRowComponent = TableRowComponent;
exports.TableSectionComponent = TableSectionComponent;
exports.TemplateComponent = TemplateComponent;
exports.TimeComponent = TimeComponent;
exports.TitleComponent = TitleComponent;
exports.TrackComponent = TrackComponent;
exports.UListComponent = UListComponent;
exports.UnknownComponent = UnknownComponent;
exports.VideoComponent = VideoComponent;
exports.attachDOM = attachDOM;
exports.attachStyle = attachStyle;
exports.attachShadow = attachShadow;
exports.getSiblings = getSiblings;
exports.getElementIndex = getElementIndex;
exports.getParent = getParent;
exports.querySelector = querySelector;
exports.querySelectorAll = querySelectorAll;
