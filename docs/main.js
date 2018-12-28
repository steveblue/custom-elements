function __decorate(t,e,n,o){var s,i=arguments.length,c=i<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(c=(i<3?s(c):i>3?s(e,n,c):s(e,n))||c);return i>3&&c&&Object.defineProperty(e,n,c),c}const html=(...t)=>t,css=(...t)=>t,noop=()=>{};function compileTemplate(t,e){e.prototype.elementMeta=Object.assign({},t),e.prototype.template=document.createElement("template"),e.prototype.template=`<style>${t.style}</style>${t.template}`}function Component(t){if(t)return e=>(compileTemplate(t,e),e);console.warn("Component must include ElementMeta to compile")}function Listen(t){return function(e,n,o){const{onInit:s=noop,onDestroy:i=noop}=e,c=Symbol(n);e.onInit=function(){s.call(this),function(){const e=this[c]=((...t)=>{o.value.apply(this,t)});this.addEventListener(t,e)}.call(this)},e.onDestroy=function(){i.call(this),function(){this.removeEventListener(t,this[c])}.call(this)}}}function attachShadow(t,e){const n=t.attachShadow(e||{}),o=document.createElement("template");o.innerHTML=t.template,n.appendChild(o.content.cloneNode(!0))}function attachDOM(t,e){const n=document.createElement("template");n.innerHTML=t.elementMeta.template,t.appendChild(n.content.cloneNode(!0))}function attachStyle(t,e){const n=document.createElement("style");n.innerText=t.elementMeta.style,n.innerText=n.innerText.replace(/:host/gi,`[is=${t.elementMeta.selector}]`),document.head.appendChild(n)}function getParent(t){return t.parentNode}function getSiblings(t,e){return e||(e=[]),Array.from(getParent(t).children).filter(t=>"TEXT"!==t.tagName&&"STYLE"!==t.tagName)}function getElementIndex(t){return getSiblings(t).indexOf(t)}class CustomElement extends HTMLElement{constructor(){super(),attachShadow(this,{mode:"open"}),this.onInit&&this.onInit()}}class ButtonComponent extends HTMLButtonElement{constructor(){super(),attachDOM(this),attachStyle(this),this.onInit&&this.onInit()}}class InputComponent extends HTMLInputElement{constructor(){super(),attachStyle(this),this.onInit&&this.onInit()}}let MyButtonComponent=class extends ButtonComponent{constructor(){super()}onClick(t){console.log(this,t)}};__decorate([Listen("click")],MyButtonComponent.prototype,"onClick",null),MyButtonComponent=__decorate([Component({selector:"my-button",template:html`<span>button</span>`,style:css`:host{background:#181818;cursor:pointer;color:#fff;font-weight:400}`})],MyButtonComponent);let MyInputComponent=class extends InputComponent{constructor(){super()}onFocus(t){console.log(this,t),this.value="input"}onBlur(t){console.log(this,t)}};__decorate([Listen("focus")],MyInputComponent.prototype,"onFocus",null),__decorate([Listen("blur")],MyInputComponent.prototype,"onBlur",null),MyInputComponent=__decorate([Component({selector:"my-input",style:css`:host{background:#181818;border:0;color:#fff}`})],MyInputComponent);let MyListComponent=class extends CustomElement{constructor(){super(),this.currentIndex=0}deactivateElement(t){t.setAttribute("tabindex","-1"),t.querySelector("my-item").setAttribute("state","")}activateElement(t){t.setAttribute("tabindex","0"),t.querySelector("my-item").setAttribute("state","--selected")}connectedCallback(){this.setAttribute("tabindex","0")}onFocus(t){for(let t of this.children[0].children)t===this.children[0].children[this.currentIndex]?this.activateElement(t):this.deactivateElement(t),t.addEventListener("click",e=>{getSiblings(t).forEach(t=>{this.deactivateElement(t)}),this.activateElement(t),this.onSubmit(e)})}onKeydown(t){let e=this.querySelector('[tabindex]:not([tabindex="-1"])'),n=getSiblings(e);this.currentIndex=getElementIndex(e),13===t.keyCode&&this.onSubmit(t),38===t.keyCode&&(0===this.currentIndex?this.currentIndex=n.length-1:this.currentIndex-=1,n.forEach(t=>{getElementIndex(t)===this.currentIndex?this.activateElement(t):this.deactivateElement(t)})),40===t.keyCode&&(this.currentIndex===n.length-1?this.currentIndex=0:this.currentIndex+=1,n.forEach(t=>{getElementIndex(t)===this.currentIndex?this.activateElement(t):this.deactivateElement(t)}))}onSubmit(t){console.log(this,t)}};__decorate([Listen("focus")],MyListComponent.prototype,"onFocus",null),__decorate([Listen("keydown")],MyListComponent.prototype,"onKeydown",null),MyListComponent=__decorate([Component({selector:"my-list",template:html`<slot name=menu></slot>`,style:css`:host{display:block;background:#181818;width:200px;height:200px;color:#fff;padding:1em;border-radius:8px}`})],MyListComponent);let MyItemComponent=class extends CustomElement{constructor(){super()}};MyItemComponent=__decorate([Component({selector:"my-item",template:html`<p><span><slot name=msg>item</slot></span></p>`,style:css`:host{display:block;cursor:pointer}:host([state='--selected']){background:#ff69b4;color:#000;font-weight:700}`})],MyItemComponent),customElements.define("my-item",MyItemComponent),customElements.define("my-list",MyListComponent),customElements.define("my-input",MyInputComponent,{extends:"input"}),customElements.define("my-button",MyButtonComponent,{extends:"button"});