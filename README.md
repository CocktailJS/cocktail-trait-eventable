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

