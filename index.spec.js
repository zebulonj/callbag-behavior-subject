const test = require( 'tape' );

const makeBehaviorSubject = require( './index' );

test( "BehaviorSubject", assert => {
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
