import mutamax from './mutamax'

import {
    ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_PROPERTY_INVALID
} from './constants.js'

export class _Object {
    static map (data, iteratee) {
        Object.entries(data).forEach(function (entry) {
            const key = entry[0]
            const value = entry[1]

            const {newKey, newValue} = iteratee(key, value)

            delete data[key]
            data[newKey] = newValue
        })
    }

    static delete (data, props) {
        if (typeof props === 'string') {
            delete data[props]
        } else if (mutamax.isArray(props)) {
            props.forEach(function (property) {
                delete data[property]
            })
        }
    }

    static rename (data, props, isReverseOrder) {
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
    }

    static limitTo (data, props) {
        Object.keys(data).forEach((property) => {
            if (props.indexOf(property) === -1) {
                delete data[property]
            }
        })
    }

    static merge (data, props, isOverwriteExistingProps) {
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
    }

    static replaceAllValuesIfEquals (data, props) {
        Object.keys(data).forEach((property) => {
            if (data[property] === props.ifEquals) {
                data[property] = props.replaceWith
            }
        })
    }

    static replaceValueIfEquals (data, props) {
        const replace = (data, property, ifEquals, replaceWith) => {
            Object.keys(data).forEach((existingProperty) => {
                if (existingProperty === property && data[existingProperty] === ifEquals) {
                    data[existingProperty] = replaceWith
                }
            })
        }

        if (typeof props.property === 'string') {
            replace(data, props.property, props.ifEquals, props.replaceWith)
        } else if (mutamax.isArray(props.property)) {
            props.property.forEach((singleProperty) => {
                replace(data, singleProperty, props.ifEquals, props.replaceWith)
            })
        } else {
            throw new TypeError(ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_PROPERTY_INVALID)
        }
    }

    static changePropertyCaseFirstChar (data, capitalizationFunctionName) {
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
