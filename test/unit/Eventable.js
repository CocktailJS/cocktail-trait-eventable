'use strict';

var chai = require("chai"),
    sinon = require("sinon"),
    sinonChai = require("sinon-chai"),
    expect = chai.expect,
    cocktail = require('cocktail'),
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

    EventedClass = cocktail.mix({
        '@as'     : 'class',
        '@traits' : [Eventable],
        '@properties' : {
            emitter: emitter
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

        it('should bind scope to event handler `addListener({eventName: handler, scope: otherScope})`', function(){
            var eventName = 'name',
                handler   = function (){},
                scope     = { scopeVar: 1 },
                params    = {},
                bindSpy   = sinon.spy(handler, "bind");

            params[eventName] = handler;
            params.scope = scope;

            sut.addListener(params);
            
            expect(bindSpy).to.be.calledWith(scope);
            expect(addListenerSpy).not.to.be.calledWith('scope', scope);
        });

    });

    describe('Eventable `on` added as a Trait with overriden parameters', function(){
        var sut = new EventedClass();

        it('should accept `on({eventName: handlerFn})` and call `emitter.on(\'eventName\', handlerFn)`', function(){
            var eventName = 'name',
                handler   = function (){},
                params    = {};

            params[eventName] = handler;

            sut.on(params);
            expect(onSpy).to.be.calledWith(eventName, handler);

        });

        it('should accept `on({eventName: handlerFn, another: anotherHandlerFn})` ', function(){
            var eventName = 'name',
                another   = 'another',
                handler   = function (){},
                params    = {};

            params[eventName] = handler;
            params[another] = handler;

            sut.on(params);
            expect(onSpy).to.be.calledWith(eventName, handler);
            expect(onSpy).to.be.calledWith(another, handler);

        });

        it('should bind scope to event handler `on({eventName: handler, scope: otherScope})`', function(){
            var eventName = 'name',
                handler   = function (){},
                scope     = { scopeVar: 1 },
                params    = {},
                bindSpy   = sinon.spy(handler, "bind");

            params[eventName] = handler;
            params.scope = scope;

            sut.on(params);
            
            expect(bindSpy).to.be.calledWith(scope);
            expect(addListenerSpy).not.to.be.calledWith('scope', scope);
        });

    });

    describe('Eventable `once` added as a Trait with overriden parameters', function(){
        var sut = new EventedClass();

        it('should accept `once({eventName: handlerFn})` and call `emitter.once(\'eventName\', handlerFn)`', function(){
            var eventName = 'name',
                handler   = function (){},
                params    = {};

            params[eventName] = handler;

            sut.once(params);
            expect(onceSpy).to.be.calledWith(eventName, handler);

        });

        it('should accept `once({eventName: handlerFn, another: anotherHandlerFn})` ', function(){
            var eventName = 'name',
                another   = 'another',
                handler   = function (){},
                params    = {};

            params[eventName] = handler;
            params[another] = handler;

            sut.once(params);
            expect(onceSpy).to.be.calledWith(eventName, handler);
            expect(onceSpy).to.be.calledWith(another, handler);

        });

        it('should bind scope to event handler `once({eventName: handler, scope: otherScope})`', function(){
            var eventName = 'name',
                handler   = function (){},
                scope     = { scopeVar: 1 },
                params    = {},
                bindSpy   = sinon.spy(handler, "bind");

            params[eventName] = handler;
            params.scope = scope;

            sut.once(params);
            
            expect(bindSpy).to.be.calledWith(scope);
            expect(addListenerSpy).not.to.be.calledWith('scope', scope);
        });

    });

    describe('Eventable `removeListener` added as a Trait with overriden parameters', function(){
        var sut = new EventedClass();

        it('should accept `removeListener({eventName: handlerFn})` and call `emitter.removeListener(\'eventName\', handlerFn)`', function(){
            var eventName = 'name',
                handler   = function (){},
                params    = {};

            params[eventName] = handler;

            sut.removeListener(params);
            expect(removeSpy).to.be.calledWith(eventName, handler);

        });

        it('should accept `removeListener({eventName: handlerFn, another: anotherHandlerFn})` ', function(){
            var eventName = 'name',
                another   = 'another',
                handler   = function (){},
                params    = {};

            params[eventName] = handler;
            params[another] = handler;

            sut.removeListener(params);
            expect(removeSpy).to.be.calledWith(eventName, handler);
            expect(removeSpy).to.be.calledWith(another, handler);

        });

    });
});