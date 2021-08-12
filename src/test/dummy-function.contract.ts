export default {
  subject: {
    fn: 'dummyFunction.add',
    module: require('./dummy-function'),
  },
  contracts: [
    {
      inputParams: [1, 2],
      result: 3,
    },
  ],
}
