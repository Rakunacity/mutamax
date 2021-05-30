import mutamax from '../mutamax'
import assert from 'assert'
import {falsey} from '../constants'

describe('isArray', function () {
    it('should return `true` for arrays', function () {
        assert.strictEqual(mutamax.isArray([1, 2, 3]), true)
        /* eslint-disable no-array-constructor */
        assert.strictEqual(mutamax.isArray(new Array()), true)
    })

    it('should return `false` for non-arrays: Part 1', function () {
        const args = (function getArgumentsObject () {
            return arguments
        })()
        assert.strictEqual(mutamax.isArray(args), false)
        assert.strictEqual(mutamax.isArray(Object(false)), false)
        assert.strictEqual(mutamax.isArray(Object(0)), false)
        assert.strictEqual(mutamax.isArray(Object('a')), false)
        assert.strictEqual(mutamax.isArray(Object(Symbol)), false)
        assert.strictEqual(mutamax.isArray(new Date()), false)
        assert.strictEqual(mutamax.isArray(new Error()), false)
        /* eslint-disable no-new-func */
        assert.strictEqual(mutamax.isArray(new Function()), false)
        assert.strictEqual(mutamax.isArray(function () {
        }), false)
        assert.strictEqual(mutamax.isArray(/x/), false)
    })

    it('should return `false` for non-arrays: Part 2', function () {
        const values = falsey.concat(true, 1, 'a', Symbol('a'))
        const expected = values.map(() => false)

        const actual = values.map(function (value, index) {
            return index ? mutamax.isArray(value) : mutamax.isArray()
        })

        assert.deepStrictEqual(actual, expected)
    })
})
