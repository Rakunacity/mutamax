import mutate from '../mutate'
import assert from 'assert'
import {
    falsey
} from '../constants.js'

describe('isObject', function () {
    it('should return `true` for objects', function () {
        assert.strictEqual(mutate.isObject({a: 1}), true)
        /* eslint-disable no-new-object */
        assert.strictEqual(mutate.isObject(new Object()), true)
    })

    it('should return `false` for non-objects: Part 1', function () {
        const args = (function getArgumentsObject () {
            return arguments
        })()
        assert.strictEqual(mutate.isObject(args), false)
        assert.strictEqual(mutate.isObject(Object(false)), false)
        assert.strictEqual(mutate.isObject(Object(0)), false)
        assert.strictEqual(mutate.isObject(Object('a')), false)
        assert.strictEqual(mutate.isObject(Object(Symbol('a'))), false)
        assert.strictEqual(mutate.isObject([1, 2, 3]), false)
        /* eslint-disable no-array-constructor */
        assert.strictEqual(mutate.isObject(new Array()), false)
        assert.strictEqual(mutate.isObject(new Date()), false)
        assert.strictEqual(mutate.isObject(new Error()), false)
        /* eslint-disable no-new-func */
        assert.strictEqual(mutate.isObject(new Function()), false)
        assert.strictEqual(mutate.isObject(function () {
        }), false)
        assert.strictEqual(mutate.isObject(/x/), false)
    })

    it('should return `false` for non-objects: Part 2', function () {
        const values = falsey.concat(true, 1, 'a', Symbol('a'))
        const expected = values.map(() => false)

        const actual = values.map(function (value, index) {
            return index ? mutate.isObject(value) : mutate.isObject()
        })

        assert.deepStrictEqual(actual, expected)
    })
})
