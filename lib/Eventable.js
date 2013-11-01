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


    /**
     * @private
     */
    _$$splitOptions$$: function(options, fn) {
        var key, eventName, handler, scope;

        scope = options.scope;
        delete options.scope; //delete scope so we don't have to ask for that key

        for (key in options) {
            if (options.hasOwnProperty(key)) {
                eventName = key;
                handler = options[key] = (scope) ? options[key].bind(scope) : options[key];

                fn.call(this, eventName, handler);
            }
        }

    },

    /**
     * @public
     * @method addListener
     * @param eventName {String|Object} the event name or the @config object
     * @param handler {Function} event handler
     *
     * @config {Object} an object with key as event name and value as the event handler.
     *         The special case is key `scope` which defines the scope where the listeners will be bound.
     */
    addListener: function(eventName, handler) {
        var emitter = this.getEmitter();

        if (eventName && typeof eventName !== 'string') {
            this._$$splitOptions$$(eventName, this.addListener);
        } else {
            emitter.addListener(eventName, handler);
        }

    },

    emit: function() {
        var emitter = this.getEmitter();

        emitter.emit.apply(emitter, arguments);       
    },

    /**
     * @public
     * @method on
     * @param eventName {String|Object} the event name or the @config object
     * @param handler {Function} event handler
     *
     * @config {Object} an object with key as event name and value as the event handler.
     *         The special case is key `scope` which defines the scope where the listeners will be bound.
     */
    on: function(eventName, handler) {
        var emitter = this.getEmitter();

        if (eventName && typeof eventName !== 'string') {
            this._$$splitOptions$$(eventName, this.on);
        } else {
            emitter.on(eventName, handler);
        }
    },

    /**
     * @public
     * @method once
     * @param eventName {String|Object} the event name or the @config object
     * @param handler {Function} event handler
     *
     * @config {Object} an object with key as event name and value as the event handler.
     *         The special case is key `scope` which defines the scope where the listeners will be bound.
     */
    once: function(eventName, handler) {
        var emitter = this.getEmitter();

        if (eventName && typeof eventName !== 'string') {
            this._$$splitOptions$$(eventName, this.once);
        } else {
            emitter.once(eventName, handler);
        }
    },

    removeAllListeners: function() {
        var emitter = this.getEmitter();

        emitter.removeAllListeners.apply(emitter, arguments);        
    },

    /**
     * @public
     * @method removeListener
     * @param eventName {String|Object} the event name or the @config object
     * @param handler {Function} event handler
     *
     * @config {Object} an object with key as event name and value as the event handler.
     */
    removeListener: function(eventName, handler) {
        var emitter = this.getEmitter();

        if (eventName && typeof eventName !== 'string') {
            //scope should not be used, just deleting to reuse the same object to add and remove listeners
            delete eventName.scope;
            this._$$splitOptions$$(eventName, this.removeListener);
        } else {
            emitter.removeListener(eventName, handler);
        }
    }    
});
