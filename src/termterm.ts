import * as RDF from 'rdf-data-model';
import { Term, NamedNode } from 'rdf-js'

export namespace TermTerm {

  export function sayHello() {
    return 'hi';
  }
  
  export function fromString(str: string) :Term {
    // Falsy value or empty string indicate the default graph
    if (!str)
    return RDF.defaultGraph();
    
    // Identify the term type based on the first character
    switch (str[0]) {
      case '_': return RDF.blankNode(str.substr(2));
      case '?': return RDF.variable(str.substr(1));
      case '"': return RDF.literal(str.substr(1, str.lastIndexOf('"') - 1), languageOrDatatype(str) || undefined );
      default:  return RDF.namedNode(str);
    }
  }
}
  
  //const df = new DataFactory();

function languageOrDatatype(lit: string) :string | NamedNode {
  return language(lit) || dataType(lit);
}

function language(lit: string) :string {
    // Find the last quotation mark (e.g., '"abc"@en-us')
    var atPos = lit.lastIndexOf('"') + 1;

    // If "@" it follows, return the remaining substring; empty otherwise
    return atPos < lit.length && lit[atPos++] === '@' ? lit.substr(atPos) : '';
}

function dataType(lit: string) :string {
    // Find the last quotation mark (e.g., '"abc"^^http://ex.org/types#t')
    var dtPos = lit.lastIndexOf('"') + 1, ch;

    // If "^" it follows, return the remaining substring
    return dtPos < lit.length && (ch = lit[dtPos]) === '^' ? lit.substr(dtPos + 2) :
           // If "@" follows, return rdf:langString; xsd:string otherwise
           (ch === '@' ? 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString'
                       : 'http://www.w3.org/2001/XMLSchema#string');
}