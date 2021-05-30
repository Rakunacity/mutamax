import mutamax from '../mutamax'
import assert from 'assert'
import {
    ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_DATA_INVALID,
    ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_PROPS_INVALID
} from '../constants.js'

describe('replaceAllValuesIfEquals', () => {
    it('should replace all properties of object which equal particular value', () => {
        const data = {a: 1, b: null, c: null}
        const props = {ifEquals: null, replaceWith: ''}
        const expected = {a: 1, b: '', c: ''}
        mutamax.replaceAllValuesIfEquals(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should replace all properties of collection which equal particular value', () => {
        const data = [{a: undefined, b: 'bats'}, {a: undefined, b: undefined}]
        const props = {ifEquals: undefined, replaceWith: ''}
        const expected = [{a: '', b: 'bats'}, {a: '', b: ''}]
        mutamax.replaceAllValuesIfEquals(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should throw predefined error if `data` type is not valid', () => {
        const data = ''
        const props = {}
        let errorMessage

        try {
            mutamax.replaceAllValuesIfEquals(data, props)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_DATA_INVALID)
    })

    it('should throw predefined error if `props` type is not valid', () => {
        const data = {}
        const props = ''
        let errorMessage

        try {
            mutamax.replaceAllValuesIfEquals(data, props)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_PROPS_INVALID)
    })
})
