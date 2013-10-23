'use strict';


var cocktail = require('cocktail');

cocktail.mix({
    '@exports'  : module,

    '@requires' : [
        /**
         * @requires getEmitter {Function}
         * This should return an instance of events.EventEmitter or
         * any other object with the same api
         */
        'getEmitter'
    ],


    _splitOptions: function(options, fn) {
        var key, eventName, handler, scope;

        scope = options.scope;
        delete options.scope;

        for (key in options) {
            if (options.hasOwnProperty(key)) {
                eventName = key;
                handler = options[key];

                if(scope){
                    handler.bind(scope);
                }

                fn.call(this, eventName, handler);
            }
        }

    },

    addListener: function(eventName, handler) {
        var emitter = this.getEmitter();

        if (eventName && typeof eventName !== 'string') {
            this._splitOptions(eventName, this.addListener);
        } else {
            emitter.addListener(eventName, handler);
        }

    },

    emit: function() {
        var emitter = this.getEmitter();

        emitter.emit.apply(emitter, arguments);       
    },

    on: function(eventName, handler) {
        var emitter = this.getEmitter();

        if (eventName && typeof eventName !== 'string') {
            this._splitOptions(eventName, this.on);
        } else {
            emitter.on(eventName, handler);
        }
    },

    once: function() {
        var emitter = this.getEmitter();

        emitter.once.apply(emitter, arguments);
    },

    removeAllListeners: function() {
        var emitter = this.getEmitter();

        emitter.removeAllListeners.apply(emitter, arguments);        
    },

    removeListener: function() {
        var emitter = this.getEmitter();

        emitter.removeListener.apply(emitter, arguments);        
    }    
});
