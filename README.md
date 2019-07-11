# unexpected-rxjs

> Assertions for use with [RxJS](https://rjxs.dev) and [Unexpected](http://unexpected.js.org)

This module is a plugin for the Unexpected assertion library which provides handy assertions against RxJS `Observable`s.

## Install

Both `rxjs` and `unexpected` are peer dependencies of this module.

```shell
$ npm install rxjs@^6 # peer dependency
$ npm install unexpected unexpected-rxjs --save-dev
```

## Usage

Use as an Unexpected plugin in Node.js:

```js
const unexpected = require('unexpected');
const expect = unexpected.clone().use(require('unexpected-rxjs'));
```

Or using ES modules:

```js
import unexpected from 'unexpected';
import unexpectedRxjs from 'unexpected-rxjs';
const expect = unexpected.clone().use(unexpectedRxjs);
```

Browser, using globals:

```js
const unexpected = window.weknowhow.expect;
const expect = unexpected.clone().use(window.unexpectedRxjs);
```

Then:

```js
import {of} from 'rxjs';

describe('contrived example', function() {
  it('should emit "foo"', function() {
    return expect(of('foo', 'bar'), 'to emit values', 'foo', 'bar');
  });
});
```

## Assertions

_Note_: All assertions return `Promise` values, so you will want to `return expect(/*...*/)` (using Mocha) or otherwise use `async` functions.

- `<Observable> to complete` - Asserts an `Observable` completes. Given the halting problem, this can _only_ fail if the `Observable` emits an error _or_ your test framework times out.
- `<Observable> [not] to emit (value|values) <any+>` - Asserts an `Observable` emits one or more values using object equivalence.
- `<Observable> [not] to emit times <count>` - Asserts an `Observable` emits _count_ times.
- `<Observable> [not] to emit (once|twice|thrice)` - Sugar for previous assertion.
- `<Observable> [not] to emit error <any?>` - Asserts an `Observable` emits an "error"; uses Unexpected's default error matching.
- `<Observable> to emit error [exhaustively] satisfying <any>` - Asserts an `Observable` emits an "error" using "to satisfy" semantics.
- `<Observable> [not] to complete with value <any+>` - Assert when an `Observable` completes, it has emitted one or more matching values.
- `<Observable> [not] to complete with value [exhaustively] satisfying <any+>` - Same as previous, except using "to satisfy" semantics.
- `<Observable> when complete <assertion>` - Akin to Unexpected's `<Promise> when fulfilled <assertion>` syntax.

## Notes

- `<Observable> [not] to complete with value [exhaustively] satisfying <any+>` has some significant performance issues.

## License

Copyright © 2019 IBM. Licensed Apache-2.0
