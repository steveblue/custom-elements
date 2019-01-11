interface EventMeta {
  key: string;
  handler: Function;
};

interface ElementMeta {
  selector: string;
  style?: string;
  template?: string;
  eventMap?: any;
};

const TEMPLATE_BIND_REGEX = /\{\{(\s*)(.*?)(\s*)\}\}/g;
const BIND_SUFFIX = ' __state';

const html = (...args) => {
  return args;
};

const css = (...args) => {
  return args;
};

// tslint:disable-next-line
const noop = () => {};

class EventDispatcher {
    public target: Element;
    public events: {
      [key: string]: CustomEvent
    };
    public channels: {
      [key: string]: BroadcastChannel
    };
    constructor(context) {
      this.target = context;
			this.channels = {
        'default': new BroadcastChannel('default')
      };
      this.events = {};
    }
    public get(eventName: string) {
      return this.events[eventName];
    }
    public set(eventName: string, ev: CustomEvent | Event) {
      this.events[eventName] = ev;
      return this.get(eventName);
    }
    public emit(ev: Event | string) {
      if (typeof ev === 'string') ev = this.events[ev];
      this.target.dispatchEvent(ev);
    }
    public broadcast(ev: Event | string, name?: string) {
      if (typeof ev === 'string') ev = this.events[ev];
      this.target.dispatchEvent(ev);

      ev = { type: ev.type, detail: ev.detail };
      if (ev.detail === null) delete ev.detail;

      (name) ? this.channels[name].postMessage(ev) : this.channels['default'].postMessage(ev);
    }
    public setChannel(name: string) {
      this.channels[name] = new BroadcastChannel(name);
    }
    public removeChannel(name: string) {
      this.channels[name].close();
      delete this.channels[name];
    }
}

class BoundNode {
  constructor (node) {
    this.template = node.innerHTML;
    this.node = node;
  }
  update(data) {
    let tempTemplate = this.template.slice(0);
    this.node.innerHTML = tempTemplate.replace(TEMPLATE_BIND_REGEX, (match, variable) => {
      return data.elementMeta.boundState['model' + BIND_SUFFIX][/\{\{(\s*)(.*?)(\s*)\}\}/.exec(match)[2].split('.').join('__')+ ' __'] || '';
    });
  }

}

class BoundModel {
  constructor () {
    const callbacks = [];
    const data = {
      onUpdate: function onUpdate(fn) {
        callbacks.push(fn);
      }
    };
    const proxy = new Proxy(data, {
      set: function (target, property, value) {
        target[property] = value;
        callbacks.forEach((callback) => callback());
        return true
      }
    });
    return proxy;
  }
}

function bindTemplate() {
  if (!this.elementMeta) this.elementMeta = {};
  this.elementMeta.templateRegex = TEMPLATE_BIND_REGEX;
  this.elementMeta.boundState = {
      ['node' + BIND_SUFFIX]: new BoundNode(this),
      ['model' + BIND_SUFFIX]: new BoundModel()
  }
  this.elementMeta.boundState['model' + BIND_SUFFIX].onUpdate(()=>{
      this.elementMeta.boundState['node' + BIND_SUFFIX].update(this);
  });
}

function setState(state: string, model: any) {
  this.elementMeta.boundState['model' + BIND_SUFFIX][state.replace(/\./g, '__')+ ' __'] = model ? model : this[state];
}

function compileTemplate(elementMeta: ElementMeta, target: any) {
  target.prototype.elementMeta = Object.assign({}, elementMeta);
  target.prototype.elementMeta.eventMap = {};
  target.prototype.template = document.createElement('template');
  target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
  target.prototype.getChildNodes = getChildNodes;
  target.prototype.bindTemplate = bindTemplate;
  target.prototype.setState = setState;
}

function getChildNodes() {
    function getChildren(node: Element, path: Element[] = [], result: Element[] = []){
        if(!node.children.length)
            result.push(path.concat(node));
        for(const child of node.children)
            getChildren(child, path.concat(child), result);
        return result;
    }
   const nodes : Element[] = getChildren(this, []).reduce((nodes, curr) => {
     return nodes.concat(curr);
   },[]);
   return nodes.filter((item, index) => { return nodes.indexOf(item) >= index; });
}

function bindTemplateNodes() {
  if (!this.elementMeta) this.elementMeta = {};
   this.elementMeta.boundNodes = this.getChildNodes()
  .map((node: Element) => {
    if (!node.elementMeta) node.elementMeta = {};
    node.elementMeta.templateRegex = TEMPLATE_BIND_REGEX;
    node.elementMeta.boundState = {
        ['node' + BIND_SUFFIX]: new BoundNode(node),
        ['model' + BIND_SUFFIX]: new BoundModel()
    }
    node.elementMeta.boundState['model' + BIND_SUFFIX].onUpdate(()=>{
      node.elementMeta.boundState['node' + BIND_SUFFIX].update(node);
    });
    node.setState = setState;
    return node;
  });

}

function Component(attributes: ElementMeta) {
  if (!attributes) {
    console.error('Component must include ElementMeta to compile');
    return;
  }
  return (target: any) => {
    compileTemplate(attributes, target);
    return target;
  };
}

function Emitter(eventName: string, options: Event) {

  return function decorator(target: any, key: string | symbol, descriptor: PropertyDescriptor) {

      const { onInit = noop } = target;

      function addEvent() {
        if (!this.emitter) {
          this.emitter = new EventDispatcher(this);
        }
        this.emitter.set(eventName, new CustomEvent(eventName, options ? options : {}));
      }

      target.onInit = function onInitWrapper() {
        onInit.call(this);
        addEvent.call(this);
      };
  };
}

function Listen(eventName: string, channelName?: string) {
  return function decorator(target: any, key: string | symbol, descriptor: PropertyDescriptor) {

      const { onInit = noop, onDestroy = noop } = target;
      const symbolHandler = Symbol(key);

      function addListener() {
        const handler = this[symbolHandler] = (...args) => {
          descriptor.value.apply(this, args);
        };
        if (!this.emitter) {
          this.emitter = new EventDispatcher(this);
          if (channelName) {
            this.elementMeta.eventMap[eventName] = {
              key: eventName,
              handler: key
            }
            this.emitter.channels[channelName].onmessage = (ev) => {
              this[this.elementMeta.eventMap[eventName].handler](ev.data);
            }
          }
        }
        this.addEventListener(eventName, handler);
      }

      function removeListener() {
        this.removeEventListener(eventName, this[symbolHandler]);
      }

      target.onInit = function onInitWrapper() {
        onInit.call(this);
        addListener.call(this);
      };

      target.onDestroy = function onDestroyWrapper() {
        onDestroy.call(this);
        removeListener.call(this);
      };

  };
}

export {
  ElementMeta,
  EventDispatcher,
  BoundNode,
  BoundModel,
  Component,
  Emitter,
  Listen,
  compileTemplate,
  html,
  css,
  noop,
};
