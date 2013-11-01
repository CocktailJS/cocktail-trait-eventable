[![Build Status](https://travis-ci.org/CocktailJS/cocktail-trait-eventable.png?branch=master)](https://travis-ci.org/CocktailJS/cocktail-trait-eventable)
[![NPM version](https://badge.fury.io/js/cocktail-trait-eventable.png)](http://badge.fury.io/js/cocktail-trait-eventable)

# cocktail-trait-eventable
## A [CocktailJS](http://cocktailjs.github.io) Trait Extension

A trait to use an Emitter as a delegate.

### Install

````bash
npm install cocktail --save
npm install cocktail-trait-eventable --save
````

### Trait requires (glue code)

A `getEmitter` method is required as a **glue code** for this trait.

`getEmitter()`: should return an EventEmitter instance or any other object with the same api as node `events.EventEmitter` class.

### Usage

MyClass.js

````javascript
var cocktail     = require('cocktail'),
    Eventable    = require('cocktail-trait-eventable'),
    EventEmitter = require('events').EventEmitter;

cocktail.mix({
    '@exports': module,
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

The following methods will be publicly available on the host class:

- `addListener(eventName, handler)`: Adds a listener to the end of the listeners array for the specified event.
    - **eventName**: {String} the event name to be listened to.
    - **handler**: {Function} the event handler.

````javascript
    myObj.addListener('event', function(){/*handler*/});
````

- `addListener(options)`: Adds a listener to the end of the listeners array for the specified event.
    - **options**: {Object} an object containing value-pairs of event name and handler and an optional scope.

````javascript
    myObj.addListener({event: myObj.onEvent, scope: myObj});
````

- `emit(eventName, arg1, arg2, ..., argN)`: Execute each of the listeners in order with the supplied arguments.
    - **eventName**: {String} the event name to be listened to.
    - **arg1..N**: {Any} arguments to be passed as parameters in the event handler.

````javascript
    myObj.emit('event', myObj, true, 1, 'another param');
````

- `on(eventName, handler)`: Idem `addListener` method.
- `on(options)`: Idem `addListener` method.

- `once(eventName, handler)`: Adds a one time event listener.
    - **eventName**: {String} the event name to be listened to.
    - **handler**: {Function} the event handler.

````javascript
    myObj.once('event', function(){/*handler*/});
````

- `once(options)`: Adds a one time event listener.
    - **options**: {Object} an object containing value-pairs of event name and handler and an optional scope.

````javascript
    myObj.once({event: myObj.onEvent, scope: myObj});
````

- `removeListener(eventName, handler)`: Removes the given handler for the event.
    - **eventName**: {String} the event name.
    - **handler**: {Function} the event handler.

````javascript
    myObj.removeListener('event', funcHandler);
````

- `removeListener(options)`: Removes the given handler for the event.
    - **options**: {Object} an object containing value-pairs of event name and handler.

````javascript
    myObj.removeListener({event: myObj.onEvent});
````

- `removeAllListeners(eventName)`: Remove all listeners for the given event.
    - **eventName**: {String} the event name.

````javascript
    myObj.removeAllListeners();
````
