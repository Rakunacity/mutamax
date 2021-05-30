import mutamax from '../mutamax'
import assert from 'assert'
import {
    ERROR_MESSAGE_RENAME_DATA_INVALID, ERROR_MESSAGE_RENAME_PROPS_INVALID
} from '../constants.js'

describe('rename', () => {
    it('should rename properties of object', () => {
        const data = {a: 1, b: 'bats', c: 'color'}
        const props = {b: 'mammals', c: 'orange'}
        const expected = {a: 1, mammals: 'bats', orange: 'color'}
        mutamax.rename(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should be able to rename properties of object to the same name', () => {
        const data = {a: 1, b: 'bats', c: 'color'}
        const props = {b: 'b', c: 'c'}
        const expected = {a: 1, b: 'bats', c: 'color'}
        mutamax.rename(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should rename properties of collection', () => {
        const data = [{a: 1, b: 'bats'}, {c: 'color'}]
        const props = {b: 'mammals', c: 'orange'}
        const expected = [{a: 1, mammals: 'bats'}, {orange: 'color'}]
        mutamax.rename(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should be able to rename properties of collection to the same name', () => {
        const data = [{a: 1, b: 'bats'}, {c: 'color'}]
        const props = {b: 'b', c: 'c'}
        const expected = [{a: 1, b: 'bats'}, {c: 'color'}]
        mutamax.rename(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should not create new properties when attempting to rename non-existing ones', () => {
        const data = {groupId: 1, userLastName: 'Brown'}
        const props = {groupId: 'userId', nonExisting: 'NonExisting'}
        const expected = {userId: 1, userLastName: 'Brown'}

        mutamax.rename(data, props)
        assert.deepStrictEqual(data, expected)
    })

    it('should throw predefined error if `data` type is not valid', () => {
        const data = ''
        const props = {hello: 'all', tree: 'sakura'}
        let errorMessage

        try {
            mutamax.rename(data, props)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_RENAME_DATA_INVALID)
    })

    it('should throw predefined error if `props` type is not valid', () => {
        const data = {}
        const props = ''
        let errorMessage

        try {
            mutamax.rename(data, props)
        } catch (e) {
            errorMessage = e.message
        }

        assert.deepStrictEqual(errorMessage, ERROR_MESSAGE_RENAME_PROPS_INVALID)
    })
})
