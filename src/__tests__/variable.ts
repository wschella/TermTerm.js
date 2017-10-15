import { TermTerm as TT} from '../index';
import { Literal } from 'rdf-js';

describe('the fromString function', () => {

  describe('receiving a NamedNode', () => {
    test('should have the correct value', () => {
      expect(TT.fromString('http://example.org/resource').value).toBe('http://example.org/resource')
    })
  });

  describe('receiving a BlankNode', () => {
    test('should have the correct value', () => {
      expect(TT.fromString('_:blanknode').value).toBe('blanknode')
    })
  });

  describe('receiving a Literal', () => {
    var literal = TT.fromString('"')

    test('should have the correct value', () => {
      expect(TT.fromString('"3"').value).toBe('3');
    })

    test('should have the correct datatype', () => {
      expect(TT.fromString('"3"^^xsd:integer').datatype).toBe('xsd:integer');
    })

    test('should have the correct language', () => {
      expect(TT.fromString('"test"@en-gb').datatype).toBe('en-gb');
    });
  });

  describe('receiving a Variable', () => {
    test('should have the correct value', () => {
      expect(TT.fromString('?a').value).toBe('a');
    })
  });
});

test('TermTerm is polite', () => {
  expect(TT.sayHello()).toBe('hi');
});