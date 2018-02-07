const test = require( 'tape' );

const makeBehaviorSubject = require( './index' );

test( "Should broadcast initial value on connection, if not updated.", assert => {
  assert.plan( 2 );

  const subject = makeBehaviorSubject( 'A' );

  const sink = ( t, d ) => {
    if ( t === 0 ) {
      assert.ok( d, 'The sink should receive a talkback.' );
    }
    if ( t === 1 ) {
      assert.equal( d, 'A', 'The sink should receive the initial subject value.' );
    }
  };

  subject( 0, sink );

  assert.end();
});

test( "Should broadcast last data on connection.", assert => {
  assert.plan( 2 );

  const subject = makeBehaviorSubject( 'A' );

  subject( 1, 'B' );

  const sink = ( t, d ) => {
    if ( t === 0 ) {
      assert.ok( d, 'The sink should receive a talkback.' );
    }
    if ( t === 1 ) {
      assert.equal( d, 'B', 'The sink should receive the last subject value.' );
    }
  };

  subject( 0, sink );

  assert.end();
});
