import { TermTerm } from '../index';

test('TermTerm is polite', () => {
  expect(TermTerm.sayHello()).toBe('hi');
});