interface ElementMeta {
	selector: string;
	style?: string;
	template?: string;
}

const html = (...args) => {
	return args;
};
const css = (...args) => {
	return args;
};
const noop = () => {};

class EventDispatcher {
		public target: Element;
		public events: any;
		constructor(context) {
			this.target = context;
			this.events = {};
		}
		get(eventName: string) {
			return this.events[eventName];
		}
		set(eventName: string, ev: CustomEvent | Event) {
			this.events[eventName] = ev;
			return this.get(eventName);
		}
		emit(ev: Event | string) {
			(typeof ev === 'string') ? this.target.dispatchEvent(this.events[ev]) : this.target.dispatchEvent(ev);
		}
}

function compileTemplate(elementMeta: ElementMeta, target: Function) {
	target.prototype.elementMeta = Object.assign({}, elementMeta);
	target.prototype.template = document.createElement('template');
	target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
	target.prototype.getEvent = function (eventName: string) { return this.elementMeta.events[eventName]; };
	target.prototype.setEvent = function (eventName: string, eventModel: Event) { return this.elementMeta.events[eventName] = eventModel; };
}

function Component(attributes: ElementMeta) {
	if (!attributes) {
		console.warn('Component must include ElementMeta to compile');
		return;
	}
	return (target: Function) => {
		compileTemplate(attributes, target);
		return target;
	};
}

function Emitter(eventName: string, options: Event) {

	return function decorator(target: any, key: string | symbol, descriptor: PropertyDescriptor) {

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
	}
}


function Listen(eventName: string) {
	return function decorator(target: any, key: string | symbol, descriptor: PropertyDescriptor) {

		  const { onInit = noop, onDestroy = noop } = target;
			const symbolHandler = Symbol(key);

			function addListener() {
				const handler = this[symbolHandler] = (...args) => {
					descriptor.value.apply(this, args);
				};
				if (!this.emitter) {
					this.emitter = new EventDispatcher(this);
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
				onDestroy.call(this)
				removeListener.call(this);
			}
	}
}

function attachShadow(instance: any, options: any) {
	const shadowRoot: ShadowRoot = instance.attachShadow(options || {});
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

function getParent(el) {
	return el.parentNode;
}

function querySelector(selector: string) {
	return document.querySelector(selector);
}

function querySelectorAll(selector: string) {
	return Array.from(document.querySelectorAll(selector));
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

export {
	ElementMeta,
	Component,
	Emitter,
	Listen,
	compileTemplate,
	attachEvents,
	attachDOM,
	attachStyle,
	attachShadow,
	getSiblings,
	getElementIndex,
	getParent,
	querySelector,
	querySelectorAll,
	html,
	css,
};
