import * as RDF from 'rdf-data-model';
import { Term, NamedNode } from 'rdf-js'

/**
 * Parses a string into an RDF Term as specified by 
 * https://github.com/rdfjs/representation-task-force/
 * 
 * @param {string} str - The string to be parsed
 * @returns {Term} - The parsed Term, will default to a NamedNode
 */
export default function fromString(str: string) :Term {
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

/**
 * Retrieve the language OR datatype from a literal
 * 
 * @param {string} lit - The literal for which to find the language or datatype
 * @returns {string | NamedNode} - Either the string language or the NamedNode datatype
 */
function languageOrDatatype(lit: string) :string | NamedNode {
  return language(lit) || dataType(lit);
}

/**
 * Retrieve the language form a literal's language tag
 * 
 * @param lit {string} lit - The literal for which to find the language
 * @returns {string} - The language in the literal's language tag, or an empty string in case of there was no language tag
 */
function language(lit: string) :string {
    // Find the last quotation mark (e.g., '"abc"@en-us')
    var atPos = lit.lastIndexOf('"') + 1;

    // If "@" it follows, return the remaining substring; empty otherwise
    return atPos < lit.length && lit[atPos++] === '@' ? lit.substr(atPos) : '';
}

/**
 * Retrieve the datatype from a literal
 * 
 * @param {string} lit - The literal for which to find the language
 * @returns {NameNode} - A NamedNode with the IRI for the literal's datatype
 */
function dataType(lit: string) :NamedNode {
    // Find the last quotation mark (e.g., '"abc"^^http://ex.org/types#t')
    var dtPos = lit.lastIndexOf('"') + 1, ch;

    return dtPos < lit.length && (ch = lit[dtPos]) === '^' 
      
      // If "^" it follows, return the remaining substring
      ? RDF.namedNode(lit.substr(dtPos + 2)) 
      
      // If "@" follows, return rdf:langString; xsd:string otherwise
      : (ch === '@' 
          ? RDF.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')
          : RDF.namedNode('http://www.w3.org/2001/XMLSchema#string'));
}