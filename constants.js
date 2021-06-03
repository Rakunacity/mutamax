// used in tests too

'use strict'

const ERROR_MESSAGE_MERGE_DATA_INVALID = 'mutamax.merge -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_MERGE_PROPS_INVALID = 'mutamax.merge -- Invalid `props` passed. Expected <Object>.'

const ERROR_MESSAGE_ADD_DATA_INVALID = 'mutamax.add -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_ADD_PROPS_INVALID = 'mutamax.add -- Invalid `props` passed. Expected <Object>.'

const ERROR_MESSAGE_DELETE_DATA_INVALID = 'mutamax.delete -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_DELETE_PROPS_INVALID = 'mutamax.delete -- Invalid `props` passed. Expected <String> or <Array>.'

const ERROR_MESSAGE_RENAME_DATA_INVALID = 'mutamax.rename -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_RENAME_PROPS_INVALID = 'mutamax.rename -- Invalid `props` passed. Expected <Object>.'

const ERROR_MESSAGE_RENAME_REVERSE_DATA_INVALID = ERROR_MESSAGE_RENAME_DATA_INVALID
const ERROR_MESSAGE_RENAME_REVERSE_PROPS_INVALID = ERROR_MESSAGE_RENAME_PROPS_INVALID
const ERROR_MESSAGE_LIMIT_TO_DATA_INVALID = 'mutamax.limitTo -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_LIMIT_TO_PROPS_INVALID = 'mutamax.limitTo -- Invalid `props` passed. Expected <Array>.'
const ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_DATA_INVALID = 'mutamax.replaceValueIfEquals -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_INVALID = 'mutamax.replaceValueIfEquals -- Invalid `props` passed. Expected <Object>.'
const ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_PROPERTY_INVALID = 'mutamax.replaceValueIfEquals -- Invalid `property` passed inside `props` object. Expected <String> or <Array>.'

const ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_DATA_INVALID = 'mutamax.replaceAllValuesIfEquals -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_PROPS_INVALID = 'mutamax.replaceAllValuesIfEquals -- Invalid `props` passed. Expected <Object>.'

const ERROR_MESSAGE_CAPITALIZE_FIRST_CHAR_DATA_INVALID = 'mutamax.capitalizeFirstChar -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_DECAPITALIZE_FIRST_CHAR_DATA_INVALID = 'mutamax.deCapitalizeFirstChar -- Invalid `data` passed. Expected <Object> or <Array>.'

const ERROR_MESSAGE_MAP_DATA_INVALID = 'mutamax.map -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_MAP_ITERATEE_INVALID = 'mutamax.map -- Invalid `iteratee` passed. Expected <Function>.'

/* eslint-disable no-sparse-arrays */
const falsey = [, null, undefined, false, 0, NaN, '']

const VERSION = '0.2.2'

module.exports = {
    ERROR_MESSAGE_MAP_DATA_INVALID,
    ERROR_MESSAGE_MAP_ITERATEE_INVALID,

    ERROR_MESSAGE_MERGE_DATA_INVALID,
    ERROR_MESSAGE_MERGE_PROPS_INVALID,

    ERROR_MESSAGE_ADD_DATA_INVALID,
    ERROR_MESSAGE_ADD_PROPS_INVALID,

    ERROR_MESSAGE_DELETE_DATA_INVALID,
    ERROR_MESSAGE_DELETE_PROPS_INVALID,

    ERROR_MESSAGE_RENAME_DATA_INVALID,
    ERROR_MESSAGE_RENAME_PROPS_INVALID,

    ERROR_MESSAGE_RENAME_REVERSE_DATA_INVALID,
    ERROR_MESSAGE_RENAME_REVERSE_PROPS_INVALID,

    ERROR_MESSAGE_LIMIT_TO_DATA_INVALID,
    ERROR_MESSAGE_LIMIT_TO_PROPS_INVALID,

    ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_DATA_INVALID,
    ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_INVALID,
    ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_PROPERTY_INVALID,
    ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_DATA_INVALID,
    ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_PROPS_INVALID,

    ERROR_MESSAGE_CAPITALIZE_FIRST_CHAR_DATA_INVALID,
    ERROR_MESSAGE_DECAPITALIZE_FIRST_CHAR_DATA_INVALID,
    falsey,
    VERSION
}
