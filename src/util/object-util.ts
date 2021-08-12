export const objectUtil = {
  get: (obj: any, path: string, defaultValue: any = undefined): any => {
    const travel = (regexp: any): any =>
      String.prototype.split
        .call(path, regexp)
        .filter(Boolean)
        .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj)
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
    return result === undefined || result === obj ? defaultValue : result
  },
}
