import mutamax from '../mutamax'
import assert from 'assert'
import {
    ERROR_MESSAGE_ADD_DATA_INVALID, ERROR_MESSAGE_ADD_PROPS_INVALID
} from '../constants.js'

describe('add', () => {
    it('should add non-existing properties to object', () => {
        const data = {a: 1, b: 'bats'}
        const props = {a: 2, hello: 'all'}
        const expected = {a: 1, b: 'bats', hello: 'all'}
        mutamax.add(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should add non-existing properties to collection', () => {
        const data = [{a: 1, b: 'bats'}, {c: 'color'}]
        const props = {a: 2, hello: 'all'}
        const expected = [{a: 1, b: 'bats', hello: 'all'}, {a: 2, c: 'color', hello: 'all'}]
        mutamax.add(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should throw predefined error if `data` type is not valid', () => {
        const data = ''
        const props = {hello: 'all', tree: 'sakura'}
        let errorMessage

        try {
            mutamax.add(data, props)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_ADD_DATA_INVALID)
    })

    it('should throw predefined error if `props` type is not valid', () => {
        const data = {}
        const props = ''
        let errorMessage

        try {
            mutamax.add(data, props)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_ADD_PROPS_INVALID)
    })
})
