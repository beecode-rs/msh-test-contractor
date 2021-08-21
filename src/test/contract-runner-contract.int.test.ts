import { contractorTestRunner } from '../contract/contractor-test-runner'
import dateContract from '../global-contract/date.contract'
import dummyFunctionContract from './dummy-function.contract'
import loggerContract from './logger.contract'

contractorTestRunner.contract(dateContract)
contractorTestRunner.contract(dummyFunctionContract)
contractorTestRunner.contract(loggerContract)
