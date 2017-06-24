
'use strict'

const Symbols = require( './symbols' )

const skip = [ 'constructor', 'caller', 'arguments' ]

const equals = function( obj ) {
    const proto = Object.getPrototypeOf( this )
    if( obj[ Symbols.constructor ] === LazyObject ) {
        return obj[ Symbols.equals ]( proto )
    }
    return obj === proto
}

const resolveAs = function( obj ) {
    const proto        = Object( obj )
    const protoCeption = Object.getPrototypeOf( proto )

    Object.setPrototypeOf( this, proto )

    Object.getOwnPropertyNames( protoCeption )
    .filter( k => !~ skip.indexOf( k ) )
    .filter( k => typeof protoCeption[ k ] === 'function' )
    .forEach( prop => this[ prop ] = proto[ prop ].bind( proto ) )
}

exports = module.exports = class LazyObject {
    constructor( Base = Object ) {
        let ref
        if( Base === Function ) {
            ref = function( ) {
                const proto = Object.getPrototypeOf( ref )
                if( typeof proto === 'function' ) {
                    return proto.apply( ref, arguments )
                }
            }
        } else {
            ref = new Base
        }

        ref[ Symbols.constructor ] = LazyObject
        ref[ Symbols.equals ]      = equals
        ref[ Symbols.resolveAs ]   = resolveAs

        return ref
    }
}
