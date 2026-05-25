[**@beecode/msh-test-contractor**](../../../README.md)

***

[@beecode/msh-test-contractor](../../../README.md) / [contract-mock/mock-vitest-strategy](../README.md) / MockVitestStrategy

# Class: MockVitestStrategy

Defined in: [packages/test-contractor/src/contract-mock/mock-vitest-strategy.ts:4](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/contract-mock/mock-vitest-strategy.ts#L4)

## Implements

- [`MockStrategy`](../../mock-strategy/interfaces/MockStrategy.md)

## Constructors

### Constructor

> **new MockVitestStrategy**(`_mock?`): `MockVitestStrategy`

Defined in: [packages/test-contractor/src/contract-mock/mock-vitest-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/contract-mock/mock-vitest-strategy.ts#L7)

#### Parameters

##### \_mock?

[`ContractMock`](../../../types/type-aliases/ContractMock.md)

#### Returns

`MockVitestStrategy`

## Properties

### \_mock?

> `protected` `readonly` `optional` **\_mock**: [`ContractMock`](../../../types/type-aliases/ContractMock.md)

Defined in: [packages/test-contractor/src/contract-mock/mock-vitest-strategy.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/contract-mock/mock-vitest-strategy.ts#L7)

***

### \_restoreMockFn?

> `protected` `optional` **\_restoreMockFn**: [`ContractMockRevertFns`](../../../types/type-aliases/ContractMockRevertFns.md)

Defined in: [packages/test-contractor/src/contract-mock/mock-vitest-strategy.ts:5](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/contract-mock/mock-vitest-strategy.ts#L5)

## Methods

### mock()

> **mock**(`mockParams?`): `void`

Defined in: [packages/test-contractor/src/contract-mock/mock-vitest-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/contract-mock/mock-vitest-strategy.ts#L10)

#### Parameters

##### mockParams?

###### params?

`any`[]

#### Returns

`void`

#### Implementation of

[`MockStrategy`](../../mock-strategy/interfaces/MockStrategy.md).[`mock`](../../mock-strategy/interfaces/MockStrategy.md#mock)

***

### restore()

> **restore**(): `void`

Defined in: [packages/test-contractor/src/contract-mock/mock-vitest-strategy.ts:18](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/contract-mock/mock-vitest-strategy.ts#L18)

#### Returns

`void`

#### Implementation of

[`MockStrategy`](../../mock-strategy/interfaces/MockStrategy.md).[`restore`](../../mock-strategy/interfaces/MockStrategy.md#restore)
