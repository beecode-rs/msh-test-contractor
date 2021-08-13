import { objectUtil } from '../util/object-util'

export const functionService = {
  extract: (source: any, fnPath: string): any => {
    if (source === global) return eval(fnPath)
    // if (fnPath.includes('.'))
    return objectUtil.get(source, fnPath)
  },
}
