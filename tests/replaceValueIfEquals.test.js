import mutamax from '../mutamax'
import assert from 'assert'
import {
    ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_DATA_INVALID,
    ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_INVALID,
    ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_PROPERTY_INVALID
} from '../constants.js'

describe('replaceValueIfEquals', () => {
    it('should replace property of object if it equals particular value', () => {
        const data = {a: 1, b: null}
        const props = {property: 'b', ifEquals: null, replaceWith: ''}
        const expected = {a: 1, b: ''}
        mutamax.replaceValueIfEquals(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should replace multiple properties of object if they equal particular value', () => {
        const data = {a: undefined, b: undefined, c: true}
        const props = {property: ['a', 'b'], ifEquals: undefined, replaceWith: null}
        const expected = {a: null, b: null, c: true}
        mutamax.replaceValueIfEquals(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should replace property of collection if it equals particular value', () => {
        const data = [{a: 1, b: 'bats'}, {a: 2, b: undefined}]
        const props = {property: 'b', ifEquals: undefined, replaceWith: ''}
        const expected = [{a: 1, b: 'bats'}, {a: 2, b: ''}]
        mutamax.replaceValueIfEquals(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should replace multiple properties of collection if they equal particular value', () => {
        const data = [{a: '', b: ''}, {a: '', b: 'fruit'}]
        const props = {property: ['a', 'b'], ifEquals: '', replaceWith: null}
        const expected = [{a: null, b: null}, {a: null, b: 'fruit'}]
        mutamax.replaceValueIfEquals(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should throw predefined error if `data` type is not valid', () => {
        const data = ''
        const props = {}
        let errorMessage

        try {
            mutamax.replaceValueIfEquals(data, props)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_DATA_INVALID)
    })

    it('should throw predefined error if `props` type is not valid', () => {
        const data = {}
        const props = ''
        let errorMessage

        try {
            mutamax.replaceValueIfEquals(data, props)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_INVALID)
    })

    it('should throw predefined error if `property` key of `props` argument is not valid', () => {
        const data = [{}]
        const props = {property: {}, ifEquals: '', replaceWith: null}
        let errorMessage

        try {
            mutamax.replaceValueIfEquals(data, props)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_PROPERTY_INVALID)
    })
})
