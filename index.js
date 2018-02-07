function makeBehaviorSubject( initial ) {
  let sinks = [];
  let last = initial;

  return ( type, data ) => {
    if ( type === 0 ) {
      sinks.push( data );

      data( 0, ( t, d ) => {
        if ( t === 2 ) {
          const i = sinks.indexOf( data );
          if ( i > -1 ) sinks.splice( i, 1 );
        }
      });

      data( 1, last );
    }
    else {
      if ( type === 1 ) {
        last = data;
      }

      for ( let i = 0, n = sinks.length; i < n; i++ ) {
        sinks[i]( type, data );
      }
    }
  }
}

module.exports = makeBehaviorSubject;
