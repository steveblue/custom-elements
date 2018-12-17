import { Component, html, css, getSiblings, getElementIndex } from "../../../decorators/component";
import { CustomElement } from './../../../component/component';

@Component({
		selector: 'my-list',
    template: html`
      <slot name="menu"></slot>
    `,
		style: css`
		 :host {
        display: block;
				background: rgba(24,24,24,1.0);
        width: 200px;
        height: 200px;
        color: white;
        padding: 1em;
        border-radius: 8px;
		  }

		`
})
class MyListComponent extends CustomElement {
	constructor() {
		super();
    this.currentIndex = 0;
	}

  getSelected() {
    return
  }

  deactivateElement(elem: HTMLElement) {
    elem.setAttribute('tabindex', '-1');
    elem.querySelector('my-item').setAttribute('state', '');
  }

  activateElement(elem: HTMLElement) {
      elem.setAttribute('tabindex', '0');
      elem.querySelector('my-item').setAttribute('state', '--selected');
  }

  connectedCallback() {
    this.setAttribute('tabindex', '0');
    this.addEventListener('keydown', (ev: KeyboardEvent) => {
      let currentElement = this.querySelector('[tabindex]:not([tabindex="-1"])');
      let siblings = getSiblings(currentElement);
      this.currentIndex = getElementIndex(currentElement);
      if (ev.keyCode === 38) { // up
        if (this.currentIndex === 0) {
          this.currentIndex = siblings.length - 1;
        } else {
          this.currentIndex -= 1;
        }
        siblings.forEach((elem: HTMLElement) => {
            if (getElementIndex(elem) === this.currentIndex) {
                this.activateElement(elem);
            } else {
                this.deactivateElement(elem);
            }
        });
      }
      if (ev.keyCode === 40) { // down
        if (this.currentIndex === siblings.length - 1) {
          this.currentIndex = 0;
        } else {
          this.currentIndex += 1;
        }
        siblings.forEach((elem: HTMLElement) => {
            if (getElementIndex(elem) === this.currentIndex) {
               this.activateElement(elem);
            } else {
               this.deactivateElement(elem);
            }
        });
      }
    });
    this.addEventListener('focus', (ev: FocusEvent) => {
      for (let li of this.children[0].children) {
        if (li === this.children[0].children[this.currentIndex]) {
          this.activateElement(li);
        } else {
          this.deactivateElement(li);
        }
        li.addEventListener('click', (ev: MouseEvent) => {
            getSiblings(li).forEach((elem: HTMLElement) => {
              this.deactivateElement(elem);
            })
            this.activateElement(li);
        });
      }

    })


  }
}


export { MyListComponent }