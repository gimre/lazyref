# lazyref

Lazy, shape-shifting object references for metaprogramming

## installation
```npm install lazyref```

## usage
```javascript
const { LazyObject, Symbols } = require( 'lazyref' )
const { equals, resolveAs }   = Symbols

const obj = new LazyObject

obj[ resolveAs ]( false )
console.log( obj instanceof Boolean )
// true

obj[ resolveAs ]( 2 )
console.log( obj instanceof Number, obj + 3 )
// true 5

obj[ resolveAs ]( 'world' )
console.log( obj instanceof String, obj.concat( ' world' ) )
// true "hello world"

obj[ resolveAs ]( [ 1, 2, 3 ] )
console.log( obj instanceof Array, obj.map( n => n ** 2 ) )
// true [ 1, 4, 9 ]

obj[ resolveAs ]( { works: 'yes' } )
console.log( obj instanceof Object, obj.works )
// true "yes"

obj[ resolveAs ]( what => what + ' is so meta' )
console.log( obj instanceof Function, obj.call( null, 'this' ) )
// true "this is so meta"
```
LazyObject exposes its own methods via ```Symbol```s to prevent clashing with the resolved object's own properties

## specify a base
If you know the object type you will resolve to beforehand, you can also pass a base class to the constructor ( default is ```Object``` ) - this will also pass ```typeof``` checks
``` javascript
const o = new LazyObject( Function )
o[ resolveAs ]( hey => hey + ' there' )

console.log( typeof o, o( 'hey' ) )
// function "hey there"
```

## equality check
```javascript
const fs = require( 'fs' )

const o = new LazyObject
const q = new LazyObject

console.log( o[ equals ]( q ) )
//false

o[ resolveAs ]( fs )
console.log( o[ equals ]( fs ) )
// true

q[ resolveAs ]( fs )
console.log( o[ equals ]( q ) )
// true
```