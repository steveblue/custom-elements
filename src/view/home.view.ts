import { css, html, Component, Listen, CustomElement } from './../index';

@Component({
  selector: 'home-view',
  template: html`
		<h3>Custom Elements</h3>
    <my-list>
        <ul slot="menu">
            <li><my-item><span slot="msg">Make</span></my-item></li>
            <li><my-item><span slot="msg">Custom</span></my-item></li>
            <li><my-item><span slot="msg">Elements</span></my-item></li>
            <li><my-item><span slot="msg">Accessible</span></my-item></li>
        </ul>
    </my-list>
    <br />
    <br />
    <button is="my-button" id="button"></button>
    <input is="my-input" type="text">
    <a href="/chapter-1">Chapter 1</a>
	`,
  style: css`
        button, input {

            color: white;
            font-size: 0.8em;
            padding: 10px;
            box-sizing: border-box;
            text-decoration: none;
            outline: none;
            box-shadow: 0px 0px 0px transparent;
            border: 1px solid transparent;
            border-radius: 4px;
            transition-property: box-shadow, border;
            transition-duration: 300ms;
            transition-timing-function: ease-in-out;

        }

        ul {
            padding: 0;
            margin: 0;
            list-style: none;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
            -webkit-padding-start: 0px;
            -webkit-margin-before: 0px;
            -webkit-margin-after: 0px;
        }

        [tabindex] {
            outline: 1px solid transparent;
            transition-property: box-shadow, border;
            transition-duration: 300ms;
            transition-timing-function: ease-in-out;
        }

        button, input {
            border-radius: 4px;
            outline: none;
            box-shadow: 0px 0px 0px transparent;
            border: 1px solid transparent;
        }

        *:focus, button:focus, input:focus {
            box-shadow: 0px 0px 0px rgba(255,105,180,1);
            outline: 1px solid rgba(255,105,180,1);
        }
        [is=my-button]{background:#181818;cursor:pointer;color:#fff;font-weight:400}
        [is=my-input]{background:#181818;border:0;color:#fff}
	`,
})
class HomeView extends CustomElement {

  constructor() {
    super();
  }

  @Listen('bang')
  public onBang(event) {
		console.log(event);
    //this.get  Attribute('state') === '--selected' ? this.setAttribute('state', '') : this.setAttribute('state', '--selected');
  }

}

customElements.define('home-view', HomeView );

export { HomeView };
