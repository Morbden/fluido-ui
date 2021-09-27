import { TypedMap } from '..'

interface DeepMergeOption<T = any> {
  arrayMerge?: (target: T[], source: T[], options?: DeepMergeOption) => T[]
  clone?: boolean
  customMerge?: (
    key: string,
    options?: DeepMergeOption,
  ) => ((x: T, y: T) => T) | undefined
  isMergeableObject?: (value: object) => boolean
}

const canUseSymbol = typeof Symbol === 'function' && Symbol.for
const REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7

function isReactElement(value: any) {
  return value.$$typeof === REACT_ELEMENT_TYPE
}

function isNonNullObject(value: any) {
  return !!value && typeof value === 'object'
}

function isSpecial(value: any) {
  var stringValue = Object.prototype.toString.call(value)

  return (
    stringValue === '[object RegExp]' ||
    stringValue === '[object Date]' ||
    isReactElement(value)
  )
}

function emptyTarget(val: any): any[] | {} {
  return Array.isArray(val) ? [] : {}
}

function defaultIsMergeableObject(value: any) {
  return isNonNullObject(value) && !isSpecial(value)
}

function defaultArrayMerge<T = any>(
  target: T[],
  source: T[],
  options: DeepMergeOption,
): T[] {
  return target.concat(source).map(function (element) {
    return cloneUnlessOtherwiseSpecified(element, options)
  })
}

function cloneUnlessOtherwiseSpecified(
  value: any,
  options: DeepMergeOption,
): any {
  return options.clone !== false &&
    (options.isMergeableObject || defaultIsMergeableObject)(value)
    ? deepmerge(emptyTarget(value), value, options)
    : value
}

export function deepmerge<T = any>(
  target: T,
  source: T,
  options: DeepMergeOption<T>,
): T {
  options = options || {}

  var sourceIsArray = Array.isArray(source)
  var targetIsArray = Array.isArray(target)
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray

  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options)
  } else if (sourceIsArray) {
    return (options.arrayMerge || (defaultArrayMerge as any))(
      target,
      source,
      options,
    )
  } else {
    return mergeObject<T>(target, source, options)
  }
}

function getMergeFunction(key: string, options: DeepMergeOption) {
  if (!options.customMerge) {
    return deepmerge
  }
  var customMerge = options.customMerge(key)
  return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target: any): any[] {
  return Object.getOwnPropertySymbols
    ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
        return target.propertyIsEnumerable(symbol)
      })
    : []
}

function getKeys(target: any) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object: any, property: string) {
  try {
    return property in object
  } catch (_) {
    return false
  }
}

function propertyIsUnsafe(target: any, key: string) {
  return (
    propertyIsOnObject(target, key) &&
    !(
      Object.hasOwnProperty.call(target, key) &&
      Object.propertyIsEnumerable.call(target, key)
    )
  )
}

function mergeObject<T = any>(
  target: T,
  source: T,
  options: DeepMergeOption,
): T {
  var destination: TypedMap = {}
  if (
    (options.isMergeableObject || (defaultIsMergeableObject as any))(target)
  ) {
    getKeys(target).forEach(function (key: string) {
      destination[key] = cloneUnlessOtherwiseSpecified(
        (target as any)[key],
        options,
      )
    })
  }
  getKeys(source).forEach(function (key) {
    if (propertyIsUnsafe(target, key)) {
      return
    }

    if (
      propertyIsOnObject(target, key) &&
      (options.isMergeableObject || defaultIsMergeableObject)(
        (source as any)[key],
      )
    ) {
      destination[key] = getMergeFunction(key, options)(
        (target as any)[key],
        (source as any)[key],
        options,
      )
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(
        (source as any)[key],
        options,
      )
    }
  })
  return destination as T
}

export function deepmergeAll(array: any[], options: DeepMergeOption) {
  if (!Array.isArray(array)) {
    throw new Error('first argument should be an array')
  }

  return array.reduce(function (prev, next) {
    return deepmerge(prev, next, options)
  }, {})
}
