import { contractor } from '..'
import dateContract from '../global-contract/date.contract'
import dummyFunctionContract from './dummy-function.contract'
import loggerContract from './logger.contract'
// import setTimeoutContract from '../node-global-contract/set-timeout.contract'

describe('Date', () => {
  contractor(dateContract, 'now')
  contractor(dateContract, '_constructor')
})
describe('dummyFunction', () => {
  contractor(dummyFunctionContract, 'add')
  contractor(dummyFunctionContract, 'sub')
})
describe('logger', () => {
  contractor(loggerContract, '_message')
  contractor(loggerContract, 'debug')
})

// describe('setTimeout', () => {
//   contractor(setTimeoutContract)
// })
