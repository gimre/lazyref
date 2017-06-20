
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
    constructor( ) {
        this[ originalConstructor ] = LazyObject
        this.equals    = equals
        this.resolveAs = resolveAs
    }
}

exports = module.exports = { LazyObject }