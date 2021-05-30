import mutamax from '../mutamax'
import assert from 'assert'
import {
    ERROR_MESSAGE_MAP_DATA_INVALID, ERROR_MESSAGE_MAP_ITERATEE_INVALID
} from '../constants.js'

describe('map', () => {
    it('should transform object using new key/value pairs passed from iteratee', () => {
        const data = {a: 1, b: 'bats'}
        const iteratee = function (key, value) {
            let newValue

            if (typeof value === 'number') {
                newValue = value.toString()
            } else {
                newValue = value
            }

            return {newKey: key.toUpperCase(), newValue: newValue}
        }
        const expected = {A: '1', B: 'bats'}
        mutamax.map(data, iteratee)
        assert.deepStrictEqual(data, expected)
    })

    it('should transform collection using new key/value pairs passed from iteratee', () => {
        const data = [{a: 1, b: 'bats'}, {c: 'color'}]
        const iterate = function (key, value) {
            let newValue

            if (typeof value === 'number') {
                newValue = value.toString()
            } else if (typeof value === 'string') {
                newValue = value.toUpperCase()
            }

            return {newKey: key, newValue: newValue}
        }
        const expected = [{a: '1', b: 'BATS'}, {c: 'COLOR'}]

        mutamax.map(data, iterate)
        assert.deepStrictEqual(data, expected)
    })

    it('should throw predefined error if `data` type is not valid', () => {
        const data = ''
        const iteratee = function () {
        }
        let errorMessage

        try {
            mutamax.map(data, iteratee)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_MAP_DATA_INVALID)
    })

    it('should throw predefined error if `iteratee` type is not valid', () => {
        const data = {}
        const props = ''
        let errorMessage

        try {
            mutamax.map(data, props)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_MAP_ITERATEE_INVALID)
    })
})
