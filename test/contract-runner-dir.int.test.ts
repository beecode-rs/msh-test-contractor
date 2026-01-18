import { contractorTestRunner } from '../src/contract/contractor-test-runner.js'
import { logger } from 'logger.js'

contractorTestRunner.dir('./test').catch((err: unknown) => {
	logger.debug(`Error running tests:${JSON.stringify(err)}`)
})
// contractorTestRunner.file('./test/simple-function.contract.ts')
