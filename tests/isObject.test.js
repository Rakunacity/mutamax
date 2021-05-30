import mutamax from '../mutamax'
import assert from 'assert'
import {
    falsey
} from '../constants.js'

describe('isObject', function () {
    it('should return `true` for objects', function () {
        assert.strictEqual(mutamax.isObject({a: 1}), true)
        /* eslint-disable no-new-object */
        assert.strictEqual(mutamax.isObject(new Object()), true)
    })

    it('should return `false` for non-objects: Part 1', function () {
        const args = (function getArgumentsObject () {
            return arguments
        })()
        assert.strictEqual(mutamax.isObject(args), false)
        assert.strictEqual(mutamax.isObject(Object(false)), false)
        assert.strictEqual(mutamax.isObject(Object(0)), false)
        assert.strictEqual(mutamax.isObject(Object('a')), false)
        assert.strictEqual(mutamax.isObject(Object(Symbol('a'))), false)
        assert.strictEqual(mutamax.isObject([1, 2, 3]), false)
        /* eslint-disable no-array-constructor */
        assert.strictEqual(mutamax.isObject(new Array()), false)
        assert.strictEqual(mutamax.isObject(new Date()), false)
        assert.strictEqual(mutamax.isObject(new Error()), false)
        /* eslint-disable no-new-func */
        assert.strictEqual(mutamax.isObject(new Function()), false)
        assert.strictEqual(mutamax.isObject(function () {
        }), false)
        assert.strictEqual(mutamax.isObject(/x/), false)
    })

    it('should return `false` for non-objects: Part 2', function () {
        const values = falsey.concat(true, 1, 'a', Symbol('a'))
        const expected = values.map(() => false)

        const actual = values.map(function (value, index) {
            return index ? mutamax.isObject(value) : mutamax.isObject()
        })

        assert.deepStrictEqual(actual, expected)
    })
})
