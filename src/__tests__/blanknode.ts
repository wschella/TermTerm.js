import { TermTerm as TT} from '../index';
import { Literal } from 'rdf-js';

describe('the fromString function', () => {


  describe('receiving a BlankNode', () => {
    test('should have the correct value', () => {
      expect(TT.fromString('_:blanknode').value).toBe('blanknode')
    })
  });
}