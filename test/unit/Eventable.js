'use strict';

var chai = require("chai"),
    sinon = require("sinon"),
    sinonChai = require("sinon-chai"),
    expect = chai.expect,
    Cocktail = require('Cocktail'),
    Eventable = require('../../lib/Eventable'),
    EventEmitter = require('events').EventEmitter;

chai.use(sinonChai);

describe('Eventable Trait Unit Test', function(){
    var EventedClass,
        emitter        = new EventEmitter(),
        addListenerSpy = sinon.spy(emitter, 'addListener'),
        emitSpy        = sinon.spy(emitter, 'emit'),
        onSpy          = sinon.spy(emitter, 'on'),
        onceSpy        = sinon.spy(emitter, 'once'),
        removeAllSpy   = sinon.spy(emitter, 'removeAllListeners'),
        removeSpy      = sinon.spy(emitter, 'removeListener');

    EventedClass = Cocktail.mix({
        '@as'     : 'class',
        '@traits' : [Eventable],

        _emitter  : undefined, 

        getEmitter : function() {
            if (!this._emitter) {
                this._emitter = emitter;
            }
            return this._emitter;
        }
    });

    describe('Eventable added as a Trait delegating events.EventEmitter methods', function(){
        var sut = new EventedClass();
        
        it('should expose Eventable methods', function(){
            expect(sut).to.respondTo('addListener');
            expect(sut).to.respondTo('emit');
            expect(sut).to.respondTo('on');
            expect(sut).to.respondTo('once');
            expect(sut).to.respondTo('removeAllListeners');
            expect(sut).to.respondTo('removeListener');
        });

        it('should call `addListener` on the emitter set in the hosting class', function(){
            var eventName = 'name',
                handler   = function (){};
            
            sut.addListener(eventName, handler);
            expect(addListenerSpy).to.be.calledWith(eventName, handler);

        });

        it('should call `emit` on the emitter set in the hosting class', function(){
            var eventName = 'name',
                param = 'param';
            
            sut.emit(eventName, param);
            expect(emitSpy).to.be.calledWith(eventName, param);

        });

        it('should call `on` on the emitter set in the hosting class', function(){
            var eventName = 'name',
                handler   = function (){};
            
            sut.on(eventName, handler);
            expect(onSpy).to.be.calledWith(eventName, handler);

        });

        it('should call `once` on the emitter set in the hosting class', function(){
            var eventName = 'name',
                handler   = function (){};
            
            sut.once(eventName, handler);
            expect(onceSpy).to.be.calledWith(eventName, handler);

        });

        it('should call `removeAllListeners` on the emitter set in the hosting class', function(){
            var eventName = 'name';
            
            sut.removeAllListeners(eventName);
            expect(removeAllSpy).to.be.calledWith(eventName);

        });

        it('should call `removeListener` on the emitter set in the hosting class', function(){
            var eventName = 'name',
                handler   = function (){};
            
            sut.removeListener(eventName, handler);
            expect(removeSpy).to.be.calledWith(eventName, handler);

        });        

    });

    describe('Eventable `addListener` added as a Trait with overriden parameters', function(){
        var sut = new EventedClass();

        it('should accept `addListener({eventName: handlerFn})` and call `emitter.addListener(\'eventName\', handlerFn)`', function(){
            var eventName = 'name',
                handler   = function (){},
                params    = {};

            params[eventName] = handler;

            sut.addListener(params);
            expect(addListenerSpy).to.be.calledWith(eventName, handler);

        });

        it('should accept `addListener({eventName: handlerFn, another: anotherHandlerFn})` ', function(){
            var eventName = 'name',
                another   = 'another',
                handler   = function (){},
                params    = {};

            params[eventName] = handler;
            params[another] = handler;

            sut.addListener(params);
            expect(addListenerSpy).to.be.calledWith(eventName, handler);
            expect(addListenerSpy).to.be.calledWith(another, handler);

        });

        it('should honor scope parameter in options `addListener({eventName: handler, scope: otherScope})`', function(){
            var eventName = 'name',
                handler   = function (){},
                params    = {},
                scope     = {someVar: 1};

            params[eventName] = handler;
            params.scope = scope;

            sut.addListener(params);
            expect(addListenerSpy).to.be.calledWith(eventName, handler);
            expect(addListenerSpy).not.to.be.calledWith('scope', scope);
        });

    });

});