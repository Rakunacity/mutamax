import mutamax from '../mutamax'
import assert from 'assert'
import {
    VERSION
} from '../constants.js'

describe('VERSION', () => {
    it('semantic version number should be a string', () => {
        assert.ok(typeof mutamax.VERSION === 'string')
    })

    it('semantic version number should be at least 5 characters long', () => {
        assert.ok(mutamax.VERSION.length >= 5)
    })

    it('should return version of mutamax library', () => {
        assert.deepStrictEqual(mutamax.VERSION, VERSION)
    })
})
