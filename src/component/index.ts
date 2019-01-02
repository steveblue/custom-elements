import { xattachDOM, xattachStyle, xattachShadow } from './../element/index';

export class XElement extends HTMLElement {
	constructor() {
		super();
		xattachDOM(this);
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}

export class XCustomElement extends HTMLElement {
	constructor() {
		super();
		xattachShadow(this, { mode: 'open' });
		if (this.onInit) this.onInit();
	}
}

export class XAllCollectionComponent extends HTMLAllCollection {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XAnchorComponent extends HTMLAnchorElement {
	constructor() {
		super();
		xattachDOM(this);
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XAreaComponent extends HTMLAreaElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XAudioComponent extends HTMLAudioElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XBRComponent extends HTMLBRElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XBodyComponent extends HTMLBodyElement {
	constructor() {
		super();
		xattachShadow(this, { mode: 'open' });
		if (this.onInit) this.onInit();
	}
}
export class XButtonComponent extends HTMLButtonElement {
	constructor() {
		super();
		xattachDOM(this);
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XCanvasComponent extends HTMLCanvasElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XCollectionComponent extends HTMLCollection {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XContentComponent extends HTMLContentElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XDListComponent extends HTMLDListElement {
	constructor() {
		super();
		xattachDOM(this);
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XDataComponent extends HTMLDataElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XDataListComponent extends HTMLDataListElement {
	constructor() {
		super();
		xattachDOM(this);
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XDetailsComponent extends HTMLDetailsElement {
	constructor() {
		super();
		xattachDOM(this);
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XDialogComponent extends HTMLDialogElement {
	constructor() {
		super();
		xattachDOM(this);
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}

export class XDivComponent extends HTMLDivElement {
	constructor() {
		super();
		xattachShadow(this, { mode: 'open' });
		if (this.onInit) this.onInit();
	}
}
// export class XDocumentComponent extends HTMLDocumentElement {
//     constructor() {
//         super();
//         xattachShadow(this);
//     }
// }
export class XEmbedComponent extends HTMLEmbedElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XFieldSetComponent extends HTMLFieldSetElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XFormControlsComponent extends HTMLFormControlsCollection {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XFormComponent extends HTMLFormElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XHRComponent extends HTMLHRElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XHeadComponent extends HTMLHeadElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XHeadingComponent extends HTMLHeadingElement {
	constructor() {
		super();
		xattachShadow(this, { mode: 'open' });
		if (this.onInit) this.onInit();
	}
}
export class XHtmlComponent extends HTMLHtmlElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XIFrameComponent extends HTMLIFrameElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XImageComponent extends HTMLImageElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XInputComponent extends HTMLInputElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XLIComponent extends HTMLLIElement {
	constructor() {
		super();
		xattachDOM(this);
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XLabelComponent extends HTMLLabelElement {
	constructor() {
		super();
		xattachDOM(this);
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XLegendComponent extends HTMLLegendElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XLinkComponent extends HTMLLinkElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XMapComponent extends HTMLMapElement {
	constructor() {
		super();
		xattachDOM(this);
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}

export class XMediaComponent extends HTMLMediaElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XMenuComponent extends HTMLMenuElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XMetaComponent extends HTMLMetaElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XMeterComponent extends HTMLMeterElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XModComponent extends HTMLModElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XOListComponent extends HTMLOListElement {
	constructor() {
		super();
		xattachDOM(this);
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XObjectComponent extends HTMLObjectElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XOptGroupComponent extends HTMLOptGroupElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XOptionComponent extends HTMLOptionElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XOptionsCollectionComponent extends HTMLOptionsCollection {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XOutputComponent extends HTMLOutputElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XParagraphComponent extends HTMLParagraphElement {
	constructor() {
		super();
		xattachShadow(this, { mode: 'open' });
		if (this.onInit) this.onInit();
	}
}
export class XParamComponent extends HTMLParamElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XPictureComponent extends HTMLPictureElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XPreComponent extends HTMLPreElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XProgressComponent extends HTMLProgressElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XQuoteComponent extends HTMLQuoteElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XScriptComponent extends HTMLScriptElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XSelectComponent extends HTMLSelectElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XShadowComponent extends HTMLShadowElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XSlotComponent extends HTMLSlotElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XSourceComponent extends HTMLSourceElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XSpanComponent extends HTMLSpanElement {
	constructor() {
		super();
		xattachShadow(this, { mode: 'open' });
		if (this.onInit) this.onInit();
	}
}
export class XStyleComponent extends HTMLStyleElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XTableCaptionComponent extends HTMLTableCaptionElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XTableCellComponent extends HTMLTableCellElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XTableColComponent extends HTMLTableColElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XTableComponent extends HTMLTableElement {
	constructor() {
		super();
		xattachDOM(this);
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}

export class XTableRowComponent extends HTMLTableRowElement {
	constructor() {
		super();
		xattachDOM(this);
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XTableSectionComponent extends HTMLTableSectionElement {
	constructor() {
		super();
		xattachDOM(this);
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XTemplateComponent extends HTMLTemplateElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
// export class XTextareaComponent extends HTMLTextareaElement {
//     constructor() {
//         super();
//     }
// }
export class XTimeComponent extends HTMLTimeElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XTitleComponent extends HTMLTitleElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XTrackComponent extends HTMLTrackElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class XUListComponent extends HTMLUListElement {
	constructor() {
		super();
		xattachDOM(this);
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class XUnknownComponent extends HTMLUnknownElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}

export class XVideoComponent extends HTMLVideoElement {
	constructor() {
		super();
		xattachStyle(this);
		if (this.onInit) this.onInit();
	}
}
