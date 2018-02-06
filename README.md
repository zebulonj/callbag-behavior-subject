# callbag-behavior-subject

A callbag subject (listener, sink) that repeats its last value on connection.

`npm install callbag-behavior-subject`

## Usage:

```js
import makeBehaviorSubject from 'callbag-behavior-subject';
import subscribe from 'callbag-subscribe';
import pipe from 'callbag-pipe';

const subject = makeBehaviorSubject( 'A' );

const observer = {
  next: val => console.log( val ),
  error: err => console.error( err ),
  complete: () => console.log( 'Done!' )
};

const dispose = pipe(
  subject,
  subscribe( observer )
);

subject( 1, 'B' );
subject( 2 );

// A
// B
// Done!
```
