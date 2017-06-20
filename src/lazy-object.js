
'use strict'

const skip = [ 'constructor', 'caller', 'arguments' ]

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
        this.resolveAs = resolveAs
    }
}

exports = module.exports = { LazyObject }