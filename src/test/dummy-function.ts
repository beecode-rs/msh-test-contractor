import { DummyClass } from './dummy-class'
import { logger } from './logger'

export const dummyFunction = {
  add: (a: number, b: number): number => {
    logger.debug(`add ${a} and ${b}`)
    return a + b
  },
  sub: (a: number, b: number): number => {
    logger.debug(`sub ${a} and ${b}`)
    return a - b
  },
  callClass: (a: number, b: number, c: number): number => {
    const someClass = new DummyClass(a, b)
    return someClass.add(c)
  },
}
