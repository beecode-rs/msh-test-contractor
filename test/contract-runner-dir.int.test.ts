import { contractorTestRunner } from '../src/contract/contractor-test-runner.js'

contractorTestRunner.dir('./test').catch((err: unknown) => {
	// eslint-disable-next-line no-console
	console.debug('Error running tests:', err)
})
// contractorTestRunner.file('./test/simple-function.contract.ts')
