'use strict';

const {of, EMPTY, throwError} = require('rxjs');

expect.use(require('..'));

describe('unexpected-rxjs', function() {
  describe('<Observable> to complete', function() {
    it('should fulfill if the Observable completes', function() {
      return expect(expect(EMPTY, 'to complete'), 'to be fulfilled');
    });

    it('should reject if the Observable errors out', function() {
      return expect(expect(throwError(), 'to complete'), 'to be rejected');
    });
  });

  describe('<Observable> to emit value', function() {
    it('should fulfill if the Observable emits a value', function() {
      return expect(expect(of('foo'), 'to emit value'), 'to be fulfilled');
    });

    it('should reject if the Observable does not emit', function() {
      return expect(expect(EMPTY, 'to emit value'), 'to be rejected');
    });
  });

  describe('<Observable> not to emit value', function() {
    it('should fulfill if the Observable completes without emitting a value', function() {
      return expect(expect(EMPTY, 'not to emit value'), 'to be fulfilled');
    });

    it('should reject if the Observable emits a value', function() {
      return expect(expect(of('foo'), 'not to emit value'), 'to be rejected');
    });
  });

  describe('<Observable> to emit value <value>', function() {
    it('should fulfill if the Observable emits <value>', function() {
      return expect(
        expect(of('foo'), 'to emit value', 'foo'),
        'to be fulfilled'
      );
    });

    it('should reject if the Observable does not emit <value>', function() {
      return expect(
        expect(of('bar'), 'to emit value', 'foo'),
        'to be rejected'
      );
    });
  });

  describe('<Observable> not to emit value <value>', function() {
    it('should reject if the Observable emits <value>', function() {
      return expect(
        expect(of('foo'), 'not to emit value', 'foo'),
        'to be rejected'
      );
    });

    it('should fulfill if the Observable does not emit <value>', function() {
      return expect(
        expect(of('bar'), 'not to emit value', 'foo'),
        'to be fulfilled'
      );
    });
  });

  describe('<Observable> to emit times <count>', function() {
    it('should fulfill if the Observable emits <count> values', function() {
      return expect(expect(of('foo'), 'to emit times', 1), 'to be fulfilled');
    });

    it('should reject if the Observable emits more/less than <count> values', function() {
      return expect(expect(of('foo'), 'to emit times', 2), 'to be rejected');
    });
  });

  describe('<Observable> not to emit times <count>', function() {
    it('should reject if the Observable emits <count> values', function() {
      return expect(
        expect(of('foo'), 'not to emit times', 1),
        'to be rejected'
      );
    });

    it('should fulfill if the Observable emits more/less than <count> values', function() {
      return expect(
        expect(of('foo'), 'not to emit times', 2),
        'to be fulfilled'
      );
    });
  });

  describe('<Observable> to emit once', function() {
    it('should fulfill if the Observable emits once', function() {
      return expect(expect(of('foo'), 'to emit once'), 'to be fulfilled');
    });

    it('should reject if the Observable emits more/less than once', function() {
      return expect(expect(of('foo', 'bar'), 'to emit once'), 'to be rejected');
    });
  });

  describe('<Observable> not to emit once', function() {
    it('should reject if the Observable emits once', function() {
      return expect(expect(of('foo'), 'not to emit once'), 'to be rejected');
    });

    it('should fulfill if the Observable emits more/less than once', function() {
      return expect(
        expect(of('foo', 'bar'), 'not to emit once'),
        'to be fulfilled'
      );
    });
  });

  describe('<Observable> to emit twice', function() {
    it('should fulfill if the Observable emits twice', function() {
      return expect(
        expect(of('foo', 'bar'), 'to emit twice'),
        'to be fulfilled'
      );
    });

    it('should reject if the Observable emits more/less than twice', function() {
      return expect(expect(of('foo'), 'to emit twice'), 'to be rejected');
    });
  });

  describe('<Observable> not to emit twice', function() {
    it('should reject if the Observable emits twice', function() {
      return expect(
        expect(of('foo', 'bar'), 'not to emit twice'),
        'to be rejected'
      );
    });

    it('should fulfill if the Observable emits more/less than twice', function() {
      return expect(expect(of('foo'), 'not to emit twice'), 'to be fulfilled');
    });
  });

  describe('<Observable> to emit thrice', function() {
    it('should fulfill if the Observable emits thrice', function() {
      return expect(
        expect(of('foo', 'bar', 'baz'), 'to emit thrice'),
        'to be fulfilled'
      );
    });

    it('should reject if the Observable emits more/less than thrice', function() {
      return expect(expect(of('foo'), 'to emit thrice'), 'to be rejected');
    });
  });

  describe('<Observable> not to emit thrice', function() {
    it('should reject if the Observable emits thrice', function() {
      return expect(
        expect(of('foo', 'bar', 'baz'), 'not to emit thrice'),
        'to be rejected'
      );
    });

    it('should fulfill if the Observable emits more/less than thrice', function() {
      return expect(expect(of('foo'), 'not to emit thrice'), 'to be fulfilled');
    });
  });

  describe('<Observable> to emit error', function() {
    it('should fulfill if the Observable emits an error', function() {
      return expect(
        expect(throwError(new Error()), 'to emit error'),
        'to be fulfilled'
      );
    });

    it('should reject if the Observable does not emit an error', function() {
      return expect(expect(of('foo'), 'to emit error'), 'to be rejected');
    });
  });

  describe('<Observable> to emit error <any>', function() {
    it('should fulfill if the Observable emits a matching error', function() {
      return expect(
        expect(throwError(new Error('foo')), 'to emit error', 'foo'),
        'to be fulfilled'
      );
    });

    it('should reject if the Observable emits a non-matching error', function() {
      return expect(
        expect(throwError(new Error('bar')), 'to emit error', 'foo'),
        'to be rejected'
      );
    });

    it('should reject if the Observable does not emit an error', function() {
      return expect(
        expect(of('foo'), 'to emit error', 'foo'),
        'to be rejected'
      );
    });
  });

  describe('<Observable> to complete with value <value+>', function() {
    it('should fulfill if the Observable emits matching values', function() {
      return expect(
        expect(
          of('foo', 'bar', 'baz'),
          'to complete with values',
          'foo',
          'baz'
        ),
        'to be fulfilled'
      );
    });

    it('should reject if the Observable does not emit matching values', function() {
      return expect(
        expect(
          of('foo', 'bar', 'baz'),
          'to complete with values',
          'quux',
          'spam'
        ),
        'to be rejected'
      );
    });
  });

  describe('<Observable> not to complete with value <value+>', function() {
    it('should reject if the Observable emits matching values', function() {
      return expect(
        expect(
          of('foo', 'bar', 'baz'),
          'not to complete with values',
          'foo',
          'baz'
        ),
        'to be rejected'
      );
    });

    it('should fulfill if the Observable does not emit matching values', function() {
      return expect(
        expect(
          of('foo', 'bar', 'baz'),
          'not to complete with values',
          'quux',
          'spam'
        ),
        'to be fulfilled'
      );
    });
  });

  describe('<Observable> to complete with value satisfying <value+>', function() {
    it('should fulfill if the Observable emits satisfying values', function() {
      return expect(
        expect(
          of({foo: 'bar', baz: 'quux'}),
          'to complete with values satisfying',
          {baz: 'quux'},
          {foo: 'bar'}
        ),
        'to be fulfilled'
      );
    });

    it('should reject if the Observable does not emit satisfying values', function() {
      return expect(
        expect(
          of({foo: 'bar', baz: 'quux'}),
          'to complete with value satisfying',
          {quux: 'baz'}
        ),
        'to be rejected'
      );
    });
  });

  describe('<Observable> not to complete with value satisfying <value+>', function() {
    it('should reject if the Observable emits satisfying values', function() {
      return expect(
        expect(
          of({foo: 'bar', baz: 'quux'}),
          'not to complete with values satisfying',
          {baz: 'quux'},
          {foo: 'bar'}
        ),
        'to be rejected'
      );
    });

    it('should fulfill if the Observable does not emit satisfying values', function() {
      return expect(
        expect(
          of({foo: 'bar', baz: 'quux'}),
          'not to complete with value satisfying',
          {quux: 'baz'}
        ),
        'to be fulfilled'
      );
    });
  });

  describe('<Observable> when complete <assertion>', function() {
    it('should allow Promise-like assertion chaining', function() {
      return expect(
        expect(of('foo'), 'when complete', expect.it('to contain', 'foo')),
        'to be fulfilled'
      );
    });
  });
});
