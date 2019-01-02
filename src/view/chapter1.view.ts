import { XComponent, XCustomElement, html, css } from './../index';

@XComponent({
	selector: 'chapter1-view',
	template: html`
		<h3>Chapter 1</h3>
		<a href="/">Home</a>
	`,
	style: css`

	`,
})
class ChapterOneView extends XCustomElement {

	constructor() {
		super();
	}

}

customElements.define('chapter1-view', ChapterOneView );

export { ChapterOneView };
