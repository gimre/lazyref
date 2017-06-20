# lazyref

Lazy object references for easier metaprogramming

## installation
```npm install lazyref```

## usage
```javascript
const { LazyObject } = require( 'lazyref' )

const obj = new LazyObject

obj.resolveAs( 2 )
console.log( obj instanceof Number, obj + 3 ) // true, 5

obj.resolveAs( 'world' )
console.log( obj instanceof String, obj.concat( ' world' ) ) // true "hello world"

obj.resolveAs( [ 1, 2, 3 ] )
console.log( obj instanceof Array, obj.map( n => n ** 2 ) ) // true [ 1, 4, 9 ]

obj.resolveAs( function( what ) { return what + ' is so meta' } )
console.log( obj instanceof Function, obj.call( null, 'this' ) ) // true "this is so meta"
```