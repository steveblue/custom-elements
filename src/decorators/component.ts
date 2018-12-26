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

function compileTemplate(elementMeta: ElementMeta, target: Function) {
	target.prototype.elementMeta = Object.assign({}, elementMeta);
	target.prototype.template = document.createElement('template');
	target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
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

function Listen(eventName: string) {
	return function decorator(target: any, key: string | symbol, descriptor: PropertyDescriptor) {
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
	Listen,
	compileTemplate,
	attachEvents,
	attachDOM,
	attachStyle,
	attachShadow,
	getSiblings,
	getElementIndex,
	getParent,
	html,
	css,
};
