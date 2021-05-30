// used in tests too

const ERROR_MESSAGE_MERGE_DATA_INVALID = 'mutate.merge -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_MERGE_PROPS_INVALID = 'mutate.merge -- Invalid `props` passed. Expected <Object>.'

const ERROR_MESSAGE_ADD_DATA_INVALID = 'mutate.add -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_ADD_PROPS_INVALID = 'mutate.add -- Invalid `props` passed. Expected <Object>.'

const ERROR_MESSAGE_DELETE_DATA_INVALID = 'mutate.delete -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_DELETE_PROPS_INVALID = 'mutate.delete -- Invalid `props` passed. Expected <String> or <Array>.'

const ERROR_MESSAGE_RENAME_DATA_INVALID = 'mutate.rename -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_RENAME_PROPS_INVALID = 'mutate.rename -- Invalid `props` passed. Expected <Object>.'

const ERROR_MESSAGE_RENAME_REVERSE_DATA_INVALID = ERROR_MESSAGE_RENAME_DATA_INVALID
const ERROR_MESSAGE_RENAME_REVERSE_PROPS_INVALID = ERROR_MESSAGE_RENAME_PROPS_INVALID
const ERROR_MESSAGE_LIMIT_TO_DATA_INVALID = 'mutate.limitTo -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_LIMIT_TO_PROPS_INVALID = 'mutate.limitTo -- Invalid `props` passed. Expected <Array>.'
const ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_DATA_INVALID = 'mutate.replaceValueIfEquals -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_INVALID = 'mutate.replaceValueIfEquals -- Invalid `props` passed. Expected <Object>.'
const ERROR_MESSAGE_REPLACE_VALUE_IF_EQUALS_PROPS_PROPERTY_INVALID = 'mutate.replaceValueIfEquals -- Invalid `property` passed inside `props` object. Expected <String> or <Array>.'

const ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_DATA_INVALID = 'mutate.replaceAllValuesIfEquals -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_REPLACE_ALL_VALUES_IF_EQUALS_PROPS_INVALID = 'mutate.replaceAllValuesIfEquals -- Invalid `props` passed. Expected <Object>.'

const ERROR_MESSAGE_CAPITALIZE_FIRST_CHAR_DATA_INVALID = 'mutate.capitalizeFirstChar -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_DECAPITALIZE_FIRST_CHAR_DATA_INVALID = 'mutate.deCapitalizeFirstChar -- Invalid `data` passed. Expected <Object> or <Array>.'

const ERROR_MESSAGE_MAP_DATA_INVALID = 'mutate.map -- Invalid `data` passed. Expected <Object> or <Array>.'
const ERROR_MESSAGE_MAP_ITERATEE_INVALID = 'mutate.map -- Invalid `iteratee` passed. Expected <Function>.'

/* eslint-disable no-sparse-arrays */
const falsey = [, null, undefined, false, 0, NaN, '']

const VERSION = '0.1.0'

export {
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
