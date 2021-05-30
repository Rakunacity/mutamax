# mutate

#### v0.1.0

[Email](mailto:rakunacity.printless@aleeas.com)

## Description

Mutate JavaScript library provides convenient methods for common transformations of objects and collections:   
adding, removing, renaming objects' properties, and merging. The original object or collection is mutated. Only own and
enumerable properties of objects will be affected.

It is especially useful for mass transformations inside collections - arrays of objects.

Most common use case for mutate library is probably transforming data received from server as oftentimes it cannot be
consumed by front-end right away: due to different naming, properties having `null` values instead of `0`, `undefined`
instead of empty string, etc. Also mutate can be used for preparing data for POST/PUT requests as, again, often server
cannot consume it in the form it exists on front-end.

## Usage Example

Without <b>mutate</b> library the example below would contain 2 nested loops with different manual transformations,
in case of a collection.
```js
function fetchData() {
    fetch('https://bank.com/accounts')
        .then(response => {

            // Let's clean up the response before putting it into <form /> on our webpage.

            // Some fields coming from server have naming that does not reflect how form controls   
            // are named on the interface. Plus they sound weird - `GrpSavAccount`!) 
            // We do not want to use this naming at all.
            mutate.rename(response, {GrpSavAccount: 'savingsAccount', IDPartner: 'bankBranchId'})

            // Account balances can come as `null` if the account was not initialized yet,
            // but we cannot display `null` on the interface as it has no meaning for the user.
            // Let's correct it.
            mutate.replaceValueIfEquals(response, {
                property: ['savingsAccountBalance', 'checkingAccountBalance'],
                ifEquals: null,
                replaceWith: 'N/A'
            })

            this.response = response
        })
}

function postData(request) {

    // Let's clean up the request now.

    // A 3d-party library that we use for forms polluted our data with unnecessary properties.
    mutate.delete(request, ['_id', '_mousePos'])

    // Some values were not changed by the user, so let's change them back to server defaults.
    mutate.replaceValueIfEquals(request, {
        property: ['savingsAccountBalance'],
        ifEquals: 'N/A',
        replaceWith: null
    })

    // Let's do renaming of properties back into what they were to make server-side happy.
    mutate.renameReverse(request, {GrpSavAccount: 'savingsAccount', IDPartner: 'branchId'})

    fetch('https://example.com/profile', {
        method: 'POST',
        body: request,
    }).then(response => alert('data posted'))
}
````

## Installation

Using npm:

```shell
$ npm i -g npm
$ npm i mutate
```

Note: add `--save` if you are using npm < 5.0.0

## Help

### add

```js
    /**
     * Add non-existing properties of an object to another object or collection.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection to which new properties will be added.
     * @param {Object} props The object defining new properties and their values.
     * @returns {undefined} The passed `data` will be mutated, no specific return is needed.
     * @example
     */
    
    mutate.add({a: 1, b: 'bats'}, {a: 2, hello: 'all'})
    // => {a: 1, b: 'bats', hello: 'all'}
    
    mutate.add([{a: 1, b: 'bats'}, {c: 'color'}], {a: 2, hello: 'all'})
    // => [{a: 1, b: 'bats', hello: 'all'}, {a: 2, c: 'color', hello: 'all'}]
```

### delete

```js
    /**
     * Delete properties of an object or collection.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection from which properties will be deleted.
     * @param {String|Array} props The string or array defining properties to be deleted.
     * @returns {undefined} The passed `data` will be mutated, no specific return is needed.
     * @example
     */
    
    mutate.delete({a: 1, b: 'bats'}, 'a')
    // => {b: 'bats'}
    
    mutate.delete({a: 1, b: 'bats', c: 'color'}, ['a', 'c'])
    // => {b: 'bats'}
    
    mutate.delete([{a: 1, b: 'bats'}, {c: 'color'}], 'a')
    // => [{b: 'bats'}, {c: 'color'}]
    
    mutate.delete([{a: 1, b: 'bats'}, {c: 'color'}], ['a', 'c'])
    // => [{b: 'bats'}, {}]
```

### rename

```js
    /**
     * Rename properties of an object or collection.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection whose properties need to be renamed.
     * @param {Object} props The object defining the old property name in its key and the new property name in its value.
     * @returns {undefined} The passed `data` will be mutated, no specific return is needed.
     * @example
     */
    
    mutate.rename({a: 1, b: 'bats', c: 'color'}, {b: 'mammals', c: 'orange'})
    // => {a: 1, mammals: 'bats', orange: 'color'}
    
    mutate.rename([{a: 1, b: 'bats'}, {c: 'color'}], {b: 'mammals', c: 'orange'})
    // => [{a: 1, mammals: 'bats'}, {orange: 'color'}]
```

### renameReverse

```js
    /**
     * Rename properties of an object or collection in the direction opposite to how rename method does it.
     * Rename and renameReverse applied one after the other with the same parameters will yield object or collection with original naming.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection whose properties need to be renamed.
     * @param {Object} props The object defining the old property name in its value and the new property name in its key.
     * @returns {undefined} The passed `data` will be mutated, no specific return is needed.
     * @example
     */
    
    mutate.renameReverse({a: 1, b: 'bats', c: 'color'}, {mammals: 'b', orange: 'c'})
    // => {a: 1, mammals: 'bats', orange: 'color'}
    
    mutate.renameReverse([{a: 1, b: 'bats'}, {c: 'color', d: 'USD'}], {mammals: 'b', orange: 'c'})
    // => [{a: 1, mammals: 'bats'}, {orange: 'color', d: 'USD'}]
```

### limitTo

```js
    /**
     * Delete all properties of an object or collection except those specified by the second argument.
     * Cleans up `data` from unnecessary properties.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection whose properties need to be cleaned up.
     * @param {Array} props The array defining properties that will be deleted from `data`.
     * @returns {undefined} The passed `data` will be mutated, no specific return is needed.
     * @example
     */
    
    mutate.limitTo({a: 1, b: 'bats', c: 'color'}, ['a', 'c'])
    // => {a: 1, c: 'color'}
    
    mutate.limitTo([{a: 1, b: 'bats'}, {c: 'color', d: 'USD'}], ['a', 'c'])
    // => [{a: 1}, {c: 'color'}]
```

### replaceValueIfEquals

```js
    /**
     * Replace values of specified properties to another value in case they are equal to `ifEquals`.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection where values transformations will take place.
     * @param {Object} props The object defining property(s) whose values need to be changed.
     * @returns {undefined} The passed `data` will be mutated, no specific return is needed.
     * @example
     */
    
    mutate.replaceValueIfEquals({a: 1, b: null}, {property: 'b', ifEquals: null, replaceWith: ''})
    // => {a: 1, b: ''}
    
    mutate.replaceValueIfEquals({a: undefined, b: undefined, c: true}, {
        property: ['a', 'b'],
        ifEquals: undefined,
        replaceWith: null
    })
    // => {a: null, b: null, c: true}
    
    mutate.replaceValueIfEquals([{a: 1, b: 'bats'}, {a: 2, b: undefined}], {
        property: 'b',
        ifEquals: undefined,
        replaceWith: ''
    })
    // => [{a: 1, b: 'bats'}, {a: 2, b: ''}]
    
    mutate.replaceValueIfEquals([{a: '', b: ''}, {a: '', b: 'fruit'}], {
        property: ['a', 'b'],
        ifEquals: '',
        replaceWith: null
    })
    // => [{a: null, b: null}, {a: null, b: 'fruit'}]
```

### replaceAllValuesIfEquals

```js
    /**
     * Replace all values of object or collection - which equal to `ifEquals` - to another value.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection where values transformations will take place.
     * @param {Object} props The object defining values that need to be changed.
     * @returns {undefined} The passed `data` will be mutated, no specific return is needed.
     * @example
     */
    
    mutate.replaceAllValuesIfEquals({a: 1, b: null, c: null}, {ifEquals: null, replaceWith: ''})
    // => {a: 1, b: '', c: ''}
    
    mutate.replaceAllValuesIfEquals([{a: undefined, b: 'bats'}, {a: undefined, b: undefined}], {
        ifEquals: undefined,
        replaceWith: ''
    })
    // => [{a: '', b: 'bats'}, {a: '', b: ''}]
```

### capitalizeFirstChar

```js
    /**
     * Capitalize first property character of object or collection.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection whose properties need to be changed
     * @returns {undefined} The passed `data` will be mutated, no specific return is needed.
     * @example
     */
    
    mutate.capitalizeFirstChar({a: 1, mammal: 'bats', color: 'c'})
    // => {A: 1, Mammal: 'bats', Color: 'c'}
    
    mutate.capitalizeFirstChar([{a: 1, mammal: 'bats'}, {color: 'c'}])
    // => [{A: 1, Mammal: 'bats'}, {Color: 'c'}]
```

### deCapitalizeFirstChar

```js
     /**
     * Decapitalize the first properties' character of object or collection.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection whose properties need to be changed
     * @returns {undefined} The passed `data` will be mutated, no specific return is needed.
     * @example
     */
    
    mutate.deCapitalizeFirstChar({A: 1, Mammal: 'bats', Color: 'c'})
    // => {a: 1, mammal: 'bats', color: 'c'}
    
    mutate.deCapitalizeFirstChar([{A: 1, Mammal: 'bats'}, {Color: 'c'}])
    // => [{a: 1, mammal: 'bats'}, {color: 'c'}]
```

### map

```js
    /**
     * Transforms `data` key-value pares by running each element of `data` through `iteratee`.
     * The iteratee is invoked with two arguments: key and value.
     * The expected output of iteratee is: {newKey: 'myNewKey', newValue: 'my-new-value'}.
     * `newKey` and/or `newValue` can be the same as before or transformed.
     *
     * @since 0.1.0
     * @param {Array|Object} data The object/collection to iterate over.
     * @param {Function} iteratee The iteratee to transform key/value pares. Expected output of iteratee is: {newKey: 'myNewKey', newValue: 'my-new-value'}
     * @returns {undefined} The passed `data` will be mutated, no specific return is needed.
     * @example
     */
    mutate.map({a: 1, b: 'bats'}, function (key, value) {
        let newValue
    
        if (typeof value == 'number') {
            newValue = value.toString()
        } else {
            newValue = value
        }
    
        return {newKey: key.toUpperCase(), newValue: newValue}
    })
    // => {A: '1', B: 'bats'}
    
    mutate.map([{a: 1, b: 'bats'}, {c: 'color'}], function (key, value) {
        let newKey, newValue
    
        if (typeof value == 'number') {
            newValue = value.toString()
        } else if (typeof value == 'string') {
            newValue = value.toUpperCase()
        }
    
        return {newKey: key, newValue: newValue}
    })
    // => [{a: '1', b: 'BATS'}, {c: 'COLOR'}]
````

### merge

```js
    /**
     * Merge properties of an object to another object or collection.
     *
     * @since 0.1.0
     * @param {Object|Collection} data The object or collection to which new properties will be merged.
     * @param {Object} props The object defining merged properties and their values.
     * @returns {undefined} The passed `data` will be mutated, no specific return is needed.
     * @example
     */
    
    mutate.merge({a: 1, b: 'bats'}, {a: 2, hello: 'all'})
    // => {a: 2, b: 'bats', hello: 'all'}
    
    mutate.merge([{a: 1, b: 'bats'}, {c: 'color'}], {a: 2, hello: 'all'})
    // => [{a: 2, b: 'bats', hello: 'all'}, {a: 2, c: 'color', hello: 'all'}]
```     

### isObject

```js
    /**
     * Checks if value is an object.
     *
     * @since 0.1.0
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     */
    
    mutate.isObject({})
    // => true
    
    mutate.isObject(new Object())
    // => true
    
    mutate.isObject(Object('abc'))
    // => false
    
    mutate.isObject(null)
    // => false
    
    mutate.isObject((function getArgumentsObject() {
        return arguments
    })())
    // => false
```

### isArray

```js
    /**
     * Checks if value is an array.
     *
     * @since 0.1.0
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     */
    
    mutate.isArray([])
    // => true
    
    mutate.isArray(new Array())
    // => true
    
    mutate.isArray(Object('abc'))
    // => false
    
    mutate.isArray(null)
    // => false
    
    mutate.isArray((function getArgumentsObject() {
        return arguments
    })())
    // => false
```

### VERSION

```js
    /**
     * The semantic version number.
     *
     * @static
     * @type {string}
     * @example
     */
    
    console.log(mutate.VERSION)
    // => 0.1.0 
```
