import mutamax from '../mutamax'
import assert from 'assert'
import {
    ERROR_MESSAGE_MERGE_DATA_INVALID, ERROR_MESSAGE_MERGE_PROPS_INVALID
} from '../constants.js'

describe('merge', () => {
    it('should merge existing and  non-existing properties to object', () => {
        const data = {a: 1, b: 'bats'}
        const props = {a: 2, hello: 'all'}
        const expected = {a: 2, b: 'bats', hello: 'all'}
        mutamax.merge(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should merge existing and non-existing properties to collection', () => {
        const data = [{a: 1, b: 'bats'}, {c: 'color'}]
        const props = {a: 2, hello: 'all'}
        const expected = [{a: 2, b: 'bats', hello: 'all'}, {a: 2, c: 'color', hello: 'all'}]
        mutamax.merge(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should throw predefined error if `data` type is not valid', () => {
        const data = ''
        const props = {hello: 'all', tree: 'sakura'}
        let errorMessage

        try {
            mutamax.merge(data, props)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_MERGE_DATA_INVALID)
    })

    it('should throw predefined error if `props` type is not valid', () => {
        const data = {}
        const props = ''
        let errorMessage

        try {
            mutamax.merge(data, props)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_MERGE_PROPS_INVALID)
    })
})
