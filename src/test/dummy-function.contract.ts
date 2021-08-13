import { Contract } from '../contract-type/contract'
import { SubjectSourceType } from '../contract-type/subject-source-type'

export default {
  subject: {
    fn: 'dummyFunction.add',
    source: require('./dummy-function'),
    sourceType: SubjectSourceType.MODULE,
  },
  terms: [
    {
      params: [1, 2],
      result: 3,
    },
  ],
} as Contract
