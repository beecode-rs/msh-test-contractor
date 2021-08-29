import * as JestSpyClassFunctionStrategyModule from './jest-spy-class-function-strategy'
import * as JestSpyFunctionStrategyModule from './jest-spy-function-strategy'
import { jestSpyService } from './jest-spy-service'

describe('jestSpyService', () => {
  describe('strategyFromTerms', () => {
    let spy_JestSpyFunctionStrategy: jest.SpyInstance
    let spy_JestSpyClassFunctionStrategy: jest.SpyInstance
    beforeEach(() => {
      spy_JestSpyFunctionStrategy = jest.spyOn(JestSpyFunctionStrategyModule, 'JestSpyFunctionStrategy')
      spy_JestSpyClassFunctionStrategy = jest.spyOn(JestSpyClassFunctionStrategyModule, 'JestSpyClassFunctionStrategy')
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should throw error if terms are empty array', () => {
      expect(() => {
        jestSpyService.strategyFromTerms({ terms: [] })
      }).toThrow('Terms missing')
    })

    it('should return JestSpyFunctionStrategy if there is no constructorParams in params', () => {
      jestSpyService.strategyFromTerms({ terms: [{} as any] })
      expect(spy_JestSpyFunctionStrategy).toHaveBeenCalledTimes(1)
      expect(spy_JestSpyClassFunctionStrategy).toHaveBeenCalledTimes(0)
    })

    it('should return JestSpyClassFunctionStrategy if there is constructorParams in params', () => {
      jestSpyService.strategyFromTerms({ terms: [{ constructorParams: [] } as any] })
      expect(spy_JestSpyFunctionStrategy).toHaveBeenCalledTimes(1)
      expect(spy_JestSpyClassFunctionStrategy).toHaveBeenCalledTimes(0)
    })
  })
})
