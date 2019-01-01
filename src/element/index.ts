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
	attachDOM,
	attachStyle,
	attachShadow,
	getSiblings,
	getElementIndex,
	getParent,
	querySelector,
	querySelectorAll
}
