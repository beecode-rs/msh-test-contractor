import { contractor } from '..'

describe('new Date', () => {
  contractor.unitTestJest('src/node-global-contract/new-date.contract')
})
describe('dummyFunction.add', () => {
  contractor.unitTestJest('src/test/dummy-function.contract')
})
describe('logger._message', () => {
  contractor.unitTestJest('src/test/logger.contract')
})

// describe('setTimeout', () => {
//   contractor.unitTestJest('src/node-global-contract/set-timeout.contract')
// })
