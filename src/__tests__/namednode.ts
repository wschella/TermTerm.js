import { TermTerm as TT} from '../index';
import { Literal } from 'rdf-js';

describe('the fromString function', () => {

  describe('receiving a NamedNode', () => {
    test('should have the correct value', () => {
      expect(TT.fromString('http://example.org/resource').value).toBe('http://example.org/resource')
    })
  });
}