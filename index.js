function makeBehaviorSubject( initial ) {
  let sinks = [];
  let last = initial;

  return ( type, data ) => {
    if ( type === 0 ) {
      sinks.push( data );

      data( 0, ( t, d ) => {
        if ( t === 2 ) {
          const i = sinks.indexOf( data );

          if ( -1 < i ) {
            sinks.splice( i, 1 );
          }
        }
      });

      data( 1, last );
    }
    else {
      if ( type === 1 ) {
        last = data;
      }

      // Clone sinks (subscribers) before beginning dispatch to handle the
      // case where a dispatched message results in a termination (unsubscribe)
      // before all dispatches complete. Without this, mutations of `sinks`
      // via the .splice() above were causing indexes out of range as `sinks`
      // was iterated.
      //
      // I considered managing this issue by controlling concurrency (calling
      // sinks[i] via a setTimeout( ..., 0 ) so that all notifications are
      // dispatched before potential unsubscribes listeners), but I'm concerned
      // that may contravene the intent and expectations of users/subscribers.
      let subs = sinks.slice( 0 );

      for ( let i = 0, n = subs.length; i < n; i++ ) {
        // Check that the target subscriber has not been unsubscribed during iteration.
        if ( -1 < sinks.indexOf( subs[i] ) ) {
          subs[i]( type, data );
        }
      }
    }
  }
}

export default makeBehaviorSubject;
