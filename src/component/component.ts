import { attachDOM, attachStyle, attachShadow } from './../decorators/component';

export class CustomElement extends HTMLElement {
    constructor() {
        super();
        attachShadow(this);
    }
}

export class AllCollectionComponent extends HTMLAllCollection {
    constructor() {
        super();
    }
}
export class AnchorComponent extends HTMLAnchorElement {
    constructor() {
        super();
    }
}
export class AreaComponent extends HTMLAreaElement {
    constructor() {
        super();
    }
}
export class AudioComponent extends HTMLAudioElement {
    constructor() {
        super();
    }
}
export class BRComponent extends HTMLBRElement {
    constructor() {
        super();
    }
}
export class BodyComponent extends HTMLBodyElement {
    constructor() {
        super();
        attachShadowDOM(this);
    }
}
export class ButtonComponent extends HTMLButtonElement {
    constructor() {
        super();
        attachDOM(this);
		    attachStyle(this);
    }
	connectedCallback() {
		this.addEventListener('click', this.onClick);
	}
}
export class CanvasComponent extends HTMLCanvasElement {
    constructor() {
        super();
    }
}
export class CollectionComponent extends HTMLCollection {
    constructor() {
        super();
    }
}
export class ContentComponent extends HTMLContentElement {
    constructor() {
        super();
    }
}
export class DListComponent extends HTMLDListElement {
    constructor() {
        super();
    }
}
export class DataComponent extends HTMLDataElement {
    constructor() {
        super();
    }
}
export class DataListComponent extends HTMLDataListElement {
    constructor() {
        super();
    }
}
export class DetailsComponent extends HTMLDetailsElement {
    constructor() {
        super();
    }
}
export class DialogComponent extends HTMLDialogElement {
    constructor() {
        super();
    }
}
export class DirectoryComponent extends HTMLDirectoryElement {
    constructor() {
        super();
    }
}
export class DivComponent extends HTMLDivElement {
    constructor() {
        super();
        attachShadowDOM(this);
    }
}
// export class DocumentComponent extends HTMLDocumentElement {
//     constructor() {
//         super();
//         attachShadowDOM(this);
//     }
// }
export class EmbedComponent extends HTMLEmbedElement {
    constructor() {
        super();
    }
}
export class FieldSetComponent extends HTMLFieldSetElement {
    constructor() {
        super();
    }
}
export class FontComponent extends HTMLFontElement {
    constructor() {
        super();
    }
}
export class FormControlsComponent extends HTMLFormControlsCollection {
    constructor() {
        super();
    }
}
export class FormComponent extends HTMLFormElement {
    constructor() {
        super();
    }
}
export class FrameComponent extends HTMLFrameElement {
    constructor() {
        super();
    }
}
export class FrameSetComponent extends HTMLFrameSetElement {
    constructor() {
        super();
    }
}
export class HRComponent extends HTMLHRElement {
    constructor() {
        super();
    }
}
export class HeadComponent extends HTMLHeadElement {
    constructor() {
        super();
    }
}
export class HeadingComponent extends HTMLHeadingElement {
    constructor() {
        super();
        attachShadowDOM(this);
    }
}
export class HtmlComponent extends HTMLHtmlElement {
    constructor() {
        super();
    }
}
export class IFrameComponent extends HTMLIFrameElement {
    constructor() {
        super();
    }
}
export class ImageComponent extends HTMLImageElement {
    constructor() {
        super();
    }
}
export class InputComponent extends HTMLInputElement {
    constructor() {
        super();
    }
}
export class LIComponent extends HTMLLIElement {
    constructor() {
        super();
    }
}
export class LabelComponent extends HTMLLabelElement {
    constructor() {
        super();
    }
}
export class LegendComponent extends HTMLLegendElement {
    constructor() {
        super();
    }
}
export class LinkComponent extends HTMLLinkElement {
    constructor() {
        super();
    }
}
export class MapComponent extends HTMLMapElement {
    constructor() {
        super();
    }
}
export class MarqueeComponent extends HTMLMarqueeElement {
    constructor() {
        super();
    }
}
export class MediaComponent extends HTMLMediaElement {
    constructor() {
        super();
    }
}
export class MenuComponent extends HTMLMenuElement {
    constructor() {
        super();
    }
}
export class MetaComponent extends HTMLMetaElement {
    constructor() {
        super();
    }
}
export class MeterComponent extends HTMLMeterElement {
    constructor() {
        super();
    }
}
export class ModComponent extends HTMLModElement {
    constructor() {
        super();
    }
}
export class OListComponent extends HTMLOListElement {
    constructor() {
        super();
    }
}
export class ObjectComponent extends HTMLObjectElement {
    constructor() {
        super();
    }
}
export class OptGroupComponent extends HTMLOptGroupElement {
    constructor() {
        super();
    }
}
export class OptionComponent extends HTMLOptionElement {
    constructor() {
        super();
    }
}
export class OptionsCollectionComponent extends HTMLOptionsCollection {
    constructor() {
        super();
    }
}
export class OutputComponent extends HTMLOutputElement {
    constructor() {
        super();
    }
}
export class ParagraphComponent extends HTMLParagraphElement {
    constructor() {
        super();
        attachShadowDOM(this);
    }
}
export class ParamComponent extends HTMLParamElement {
    constructor() {
        super();
    }
}
export class PictureComponent extends HTMLPictureElement {
    constructor() {
        super();
    }
}
export class PreComponent extends HTMLPreElement {
    constructor() {
        super();
    }
}
export class ProgressComponent extends HTMLProgressElement {
    constructor() {
        super();
    }
}
export class QuoteComponent extends HTMLQuoteElement {
    constructor() {
        super();
    }
}
export class ScriptComponent extends HTMLScriptElement {
    constructor() {
        super();
    }
}
export class SelectComponent extends HTMLSelectElement {
    constructor() {
        super();
    }
}
export class ShadowComponent extends HTMLShadowElement {
    constructor() {
        super();
    }
}
export class SlotComponent extends HTMLSlotElement {
    constructor() {
        super();
    }
}
export class SourceComponent extends HTMLSourceElement {
    constructor() {
        super();
    }
}
export class SpanComponent extends HTMLSpanElement {
    constructor() {
        super();
        attachShadowDOM(this);
    }
}
export class StyleComponent extends HTMLStyleElement {
    constructor() {
        super();
    }
}
export class TableCaptionComponent extends HTMLTableCaptionElement {
    constructor() {
        super();
    }
}
export class TableCellComponent extends HTMLTableCellElement {
    constructor() {
        super();
    }
}
export class TableColComponent extends HTMLTableColElement {
    constructor() {
        super();
    }
}
export class TableComponent extends HTMLTableElement {
    constructor() {
        super();
    }
}

export class TableRowComponent extends HTMLTableRowElement {
    constructor() {
        super();
    }
}
export class TableSectionComponent extends HTMLTableSectionElement {
    constructor() {
        super();
    }
}
export class TemplateComponent extends HTMLTemplateElement {
    constructor() {
        super();
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
    }
}
export class TitleComponent extends HTMLTitleElement {
    constructor() {
        super();
    }
}
export class TrackComponent extends HTMLTrackElement {
    constructor() {
        super();
    }
}
export class UListComponent extends HTMLUListElement {
    constructor() {
        super();
    }
}
export class UnknownComponent extends HTMLUnknownElement {
    constructor() {
        super();
    }
}

export class VideoComponent extends HTMLVideoElement {
    constructor() {
        super();
    }
}