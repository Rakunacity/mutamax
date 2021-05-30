/*
* Data transformations typically occurring while processing server requests/responses.
* */

import {
    ERROR_MESSAGE_MAP_DATA_INVALID, ERROR_MESSAGE_MAP_ITERATEE_INVALID,
    ERROR_MESSAGE_MERGE_DATA_INVALID, ERROR_MESSAGE_MERGE_PROPS_INVALID,
    ERROR_MESSAGE_ADD_DATA_INVALID, ERROR_MESSAGE_ADD_PROPS_INVALID,
    ERROR_MESSAGE_DELETE_DATA_INVALID, ERROR_MESSAGE_DELETE_PROPS_INVALID,
    ERROR_MESSAGE_RENAME_DATA_INVALID, ERROR_MESSAGE_RENAME_PROPS_INVALID,
    ERROR_MESSAGE_LIMIT_TO_DATA_INVALID, ERROR_MESSAGE_LIMIT_TO_PROPS_INVALID,
    ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_DATA_INVALID,
    ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_INVALID,
    ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_DATA_INVALID,
    ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_PROPS_INVALID,
    ERROR_MESSAGE_CAPITALIZE_FIRST_CHAR_DATA_INVALID,
    ERROR_MESSAGE_DECAPITALIZE_FIRST_CHAR_DATA_INVALID,
    VERSION
} from './constants.js'

import {_Object} from './_object'
import {_Collection} from './_collection'
import {_Utils} from './_utils'

export default class mutamax {
    /**
     * The semantic version number.
     *
     * @static
     * @type {string}
     * @example
     *
     *
     * console.log(mutamax.VERSION)
     * // => 0.1.1
     */
    static get VERSION () {
        return VERSION
    }

    /**
     * Transforms `data` key-value pares by running each element of `data` through `iteratee`.
     * The iteratee is invoked with two arguments: key and value.
     * The expected output of iteratee is: {newKey: 'myNewKey', newValue: 'my-new-value'}.
     * `newKey` and/or `newValue` can be the same as before or transformed.
     *
     * @since 0.1.0
     * @param {Array|Object} data The object/collection to iterate over.
     * @param {Function} iteratee The iteratee to transform key/value pares. Expected output of iteratee is: {newKey: 'myNewKey', newValue: 'my-new-value'}
     * @returns {undefined} The passed `data` will be mutamaxd, no specific return is needed.
     * @example
     *
     * mutamax.map({a: 1, b: 'bats'}, function (key, value) {
     *     let newValue
     *
     *     if (typeof value == 'number') {
     *         newValue = value.toString()
     *     } else {
     *         newValue = value
     *     }
     *
     *     return {newKey: key.toUpperCase(), newValue: newValue}
     * })
     * // => {A: '1', B: 'bats'}
     *
     * mutamax.map([{a: 1, b: 'bats'}, {c: 'color'}], function (key, value) {
     *     let newKey, newValue
     *
     *     if (typeof value == 'number') {
     *         newValue = value.toString()
     *     } else if (typeof value == 'string')  {
     *         newValue = value.toUpperCase()
     *     }
     *
     *     return {newKey: key, newValue: newValue}
     * })
     * // => [{a: '1', b: 'BATS'}, {c: 'COLOR'}]
     */

    static map (data, iteratee) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_MAP_DATA_INVALID)
        }

        if (Object.prototype.toString.call(iteratee) !== '[object Function]') {
            throw new TypeError(ERROR_MESSAGE_MAP_ITERATEE_INVALID)
        }

        if (this.isObject(data)) {
            _Object.map(data, iteratee)
        } else if (this.isArray(data)) {
            _Collection.map(data, iteratee)
        }
    }

    /**
     * Merge properties of an object into another object or collection.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection into which new properties will be merged.
     * @param {Object} props The object defining merged properties and their values.
     * @returns {undefined} The passed `data` will be mutamaxd, no specific return is needed.
     * @example
     *
     *
     * mutamax.merge({a: 1, b: 'bats'}, {a: 2, hello: 'all'})
     * // => {a: 2, b: 'bats', hello: 'all'}
     *
     * mutamax.merge([{a: 1, b: 'bats'}, {c: 'color'}], {a: 2, hello: 'all'})
     * // => [{a: 2, b: 'bats', hello: 'all'}, {a: 2, c: 'color', hello: 'all'}]
     *
     */
    static merge (data, props) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_MERGE_DATA_INVALID)
        }

        if (!this.isObject(props)) {
            throw new TypeError(ERROR_MESSAGE_MERGE_PROPS_INVALID)
        }

        if (this.isObject(data)) {
            _Object.merge(data, props, true)
        } else if (this.isArray(data)) {
            _Collection.merge(data, props, true)
        }
    }

    /**
     * Add non-existing properties of an object to another object or collection.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection to which new properties will be added.
     * @param {Object} props The object defining new properties and their values.
     * @returns {undefined} The passed `data` will be mutamaxd, no specific return is needed.
     * @example
     *
     *
     * mutamax.add({a: 1, b: 'bats'}, {a: 2, hello: 'all'})
     * // => {a: 1, b: 'bats', hello: 'all'}
     *
     * mutamax.add([{a: 1, b: 'bats'}, {c: 'color'}], {a: 2, hello: 'all'})
     * // => [{a: 1, b: 'bats', hello: 'all'}, {a: 2, c: 'color', hello: 'all'}]
     *
     */
    static add (data, props) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_ADD_DATA_INVALID)
        }

        if (!this.isObject(props)) {
            throw new TypeError(ERROR_MESSAGE_ADD_PROPS_INVALID)
        }

        if (this.isObject(data)) {
            _Object.merge(data, props, false)
        } else if (this.isArray(data)) {
            _Collection.merge(data, props, false)
        }
    }

    /**
     * Delete properties of an object or collection.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection from which properties will be deleted.
     * @param {String|Array} props The string or array defining properties to be deleted.
     * @returns {undefined} The passed `data` will be mutamaxd, no specific return is needed.
     * @example
     *
     *
     * mutamax.delete({a: 1, b: 'bats'}, 'a')
     * // => {b: 'bats'}
     *
     * mutamax.delete({a: 1, b: 'bats', c: 'color'}, ['a', 'c'])
     * // => {b: 'bats'}
     *
     * mutamax.delete([{a: 1, b: 'bats'}, {c: 'color' }], 'a')
     * // => [{b: 'bats'}, {c: 'color'}]
     *
     * mutamax.delete([{a: 1, b: 'bats'}, {c: 'color' }], ['a', 'c'])
     * // => [{b: 'bats'}, {}]
     *
     */
    static delete (data, props) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_DELETE_DATA_INVALID)
        }
        if (!(typeof props === 'string' || this.isArray(props))) {
            throw new TypeError(ERROR_MESSAGE_DELETE_PROPS_INVALID)
        }

        if (this.isObject(data)) {
            _Object.delete(data, props)
        } else if (this.isArray(data)) {
            _Collection.delete(data, props)
        }
    }

    /**
     * Rename properties of an object or collection.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection whose properties need to be renamed.
     * @param {Object} props The object defining the old property name in its key and the new property name in its value.
     * @returns {undefined} The passed `data` will be mutamaxd, no specific return is needed.
     * @example
     *
     *
     * mutamax.rename({a: 1, b: 'bats', c: 'color'}, {b: 'mammals', c: 'orange'})
     * // => {a: 1, mammals: 'bats', orange: 'color'}
     *
     * mutamax.rename([{a: 1, b: 'bats'}, {c: 'color'}], {b: 'mammals', c: 'orange'})
     * // => [{a: 1, mammals: 'bats'}, {orange: 'color'}]
     *
     */
    static rename (data, props) {
        const isReverseOrder = _Utils.isRenameReverseOrder
        _Utils.isRenameReverseOrder = false

        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_RENAME_DATA_INVALID)
        }

        if (!this.isObject(props)) {
            throw new TypeError(ERROR_MESSAGE_RENAME_PROPS_INVALID)
        }

        if (this.isObject(data)) {
            _Object.rename(data, props, isReverseOrder)
        } else if (this.isArray(data)) {
            _Collection.rename(data, props, isReverseOrder)
        }
    }

    /**
     * Rename properties of an object or collection in the direction opposite to how rename method does it.
     * Rename and renameReverse applied one after the other with the same parameters will yield object or collection with original naming.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection whose properties need to be renamed.
     * @param {Object} props The object defining the old property name in its value and the new property name in its key.
     * @returns {undefined} The passed `data` will be mutamaxd, no specific return is needed.
     * @example
     *
     *
     * mutamax.renameReverse({a: 1, b: 'bats', c: 'color'}, {mammals: 'b', orange: 'c'})
     * // => {a: 1, mammals: 'bats', orange: 'color'}
     *
     * mutamax.renameReverse([{a: 1, b: 'bats'}, {c: 'color', d: 'USD'}], {mammals: 'b', orange: 'c'})
     * // => [{a: 1, mammals: 'bats'}, {orange: 'color', d: 'USD'}]
     *
     */
    static renameReverse (data, props) {
        _Utils.isRenameReverseOrder = true
        this.rename(data, props)
    }

    /**
     * Delete all properties of an object or collection except those specified by the second argument.
     * Cleans up `data` from unnecessary properties.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection whose properties need to be cleaned up.
     * @param {Array} props The array defining properties that will be deleted from `data`.
     * @returns {undefined} The passed `data` will be mutamaxd, no specific return is needed.
     * @example
     *
     *
     * mutamax.limitTo({a: 1, b: 'bats', c: 'color'}, ['a', 'c'])
     * // => {a: 1, c: 'color'}
     *
     * mutamax.limitTo([{a: 1, b: 'bats'}, {c: 'color', d: 'USD'}], ['a', 'c'])
     * // => [{a: 1}, {c: 'color'}]
     *
     */
    static limitTo (data, props) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_LIMIT_TO_DATA_INVALID)
        }
        if (!this.isArray(props)) {
            throw new TypeError(ERROR_MESSAGE_LIMIT_TO_PROPS_INVALID)
        }

        if (this.isObject(data)) {
            _Object.limitTo(data, props)
        } else if (this.isArray(data)) {
            _Collection.limitTo(data, props)
        }
    }

    /**
     * Replace values of specified properties to another value in case they are equal to `ifEquals`.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection where values transformations will take place.
     * @param {Object} props The object defining property(s) whose values need to be changed.
     * @returns {undefined} The passed `data` will be mutamaxd, no specific return is needed.
     * @example
     *
     *
     * mutamax.replaceValueIfEquals({a: 1, b: null}, {property: 'b', ifEquals: null, replaceWith: ''})
     * // => {a: 1, b: ''}
     *
     * mutamax.replaceValueIfEquals({a: undefined, b: undefined, c: true}, {property: ['a', 'b'], ifEquals: undefined, replaceWith: null})
     * // => {a: null, b: null, c: true}
     *
     * mutamax.replaceValueIfEquals([{a: 1, b: 'bats'}, {a: 2, b: undefined}], {property: 'b', ifEquals: undefined, replaceWith: ''})
     * // => [{a: 1, b: 'bats'}, {a: 2, b: ''}]
     *
     * mutamax.replaceValueIfEquals([{a: '', b: ''}, {a: '', b: 'fruit'}], {property: ['a', 'b'], ifEquals: '', replaceWith: null})
     * // => [{a: null, b: null}, {a: null, b: 'fruit'}]
     *
     */
    static replaceValueIfEquals (data, props) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_DATA_INVALID)
        }

        if (!this.isObject(props)) {
            throw new TypeError(ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_INVALID)
        }

        if (this.isObject(data)) {
            _Object.replaceValueIfEquals(data, props)
        } else if (this.isArray(data)) {
            _Collection.replaceValueIfEquals(data, props)
        }
    }

    /**
     * Replace all values of object or collection - which equal to `ifEquals` - to another value.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection where values transformations will take place.
     * @param {Object} props The object defining values that need to be changed.
     * @returns {undefined} The passed `data` will be mutamaxd, no specific return is needed.
     * @example
     *
     *
     * mutamax.replaceAllValuesIfEquals({a: 1, b: null, c: null}, {ifEquals: null, replaceWith: ''})
     * // => {a: 1, b: '', c: ''}
     *
     * mutamax.replaceAllValuesIfEquals([{a: undefined, b: 'bats'}, {a: undefined, b: undefined}], {ifEquals: undefined, replaceWith: ''})
     * // => [{a: '', b: 'bats'}, {a: '', b: ''}]
     *
     */
    static replaceAllValuesIfEquals (data, props) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_DATA_INVALID)
        }

        if (!this.isObject(props)) {
            throw new TypeError(ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_PROPS_INVALID)
        }

        if (this.isObject(data)) {
            _Object.replaceAllValuesIfEquals(data, props)
        } else if (this.isArray(data)) {
            _Collection.replaceAllValuesIfEquals(data, props)
        }
    }

    /**
     * Capitalize first property character of object or collection.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection whose properties need to be changed
     * @returns {undefined} The passed `data` will be mutamaxd, no specific return is needed.
     * @example
     *
     *
     * mutamax.capitalizeFirstChar({a: 1, mammal: 'bats', color: 'c'})
     * // => {A: 1, Mammal: 'bats', Color: 'c'}
     *
     * mutamax.capitalizeFirstChar([{a: 1, mammal: 'bats'}, {color: 'c'}])
     * // => [{A: 1, Mammal: 'bats'}, {Color: 'c'}]
     *
     */
    static capitalizeFirstChar (data) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_CAPITALIZE_FIRST_CHAR_DATA_INVALID)
        }

        _Utils.changePropertyCaseFirstChar(data, 'toUpperCase')
    }

    /**
     * Decapitalize the first properties' character of object or collection.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection whose properties need to be changed
     * @returns {undefined} The passed `data` will be mutamaxd, no specific return is needed.
     * @example
     *
     *
     * mutamax.deCapitalizeFirstChar({A: 1, Mammal: 'bats', Color: 'c'})
     * // => {a: 1, mammal: 'bats', color: 'c'}
     *
     * mutamax.deCapitalizeFirstChar([{A: 1, Mammal: 'bats'}, {Color: 'c'}])
     * // => [{a: 1, mammal: 'bats'}, {color: 'c'}]
     *
     */
    static deCapitalizeFirstChar (data) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_DECAPITALIZE_FIRST_CHAR_DATA_INVALID)
        }

        _Utils.changePropertyCaseFirstChar(data, 'toLowerCase')
    }

    /**
     * Checks if value is an object.
     *
     * @since 0.1.0
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     *
     * mutamax.isObject({})
     * // => true
     *
     * mutamax.isObject(new Object())
     * // => true
     *
     * mutamax.isObject(Object('abc'))
     * // => false
     *
     * mutamax.isObject(null)
     * // => false
     *
     * mutamax.isObject((function getArgumentsObject() { return arguments })())
     * // => false
     */
    static isObject (value) {
        return Object.prototype.toString.call(value) === '[object Object]'
    }

    /**
     * Checks if value is an array.
     *
     * @since 0.1.0
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     *
     * mutamax.isArray([])
     * // => true
     *
     * mutamax.isArray(new Array())
     * // => true
     *
     * mutamax.isArray(Object('abc'))
     * // => false
     *
     * mutamax.isArray(null)
     * // => false
     *
     * mutamax.isArray((function getArgumentsObject() { return arguments })())
     * // => false
     */
    static isArray (value) {
        return Object.prototype.toString.call(value) === '[object Array]'
    }
}
