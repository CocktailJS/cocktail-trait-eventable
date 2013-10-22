# Eventable
## A [CocktailJS](http://cocktailjs.github.io) Trait Extension

A trait to use an Emitter as a delegate.

### Install

````bash
npm install cocktail-trait-eventable --save
````

### Trait requires (glue code)

A `getEmitter` method is required as a **glue code** for this trait.

`getEmitter()`: should return an EventEmitter instance or any other object with the same api as node `events.EventEmitter` class.

### Usage

MyClass.js

````javascript
var Cocktail     = require('Cocktail'),
    Eventable    = require('Eventable'),
    EventEmitter = require('events').EventEmitter;

Cocktail.mix({
    '@exports': module
    '@as'     : 'class',

    '@traits' : [Eventable],

    _emitter : new EventEmitter(),

    // glue code for Eventable Trait
    getEmitter: function() {
        return this._emitter;
    },

    doSomethingAndFireEvent: function(){
        // ... do something here
        // and
        // now fire an event 'firing'
        this.emit('firing', this);
    }
});
````

And then in your index you can do:

index.js

````javascript

var MyClass = require('./MyClass'),
    obj;

obj = new MyClass();

//we can call `on`  or `addListener` here since our MyClass is Eventable
obj.on('firing', function(){ console.log('Event Fired!'); });

obj.doSomethingAndFireEvent();
````

### API

The follwing methods will be publicly available on the host class:

- `addListener(eventName, handler)`: Adds a listener to the end of the listeners array for the specified event.
    - **eventName**: {String} the event name to be listened to.
    - **handler**: {Function} the event handler.
- `emit(eventName, arg1, arg2, ..., argN)`: Execute each of the listeners in order with the supplied arguments.
    - **eventName**: {String} the event name to be listened to.
    - **arg1..N**: {Any} arguments to be passed as parameters in the event handler.
- `on(eventName, handler)`: Idem `addListener` method.
- `once(eventName, handler)`: Adds a one time event listener.
    - **eventName**: {String} the event name to be listened to.
    - **handler**: {Function} the event handler.
- `removeListener(eventName, handler)`: Removes the given handler for the event.
    - **eventName**: {String} the event name.
    - **handler**: {Function} the event handler.
- `removeAllListeners(eventName)`: Remove all listeners for the given event.
    - **eventName**: {String} the event name.

