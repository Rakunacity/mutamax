/*
// Type definitions for mutamax
*/
declare type fnObjectIteratee = (key: string, value: any) => object;
declare type ifEquals = {
  property: string | Array<string>,
  ifEquals: any,
  replaceWith: any
};
declare type ifEqualsReplaceAll = {
  ifEquals: any,
  replaceWith: any
};

declare interface mutamax {
  map(data: object | Array<object>, iteratee: fnObjectIteratee): void;

  merge(data: object | Array<object>, props: object): void;

  add(data: object | Array<object>, props: object): void;

  delete(data: object | Array<object>, props: string | Array<string>): void;

  rename(data: object | Array<object>, props: object): void;

  renameReverse(data: object | Array<object>, props: object): void;

  limitTo(data: object | Array<object>, props: Array<string>): void;

  replaceValueIfEquals(data: object | Array<object>, props: ifEquals): void;

  replaceAllValuesIfEquals(data: object | Array<object>, props: ifEqualsReplaceAll): void;

  capitalizeFirstChar(data: object | Array<object>): void;

  deCapitalizeFirstChar(data: object | Array<object>): void;

  isObject(data: any): boolean;

  isArray(data: any): boolean;

  VERSION: string;
}

declare const mutamax: mutamax;
export = mutamax;
/*
on 'export = smth' usage
FROM: https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html
"Note that using export default in your .d.ts files requires esModuleInterop: true to work.
If you can’t have esModuleInterop: true in your project, such as when you’re submitting a PR to Definitely Typed,
you’ll have to use the export= syntax instead. This older syntax is harder to use but works everywhere.
Here’s how the above example would have to be written using export=:"
*/
