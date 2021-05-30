import mutate from '../mutate'
import assert from 'assert'
import {
    ERROR_MESSAGE_LIMIT_TO_DATA_INVALID, ERROR_MESSAGE_LIMIT_TO_PROPS_INVALID
} from '../constants.js'

describe('limitTo', () => {
    it('should delete all properties of object except those specified', () => {
        const data = {a: 1, b: 'bats', c: 'color'}
        const props = ['a', 'c']
        const expected = {a: 1, c: 'color'}
        mutate.limitTo(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should delete all properties of collection except those specified', () => {
        const data = [{a: 1, b: 'bats'}, {c: 'color', d: 'USD'}]
        const props = ['a', 'c']
        const expected = [{a: 1}, {c: 'color'}]
        mutate.limitTo(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should throw predefined error if `data` type is not valid', () => {
        const data = ''
        const props = {hello: 'all', tree: 'sakura'}
        let errorMessage

        try {
            mutate.limitTo(data, props)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_LIMIT_TO_DATA_INVALID)
    })

    it('should throw predefined error if `props` type is not valid', () => {
        const data = {}
        const props = ''
        let errorMessage

        try {
            mutate.limitTo(data, props)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_LIMIT_TO_PROPS_INVALID)
    })
})
