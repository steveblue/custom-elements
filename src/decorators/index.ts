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
      (typeof ev === 'string') ? this.target.dispatchEvent(this.events[ev]) : this.target.dispatchEvent(ev);
    }
    public broadcast(ev: Event | string, name?: string) {
      if (typeof ev === 'string') ev = this.events[ev];
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

function compileTemplate(elementMeta: ElementMeta, target: any) {
  target.prototype.elementMeta = Object.assign({}, elementMeta);
  target.prototype.elementMeta.eventMap = {};
  target.prototype.template = document.createElement('template');
  target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
  target.prototype.getEvent = function(eventName: string) { return this.elementMeta.events[eventName]; };
  target.prototype.setEvent = function(eventName: string, eventModel: Event) { return this.elementMeta.events[eventName] = eventModel; };
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
  Component,
  Emitter,
  Listen,
  compileTemplate,
  html,
  css,
  noop,
};
