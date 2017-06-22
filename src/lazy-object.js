
'use strict'

const originalConstructor = Symbol( 'equals' )
const skip = [ 'constructor', 'caller', 'arguments' ]

const equals = function( obj ) {
    const proto = Object.getPrototypeOf( this )
    if( obj[ originalConstructor ] === LazyObject ) {
        return obj.equals( proto )
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

class LazyObject {
    constructor( Base = Object ) {
        let ref
        if( Base === Function ) {
            ref = function( ) {
                const proto = Object.getPrototypeOf( ref )
                if( typeof proto === 'function' ) {
                    proto.call( ref, arguments )
                }
            }
        } else {
            ref = new Base
        }

        ref[ originalConstructor ] = LazyObject
        ref.equals                 = equals
        ref.resolveAs              = resolveAs

        return ref
    }
}

exports = module.exports = { LazyObject }