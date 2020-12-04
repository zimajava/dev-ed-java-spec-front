import { allPass, type, o, equals, either, isNil, complement } from 'ramda';

const isNotNil = complement(isNil);

/**
 * Returns true if the argument is a plain object.
 *
 * @func
 * @category Type
 *
 * @param {any} x value to test
 * @return {boolean} whether the argument is a plain object
 *
 * @example
 *
 *        R_.isPlainObject({}) // true
 *        R_.isPlainObject([]) // false
 *        R_.isPlainObject(null) // false
 *
 * @sig a -> Boolean
 */
export const isPlainObject = allPass([
  o(equals('Object'), type),
  isNotNil,
  either(
    o(equals(Object.prototype), Object.getPrototypeOf),
    // NOTE: prototype is null if created using Object.create(null)
    o(isNil, Object.getPrototypeOf),
  ),
]);
