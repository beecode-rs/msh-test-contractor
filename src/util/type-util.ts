export const typeUtil = {
  isClass: (module: any): boolean => {
    return typeUtil.isObject(module) && typeUtil.isFunction(module)
  },
  isObject: (module: any): boolean => {
    return module instanceof Object
  },
  isFunction: (module: any): boolean => {
    return module instanceof Function
  },
}
