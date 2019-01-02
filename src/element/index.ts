function xattachShadow(instance: any, options: any) {
	const shadowRoot: ShadowRoot = instance.attachShadow(options || {});
	const t = document.createElement('template');
	t.innerHTML = instance.template;
	shadowRoot.appendChild(t.content.cloneNode(true));
}

function xattachDOM(instance: any, options: any) {
	const t = document.createElement('template');
	t.innerHTML = instance.elementMeta.template;
	instance.appendChild(t.content.cloneNode(true));
}

function xattachStyle(instance: any, options: any) {
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

function xquerySelector(selector: string) {
	return document.querySelector(selector);
}

function xquerySelectorAll(selector: string) {
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

export {
	xattachDOM,
	xattachStyle,
	xattachShadow,
	xgetSiblings,
	xgetElementIndex,
	xgetParent,
	xquerySelector,
	xquerySelectorAll
}
