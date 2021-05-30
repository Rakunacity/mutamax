import mutamax from './mutamax'
import {_Object} from './_object'

export class _Collection {
    static map (data, iteratee) {
        data.forEach(function (item) {
            _Object.map(item, iteratee)
        })
    }

    static delete (data, props) {
        if (typeof props === 'string') {
            _Collection.deleteSingleProp(data, props)
        } else if (mutamax.isArray(props)) {
            props.forEach(function (property) {
                _Collection.deleteSingleProp(data, property)
            })
        }
    }

    static deleteSingleProp (data, singleProp) {
        data.forEach(function (item) {
            delete item[singleProp]
        })
    }

    static rename (data, props, isReverseOrder) {
        data.forEach(function (item) {
            _Object.rename(item, props, isReverseOrder)
        })
    }

    static limitTo (data, props) {
        data.forEach(function (item) {
            _Object.limitTo(item, props)
        })
    }

    static merge (data, props, isOverwriteExistingProps) {
        data.forEach(function (item) {
            _Object.merge(item, props, isOverwriteExistingProps)
        })
    }

    static replaceValueIfEquals (data, props) {
        data.forEach(function (item) {
            _Object.replaceValueIfEquals(item, props)
        })
    }

    static replaceAllValuesIfEquals (data, props) {
        data.forEach(function (item) {
            _Object.replaceAllValuesIfEquals(item, props)
        })
    }

    static changePropertyCaseFirstChar (data, capitalizationFunctionName) {
        data.forEach(function (item) {
            _Object.changePropertyCaseFirstChar(item, capitalizationFunctionName)
        })
    }
}
