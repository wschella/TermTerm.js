import fromString from '../index'
import { variable } from 'rdf-data-model'

describe('basic functionality works at runtime', () => {
    test('we can make a variable', () => {
        expect(fromString('?a').value).toBe('a')
    })
});