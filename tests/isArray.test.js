import mutate from '../mutate'
import assert from 'assert'
import {falsey} from '../constants'

describe('isArray', function () {
    it('should return `true` for arrays', function () {
        assert.strictEqual(mutate.isArray([1, 2, 3]), true)
        /* eslint-disable no-array-constructor */
        assert.strictEqual(mutate.isArray(new Array()), true)
    })

    it('should return `false` for non-arrays: Part 1', function () {
        const args = (function getArgumentsObject () {
            return arguments
        })()
        assert.strictEqual(mutate.isArray(args), false)
        assert.strictEqual(mutate.isArray(Object(false)), false)
        assert.strictEqual(mutate.isArray(Object(0)), false)
        assert.strictEqual(mutate.isArray(Object('a')), false)
        assert.strictEqual(mutate.isArray(Object(Symbol)), false)
        assert.strictEqual(mutate.isArray(new Date()), false)
        assert.strictEqual(mutate.isArray(new Error()), false)
        /* eslint-disable no-new-func */
        assert.strictEqual(mutate.isArray(new Function()), false)
        assert.strictEqual(mutate.isArray(function () {
        }), false)
        assert.strictEqual(mutate.isArray(/x/), false)
    })

    it('should return `false` for non-arrays: Part 2', function () {
        const values = falsey.concat(true, 1, 'a', Symbol('a'))
        const expected = values.map(() => false)

        const actual = values.map(function (value, index) {
            return index ? mutate.isArray(value) : mutate.isArray()
        })

        assert.deepStrictEqual(actual, expected)
    })
})
