import mutate from '../mutate'
import assert from 'assert'
import {
    ERROR_MESSAGE_DECAPITALIZE_FIRST_CHAR_DATA_INVALID
} from '../constants.js'

describe('decapitalize', () => {
    it('should decapitalize properties of object', () => {
        const data = {A: 1, Mammal: 'bats', Color: 'c'}
        const expected = {a: 1, mammal: 'bats', color: 'c'}
        mutate.deCapitalizeFirstChar(data)
        assert.deepStrictEqual(data, expected)
    })

    it('should decapitalize properties of collection', () => {
        const data = [{A: 1, Mammal: 'bats'}, {Color: 'c'}]
        const expected = [{a: 1, mammal: 'bats'}, {color: 'c'}]
        mutate.deCapitalizeFirstChar(data)
        assert.deepStrictEqual(data, expected)
    })

    it('should throw predefined error if `data` type is not valid', () => {
        const data = ''
        let errorMessage

        try {
            mutate.deCapitalizeFirstChar(data)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_DECAPITALIZE_FIRST_CHAR_DATA_INVALID)
    })
})
