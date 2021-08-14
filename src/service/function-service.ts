import { objectUtil } from '../util/object-util'

export const functionService = {
  extract: ({ module, fnPath }: { module: any; fnPath: string }): any => {
    // if (module === global) return eval(fnPath)
    // if (fnPath.includes('.'))
    return objectUtil.get(module, fnPath)
  },
}
