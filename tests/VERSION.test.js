import mutate from '../mutate'
import assert from 'assert'
import {
    VERSION
} from '../constants.js'

describe('VERSION', () => {
    it('semantic version number should be a string', () => {
        assert.ok(typeof mutate.VERSION === 'string')
    })

    it('semantic version number should be at least 5 characters long', () => {
        assert.ok(mutate.VERSION.length >= 5)
    })

    it('should return version of mutate library', () => {
        assert.deepStrictEqual(mutate.VERSION, VERSION)
    })
})
