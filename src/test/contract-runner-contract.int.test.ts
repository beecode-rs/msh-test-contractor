import { contractorRunner } from '../contract/contractor-runner'
import dateContract from '../global-contract/date.contract'
import dummyFunctionContract from './dummy-function.contract'
import loggerContract from './logger.contract'

contractorRunner.contract(dateContract)
contractorRunner.contract(dummyFunctionContract)
contractorRunner.contract(loggerContract)
