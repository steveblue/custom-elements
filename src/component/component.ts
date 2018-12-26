import { attachDOM, attachStyle, attachShadow, attachEvents } from './../decorators/component';

export class CustomElement extends HTMLElement {
	constructor() {
		super();
		attachShadow(this, { mode: 'open' });
		if (this.onInit) this.onInit();
	}
}

export class AllCollectionComponent extends HTMLAllCollection {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class AnchorComponent extends HTMLAnchorElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class AreaComponent extends HTMLAreaElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class AudioComponent extends HTMLAudioElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class BRComponent extends HTMLBRElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class BodyComponent extends HTMLBodyElement {
	constructor() {
		super();
		attachShadow(this, { mode: 'open' });
		if (this.onInit) this.onInit();
	}
}
export class ButtonComponent extends HTMLButtonElement {
	constructor() {
		super();
		attachDOM(this);
		attachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class CanvasComponent extends HTMLCanvasElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class CollectionComponent extends HTMLCollection {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class ContentComponent extends HTMLContentElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class DListComponent extends HTMLDListElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class DataComponent extends HTMLDataElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class DataListComponent extends HTMLDataListElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class DetailsComponent extends HTMLDetailsElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class DialogComponent extends HTMLDialogElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class DirectoryComponent extends HTMLDirectoryElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class DivComponent extends HTMLDivElement {
	constructor() {
		super();
		attachShadow(this, { mode: 'open' });
		if (this.onInit) this.onInit();
	}
}
// export class DocumentComponent extends HTMLDocumentElement {
//     constructor() {
//         super();
//         attachShadow(this);
//     }
// }
export class EmbedComponent extends HTMLEmbedElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class FieldSetComponent extends HTMLFieldSetElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class FontComponent extends HTMLFontElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class FormControlsComponent extends HTMLFormControlsCollection {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class FormComponent extends HTMLFormElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class FrameComponent extends HTMLFrameElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class FrameSetComponent extends HTMLFrameSetElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class HRComponent extends HTMLHRElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class HeadComponent extends HTMLHeadElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class HeadingComponent extends HTMLHeadingElement {
	constructor() {
		super();
		attachShadow(this, { mode: 'open' });
		if (this.onInit) this.onInit();
	}
}
export class HtmlComponent extends HTMLHtmlElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class IFrameComponent extends HTMLIFrameElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class ImageComponent extends HTMLImageElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class InputComponent extends HTMLInputElement {
	constructor() {
		super();
		attachStyle(this);
		if (this.onInit) this.onInit();
	}
}
export class LIComponent extends HTMLLIElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class LabelComponent extends HTMLLabelElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class LegendComponent extends HTMLLegendElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class LinkComponent extends HTMLLinkElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class MapComponent extends HTMLMapElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class MarqueeComponent extends HTMLMarqueeElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class MediaComponent extends HTMLMediaElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class MenuComponent extends HTMLMenuElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class MetaComponent extends HTMLMetaElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class MeterComponent extends HTMLMeterElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class ModComponent extends HTMLModElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class OListComponent extends HTMLOListElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class ObjectComponent extends HTMLObjectElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class OptGroupComponent extends HTMLOptGroupElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class OptionComponent extends HTMLOptionElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class OptionsCollectionComponent extends HTMLOptionsCollection {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class OutputComponent extends HTMLOutputElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class ParagraphComponent extends HTMLParagraphElement {
	constructor() {
		super();
		attachShadow(this, { mode: 'open' });
		if (this.onInit) this.onInit();
	}
}
export class ParamComponent extends HTMLParamElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class PictureComponent extends HTMLPictureElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class PreComponent extends HTMLPreElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class ProgressComponent extends HTMLProgressElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class QuoteComponent extends HTMLQuoteElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class ScriptComponent extends HTMLScriptElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class SelectComponent extends HTMLSelectElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class ShadowComponent extends HTMLShadowElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class SlotComponent extends HTMLSlotElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class SourceComponent extends HTMLSourceElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class SpanComponent extends HTMLSpanElement {
	constructor() {
		super();
		attachShadow(this, { mode: 'open' });
		if (this.onInit) this.onInit();
	}
}
export class StyleComponent extends HTMLStyleElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class TableCaptionComponent extends HTMLTableCaptionElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class TableCellComponent extends HTMLTableCellElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class TableColComponent extends HTMLTableColElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class TableComponent extends HTMLTableElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}

export class TableRowComponent extends HTMLTableRowElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class TableSectionComponent extends HTMLTableSectionElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class TemplateComponent extends HTMLTemplateElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
// export class TextareaComponent extends HTMLTextareaElement {
//     constructor() {
//         super();
//     }
// }
export class TimeComponent extends HTMLTimeElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class TitleComponent extends HTMLTitleElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class TrackComponent extends HTMLTrackElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class UListComponent extends HTMLUListElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
export class UnknownComponent extends HTMLUnknownElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}

export class VideoComponent extends HTMLVideoElement {
	constructor() {
		super();
		if (this.onInit) this.onInit();
	}
}
