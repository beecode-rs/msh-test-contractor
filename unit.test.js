// const { contractorTestRunner } = require('./lib/contract/contractor-test-runner')

// import 'module-alias/register'
// import 'source-map-support/register'
// import 'reflect-metadata'
// import { contractorTestRunner } from './contract/contractor-test-runner'
// import { contractorTestRunner } from '../lib/contract/contractor-test-runner'
const { contractorTestRunner } = require('./lib/contract/contractor-test-runner.js')

contractorTestRunner.dir('./src')
