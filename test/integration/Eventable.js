'use strict';

var chai = require("chai"),
    expect = chai.expect,
    cocktail = require('cocktail'),
    Eventable = require('../../lib/Eventable'),
    EventEmitter = require('events').EventEmitter;


describe('Eventable Trait Integration Test', function(){
    var EventedClass,
        emitter = new EventEmitter();

    EventedClass = cocktail.mix({
        '@as'     : 'class',
        '@traits' : [Eventable],
        '@properties' : {
            emitter: emitter
        }
    });

    describe('Add handlers in Object keys with handlers', function(){
        var sut     = new EventedClass(),
            emitter = sut.getEmitter();

        it('should add listeners to the emitter', function(){
            sut.on({
                'event': function(){}
            });
            expect(emitter.listeners('event')).to.have.length(1);

            emitter.removeAllListeners();
            expect(emitter.listeners('event')).to.have.length(0);
        });

        it('should remove listeners to the emitter', function(){
            var oneEvent = {
                'event': function(){}
            };

            sut.on(oneEvent);
            expect(emitter.listeners('event')).to.have.length(1);

            sut.removeListener(oneEvent);
            expect(emitter.listeners('event')).to.have.length(0);
        });


        it('should add listeners to the emitter with scope', function(){
            sut.on({
                'event': function(){},
                scope  : {a: 1}
            });
            expect(emitter.listeners('event')).to.have.length(1);

            emitter.removeAllListeners();
            expect(emitter.listeners('event')).to.have.length(0);
        });

        it('should remove listeners from the emitter with scope', function(){
            var oneEvent = {
                'event': function(){},
                scope  : {a: 1}
            };

            sut.on(oneEvent);
            expect(emitter.listeners('event')).to.have.length(1);

            sut.removeListener(oneEvent);
            expect(emitter.listeners('event')).to.have.length(0);
        });

        it('should not add any event if the config object is {}', function(){
            var oneEvent = {};

            sut.on(oneEvent);
            expect(emitter.listeners()).to.have.length(0);
        });

        it('should not add any event if the config object has not its own properties', function(){
            var OneEvent = function(){},
                oneEvent;

            OneEvent.prototype.eventName = "something";

            oneEvent = new OneEvent();

            sut.on(oneEvent);
            expect(emitter.listeners()).to.have.length(0);
        });


    });


});