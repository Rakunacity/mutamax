import mutate from '../mutate'
import assert from 'assert'
import {
    ERROR_MESSAGE_DELETE_DATA_INVALID, ERROR_MESSAGE_DELETE_PROPS_INVALID
} from '../constants.js'

describe('delete', () => {
    it('should delete properties from object specified by string', () => {
        const data = {a: 1, b: 'bats'}
        const props = 'a'
        const expected = {b: 'bats'}
        mutate.delete(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should delete properties from object specified by array', () => {
        const data = {a: 1, b: 'bats', c: 'color'}
        const props = ['a', 'c']
        const expected = {b: 'bats'}
        mutate.delete(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should delete properties from collection specified by string', () => {
        const data = [{a: 1, b: 'bats'}, {c: 'color'}]
        const props = 'a'
        const expected = [{b: 'bats'}, {c: 'color'}]
        mutate.delete(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should delete properties from collection specified by array', () => {
        const data = [{a: 1, b: 'bats'}, {c: 'color'}]
        const props = ['a', 'c']
        const expected = [{b: 'bats'}, {}]
        mutate.delete(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should throw predefined error if `data` type is not valid', () => {
        const data = ''
        const props = 'sakura'
        let errorMessage

        try {
            mutate.delete(data, props)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_DELETE_DATA_INVALID)
    })

    it('should throw predefined error if `props` type is not valid', () => {
        const data = {hello: 'all', tree: 'sakura'}
        const props = {}
        let errorMessage

        try {
            mutate.delete(data, props)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_DELETE_PROPS_INVALID)
    })
})
