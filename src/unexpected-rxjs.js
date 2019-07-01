import {isObservable, iif, EMPTY, throwError} from 'rxjs';
import {filter, toArray, count, switchMap} from 'rxjs/operators';
export {version} from '../package.json';

const toPromise = observable => observable.pipe(toArray()).toPromise();

export const name = 'unexpected-rxjs';
export function installInto(expect) {
  expect.addType({
    base: 'object',
    name: 'Observable',
    identify: isObservable
  });

  expect.addAssertion('<Observable> to complete', (expect, observable) => {
    expect.errorMode = 'bubble';
    return expect(toPromise(observable), 'to be fulfilled');
  });

  expect.addAssertion(
    '<Observable> [not] to emit (value|values) <any?>',
    (expect, observable, any) => {
      expect.errorMode = 'bubble';
      return expect(
        observable
          .pipe(
            filter(
              value => typeof any === 'undefined' || expect.equal(value, any)
            ),
            count(),
            switchMap(count => iif(() => count, EMPTY, throwError()))
          )
          .toPromise(),
        expect.flags.not ? 'to be rejected' : 'to be fulfilled'
      );
    }
  );

  expect.addAssertion(
    '<Observable> [not] to emit times <number>',
    (expect, observable, count) => {
      expect.errorMode = 'bubble';
      return expect(
        observable.pipe(toArray()).toPromise(),
        'when fulfilled',
        '[not] to have length',
        count
      );
    }
  );

  expect.addAssertion(
    '<Observable> [not] to emit once',
    (expect, observable) => {
      return expect(observable, '[not] to emit times', 1);
    }
  );

  expect.addAssertion(
    '<Observable> [not] to emit twice',
    (expect, observable) => {
      return expect(observable, '[not] to emit times', 2);
    }
  );

  expect.addAssertion(
    '<Observable> [not] to emit thrice',
    (expect, observable) => {
      return expect(observable, '[not] to emit times', 3);
    }
  );

  expect.addAssertion(
    '<Observable> to emit error <any?>',
    (expect, observable, any) => {
      expect.errorMode = 'bubble';
      const promise = observable.toPromise();
      if (any) {
        return expect(promise, 'to be rejected with', any);
      }
      return expect(promise, 'to be rejected');
    }
  );
  expect.addAssertion(
    '<Observable> [not] to complete with (values|value) <any+>',
    (expect, observable, ...any) => {
      expect.errorMode = 'bubble';
      return expect(
        toPromise(observable),
        'when fulfilled',
        '[not] to contain',
        ...any
      );
    }
  );

  expect.addAssertion(
    '<Observable> [not] to complete with (value|values) [exhaustively] satisfying <any+>',
    async (expect, observable, ...any) => {
      expect.errorMode = 'bubble';
      const promise = toPromise(observable);
      const resolved = await expect.promise.all(
        any.map(async expected => ({actual: await promise, expected}))
      );
      return resolved.forEach(({actual, expected}) => {
        expect(
          actual,
          '[not] to have an item [exhaustively] satisfying',
          expected
        );
      });
    }
  );

  expect.addAssertion(
    '<Observable> when complete <assertion>',
    (expect, subject, nextAssertion) => {
      expect.errorMode = 'bubble';
      return expect(toPromise(subject), 'when fulfilled', nextAssertion);
    }
  );
}
