import { Component, Emitter, Listen, html, css, querySelectorAll, CustomElement } from './../index';

@Component({
	selector: 'chapter1-view',
	template: html`
		<h3>Chapter 1</h3>
		<a href="/">Home</a>
	`,
	style: css`

	`,
})
class ChapterOneView extends CustomElement {

	constructor() {
		super();
	}

}

customElements.define('chapter1-view', ChapterOneView );

export { ChapterOneView };