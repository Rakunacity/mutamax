/*
* Data transformations typically occurring while processing server requests/responses.
* */

'use strict'

const {
    ERROR_MESSAGE_MAP_DATA_INVALID, ERROR_MESSAGE_MAP_ITERATEE_INVALID,
    ERROR_MESSAGE_MERGE_DATA_INVALID, ERROR_MESSAGE_MERGE_PROPS_INVALID,
    ERROR_MESSAGE_ADD_DATA_INVALID, ERROR_MESSAGE_ADD_PROPS_INVALID,
    ERROR_MESSAGE_DELETE_DATA_INVALID, ERROR_MESSAGE_DELETE_PROPS_INVALID,
    ERROR_MESSAGE_RENAME_DATA_INVALID, ERROR_MESSAGE_RENAME_PROPS_INVALID,
    ERROR_MESSAGE_LIMIT_TO_DATA_INVALID, ERROR_MESSAGE_LIMIT_TO_PROPS_INVALID,
    ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_DATA_INVALID,
    ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_INVALID,
    ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_PROPERTY_INVALID,
    ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_DATA_INVALID,
    ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_PROPS_INVALID,
    ERROR_MESSAGE_CAPITALIZE_FIRST_CHAR_DATA_INVALID,
    ERROR_MESSAGE_DECAPITALIZE_FIRST_CHAR_DATA_INVALID,
    VERSION
} = require('./constants.js')

const mutamax = (function () {
    const Public = {}
    const Private = {
        isRenameReverseOrder: false
    }

    /**
     * Transforms `data` key-value pares by running each element of `data` through `iteratee`.
     * The iteratee is invoked with two arguments: key and value.
     * The expected output of iteratee is: {newKey: 'myNewKey', newValue: 'my-new-value'}.
     * `newKey` and/or `newValue` can be the same as before or transformed.
     *
     * @since 0.1.0
     * @param {object|Array<object>} data The object/collection to iterate over.
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
    Public.map = function (data, iteratee) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_MAP_DATA_INVALID)
        }

        if (Object.prototype.toString.call(iteratee) !== '[object Function]') {
            throw new TypeError(ERROR_MESSAGE_MAP_ITERATEE_INVALID)
        }

        if (this.isObject(data)) {
            Private.object.map(data, iteratee)
        } else if (this.isArray(data)) {
            Private.collection.map(data, iteratee)
        }
    }

    /**
     * Merge properties of an object into another object or collection.
     *
     * @since 0.1.0
     * @param {object|Array<object>} data The object or collection into which new properties will be merged.
     * @param {object} props The object defining merged properties and their values.
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
    Public.merge = function (data, props) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_MERGE_DATA_INVALID)
        }

        if (!this.isObject(props)) {
            throw new TypeError(ERROR_MESSAGE_MERGE_PROPS_INVALID)
        }

        if (this.isObject(data)) {
            Private.object.merge(data, props, true)
        } else if (this.isArray(data)) {
            Private.collection.merge(data, props, true)
        }
    }

    /**
     * Add non-existing properties of an object to another object or collection.
     *
     * @since 0.1.0
     * @param {object|Array<object>} data The object or collection to which new properties will be added.
     * @param {object} props The object defining new properties and their values.
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
    Public.add = function (data, props) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_ADD_DATA_INVALID)
        }

        if (!this.isObject(props)) {
            throw new TypeError(ERROR_MESSAGE_ADD_PROPS_INVALID)
        }

        if (this.isObject(data)) {
            Private.object.merge(data, props, false)
        } else if (this.isArray(data)) {
            Private.collection.merge(data, props, false)
        }
    }

    /**
     * Delete properties of an object or collection.
     *
     * @since 0.1.0
     * @param {object|Array<object>} data The object or collection from which properties will be deleted.
     * @param {string|Array<string>} props The string or array defining properties to be deleted.
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
    Public.delete = function (data, props) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_DELETE_DATA_INVALID)
        }
        if (!(typeof props === 'string' || this.isArray(props))) {
            throw new TypeError(ERROR_MESSAGE_DELETE_PROPS_INVALID)
        }

        if (this.isObject(data)) {
            Private.object.delete(data, props)
        } else if (this.isArray(data)) {
            Private.collection.delete(data, props)
        }
    }

    /**
     * Rename properties of an object or collection.
     *
     * @since 0.1.0
     * @param {object|Array<object>} data The object or collection whose properties need to be renamed.
     * @param {object} props The object defining the old property name in its key and the new property name in its value.
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
    Public.rename = function (data, props) {
        const isReverseOrder = Private.isRenameReverseOrder
        Private.isRenameReverseOrder = false

        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_RENAME_DATA_INVALID)
        }

        if (!this.isObject(props)) {
            throw new TypeError(ERROR_MESSAGE_RENAME_PROPS_INVALID)
        }

        if (this.isObject(data)) {
            Private.object.rename(data, props, isReverseOrder)
        } else if (this.isArray(data)) {
            Private.collection.rename(data, props, isReverseOrder)
        }
    }

    /**
     * Rename properties of an object or collection in the direction opposite to how rename method does it.
     * Rename and renameReverse applied one after the other with the same parameters will yield object or collection with original naming.
     *
     * @since 0.1.0
     * @param {object|Array<object>} data The object or collection whose properties need to be renamed.
     * @param {object} props The object defining the old property name in its value and the new property name in its key.
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
    Public.renameReverse = function (data, props) {
        Private.isRenameReverseOrder = true
        this.rename(data, props)
    }

    /**
     * Delete all properties of an object or collection except those specified by the second argument.
     * Cleans up `data` from unnecessary properties.
     *
     * @since 0.1.0
     * @param {object|Array<object>} data The object or collection whose properties need to be cleaned up.
     * @param {Array<string>} props The array defining properties that will be deleted from `data`.
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
    Public.limitTo = function (data, props) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_LIMIT_TO_DATA_INVALID)
        }
        if (!this.isArray(props)) {
            throw new TypeError(ERROR_MESSAGE_LIMIT_TO_PROPS_INVALID)
        }

        if (this.isObject(data)) {
            Private.object.limitTo(data, props)
        } else if (this.isArray(data)) {
            Private.collection.limitTo(data, props)
        }
    }

    /**
     * Replace values of specified properties to another value in case they are equal to `ifEquals`.
     *
     * @since 0.1.0
     * @param {object|Array<object>} data The object or collection where values transformations will take place.
     * @param {object} props The object defining property(s) whose values need to be changed.
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
    Public.replaceValueIfEquals = function (data, props) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_DATA_INVALID)
        }

        if (!this.isObject(props)) {
            throw new TypeError(ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_INVALID)
        }

        if (this.isObject(data)) {
            Private.object.replaceValueIfEquals(data, props)
        } else if (this.isArray(data)) {
            Private.collection.replaceValueIfEquals(data, props)
        }
    }

    /**
     * Replace all values of object or collection - which equal to `ifEquals` - to another value.
     *
     * @since 0.1.0
     * @param {object|Array<object>} data The object or collection where values transformations will take place.
     * @param {object} props The object defining values that need to be changed.
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
    Public.replaceAllValuesIfEquals = function (data, props) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_DATA_INVALID)
        }

        if (!this.isObject(props)) {
            throw new TypeError(ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_PROPS_INVALID)
        }

        if (this.isObject(data)) {
            Private.object.replaceAllValuesIfEquals(data, props)
        } else if (this.isArray(data)) {
            Private.collection.replaceAllValuesIfEquals(data, props)
        }
    }

    /**
     * Capitalize first property character of object or collection.
     *
     * @since 0.1.0
     * @param {object|Array<object>} data The object or collection whose properties need to be changed
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
    Public.capitalizeFirstChar = function (data) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_CAPITALIZE_FIRST_CHAR_DATA_INVALID)
        }

        Private.changePropertyCaseFirstChar(data, 'toUpperCase')
    }

    /**
     * Decapitalize the first properties' character of object or collection.
     *
     * @since 0.1.0
     * @param {object|Array<object>} data The object or collection whose properties need to be changed
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
    Public.deCapitalizeFirstChar = function (data) {
        if (!(this.isObject(data) || this.isArray(data))) {
            throw new TypeError(ERROR_MESSAGE_DECAPITALIZE_FIRST_CHAR_DATA_INVALID)
        }

        Private.changePropertyCaseFirstChar(data, 'toLowerCase')
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
    Public.isObject = function (value) {
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
    Public.isArray = function (value) {
        return Object.prototype.toString.call(value) === '[object Array]'
    }

    /**
     * The semantic version number.
     *
     * @static
     * @type {string}
     * @example
     *
     *
     * console.log(mutamax.VERSION)
     * // => 0.2.2
     */
    Public.VERSION = VERSION

    Private.object = {
        map: function (data, iteratee) {
            Object.entries(data).forEach(function (entry) {
                const key = entry[0]
                const value = entry[1]

                const {newKey, newValue} = iteratee(key, value)

                delete data[key]
                data[newKey] = newValue
            })
        },

        delete: function (data, props) {
            if (typeof props === 'string') {
                delete data[props]
            } else if (Public.isArray(props)) {
                props.forEach(function (property) {
                    delete data[property]
                })
            }
        },

        rename: function (data, props, isReverseOrder) {
            Object.entries(props).forEach(function (entry) {
                let newPropName = ''
                let oldPropName = ''

                if (isReverseOrder) {
                    newPropName = entry[0]
                    oldPropName = entry[1]
                } else {
                    newPropName = entry[1]
                    oldPropName = entry[0]
                }

                if (newPropName !== oldPropName && Object.prototype.hasOwnProperty.call(data, oldPropName)) {
                    const existingValue = data[oldPropName]
                    data[newPropName] = existingValue
                    delete data[oldPropName]
                }
            })
        },

        limitTo: function (data, props) {
            Object.keys(data).forEach((property) => {
                if (props.indexOf(property) === -1) {
                    delete data[property]
                }
            })
        },

        merge: function (data, props, isOverwriteExistingProps) {
            Object.entries(props).forEach(function (entry) {
                const [newPropName, newPropValue] = entry

                if (isOverwriteExistingProps) {
                    data[newPropName] = newPropValue
                } else {
                    if (!Object.prototype.hasOwnProperty.call(data, newPropName)) {
                        data[newPropName] = newPropValue
                    }
                }
            })
        },

        replaceAllValuesIfEquals: function (data, props) {
            Object.keys(data).forEach((property) => {
                if (data[property] === props.ifEquals) {
                    data[property] = props.replaceWith
                }
            })
        },

        replaceValueIfEquals: function (data, props) {
            const replace = (data, property, ifEquals, replaceWith) => {
                Object.keys(data).forEach((existingProperty) => {
                    if (existingProperty === property && data[existingProperty] === ifEquals) {
                        data[existingProperty] = replaceWith
                    }
                })
            }

            if (typeof props.property === 'string') {
                replace(data, props.property, props.ifEquals, props.replaceWith)
            } else if (Public.isArray(props.property)) {
                props.property.forEach((singleProperty) => {
                    replace(data, singleProperty, props.ifEquals, props.replaceWith)
                })
            } else {
                throw new TypeError(ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_PROPERTY_INVALID)
            }
        },

        changePropertyCaseFirstChar: function (data, capitalizationFunctionName) {
            Object.keys(data).forEach((property) => {
                const firstOriginalPropertyChar = property[0]
                const firstTransformedPropertyChar = firstOriginalPropertyChar[capitalizationFunctionName]()

                if (firstOriginalPropertyChar !== firstTransformedPropertyChar) {
                    data[firstTransformedPropertyChar + property.slice(1)] = data[property]
                    delete data[property]
                }
            })
        }

    }

    Private.collection = {
        map: function (data, iteratee) {
            data.forEach(function (item) {
                Private.object.map(item, iteratee)
            })
        },

        delete: function (data, props) {
            if (typeof props === 'string') {
                this.deleteSingleProp(data, props)
            } else if (Public.isArray(props)) {
                props.forEach(function (property) {
                    this.deleteSingleProp(data, property)
                }, this)
            }
        },

        deleteSingleProp: function (data, singleProp) {
            data.forEach(function (item) {
                delete item[singleProp]
            })
        },

        rename: function (data, props, isReverseOrder) {
            data.forEach(function (item) {
                Private.object.rename(item, props, isReverseOrder)
            })
        },

        limitTo: function (data, props) {
            data.forEach(function (item) {
                Private.object.limitTo(item, props)
            })
        },

        merge: function (data, props, isOverwriteExistingProps) {
            data.forEach(function (item) {
                Private.object.merge(item, props, isOverwriteExistingProps)
            })
        },

        replaceValueIfEquals: function (data, props) {
            data.forEach(function (item) {
                Private.object.replaceValueIfEquals(item, props)
            })
        },

        replaceAllValuesIfEquals: function (data, props) {
            data.forEach(function (item) {
                Private.object.replaceAllValuesIfEquals(item, props)
            })
        },

        changePropertyCaseFirstChar: function (data, capitalizationFunctionName) {
            data.forEach(function (item) {
                Private.object.changePropertyCaseFirstChar(item, capitalizationFunctionName)
            })
        }
    }

    Private.changePropertyCaseFirstChar = function (data, capitalizationFunctionName) {
        if (Public.isObject(data)) {
            Private.object.changePropertyCaseFirstChar(data, capitalizationFunctionName)
        } else if (Public.isArray(data)) {
            Private.collection.changePropertyCaseFirstChar(data, capitalizationFunctionName)
        }
    }

    return Public
}())

module.exports = mutamax
module.exports.default = module.exports // For TypeScript
