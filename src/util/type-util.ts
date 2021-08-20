export const typeUtil = {
  isClass: (module: any): boolean => {
    return module instanceof Object && module instanceof Function
  },
  isObject: (module: any): boolean => {
    return module instanceof Object
  },
}
