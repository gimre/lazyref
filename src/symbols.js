
'use strict'

exports = module.exports = [
    'constructor',
    'equals',
    'resolveAs'
].reduce( ( symbols, id ) => Object.assign( symbols, {
    [ id ]: Symbol( id )
} ), { } )
