import mutate from '../mutate'
import assert from 'assert'
import {
    ERROR_MESSAGE_CAPITALIZE_FIRST_CHAR_DATA_INVALID
} from '../constants.js'

describe('capitalize', () => {
    it('should capitalize properties of object', () => {
        const data = {a: 1, mammal: 'bats', color: 'c'}
        const expected = {A: 1, Mammal: 'bats', Color: 'c'}
        mutate.capitalizeFirstChar(data)
        assert.deepStrictEqual(data, expected)
    })

    it('should capitalize properties of collection', () => {
        const data = [{a: 1, mammal: 'bats'}, {color: 'c'}]
        const expected = [{A: 1, Mammal: 'bats'}, {Color: 'c'}]
        mutate.capitalizeFirstChar(data)
        assert.deepStrictEqual(data, expected)
    })

    it('should throw predefined error if `data` type is not valid', () => {
        const data = ''
        let errorMessage

        try {
            mutate.capitalizeFirstChar(data)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_CAPITALIZE_FIRST_CHAR_DATA_INVALID)
    })
})
