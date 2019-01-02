interface XElementMeta {
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

class XEventDispatcher {
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

function xcompileTemplate(elementMeta: XElementMeta, target: Function) {
	target.prototype.elementMeta = Object.assign({}, elementMeta);
	target.prototype.template = document.createElement('template');
	target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
	target.prototype.getEvent = function (eventName: string) { return this.elementMeta.events[eventName]; };
	target.prototype.setEvent = function (eventName: string, eventModel: Event) { return this.elementMeta.events[eventName] = eventModel; };
}

function XComponent(attributes: XElementMeta) {
	if (!attributes) {
		console.warn('XComponent must include XElementMeta to compile');
		return;
	}
	return (target: Function) => {
		xcompileTemplate(attributes, target);
		return target;
	};
}

function XEmitter(eventName: string, options: Event) {

	return function decorator(target: any, key: string | symbol, descriptor: PropertyDescriptor) {

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
	}
}


function XListen(eventName: string) {
	return function decorator(target: any, key: string | symbol, descriptor: PropertyDescriptor) {

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
				onDestroy.call(this)
				removeListener.call(this);
			}
	}
}

export {
	XElementMeta,
	XEventDispatcher,
	XComponent,
	XEmitter,
	XListen,
	xcompileTemplate,
	html,
	css,
	noop
}
