import { contractor } from '..'
import newDateContract from '../global-contract/new-date.contract'
import dummyFunctionContract from './dummy-function.contract'
import loggerContract from './logger.contract'
// import setTimeoutContract from '../node-global-contract/set-timeout.contract'

describe('new Date', () => {
  contractor(newDateContract.Date)
})
describe('dummyFunction', () => {
  contractor(dummyFunctionContract.add)
  contractor(dummyFunctionContract.sub)
})
describe('logger', () => {
  contractor(loggerContract.message)
  contractor(loggerContract.debug)
})

// describe('setTimeout', () => {
//   contractor(setTimeoutContract)
// })
