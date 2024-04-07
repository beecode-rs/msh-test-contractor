[@beecode/msh-test-contractor](../README.md) / [jest-spy/jest-spy-function-strategy](../modules/jest_spy_jest_spy_function_strategy.md) / JestSpyFunctionStrategy

# Class: JestSpyFunctionStrategy

[jest-spy/jest-spy-function-strategy](../modules/jest_spy_jest_spy_function_strategy.md).JestSpyFunctionStrategy

## Implements

- [`JestSpyStrategy`](../interfaces/jest_spy_jest_spy_strategy.JestSpyStrategy.md)

## Table of contents

### Constructors

- [constructor](jest_spy_jest_spy_function_strategy.JestSpyFunctionStrategy.md#constructor)

### Properties

- [\_name](jest_spy_jest_spy_function_strategy.JestSpyFunctionStrategy.md#_name)
- [\_terms](jest_spy_jest_spy_function_strategy.JestSpyFunctionStrategy.md#_terms)

### Methods

- [mockImplementationFactory](jest_spy_jest_spy_function_strategy.JestSpyFunctionStrategy.md#mockimplementationfactory)

## Constructors

### constructor

• **new JestSpyFunctionStrategy**(`params`): [`JestSpyFunctionStrategy`](jest_spy_jest_spy_function_strategy.JestSpyFunctionStrategy.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.name` | `string` |
| `params.terms` | [`ContractTerm`](../modules/types.md#contractterm)[] |

#### Returns

[`JestSpyFunctionStrategy`](jest_spy_jest_spy_function_strategy.JestSpyFunctionStrategy.md)

#### Defined in

[jest-spy/jest-spy-function-strategy.ts:11](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/jest-spy/jest-spy-function-strategy.ts#L11)

## Properties

### \_name

• `Protected` `Readonly` **\_name**: `string`

#### Defined in

[jest-spy/jest-spy-function-strategy.ts:9](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/jest-spy/jest-spy-function-strategy.ts#L9)

___

### \_terms

• `Protected` `Readonly` **\_terms**: [`ContractTerm`](../modules/types.md#contractterm)[]

#### Defined in

[jest-spy/jest-spy-function-strategy.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/jest-spy/jest-spy-function-strategy.ts#L8)

## Methods

### mockImplementationFactory

▸ **mockImplementationFactory**(): `Mock`\<`any`\>

#### Returns

`Mock`\<`any`\>

#### Implementation of

[JestSpyStrategy](../interfaces/jest_spy_jest_spy_strategy.JestSpyStrategy.md).[mockImplementationFactory](../interfaces/jest_spy_jest_spy_strategy.JestSpyStrategy.md#mockimplementationfactory)

#### Defined in

[jest-spy/jest-spy-function-strategy.ts:17](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/jest-spy/jest-spy-function-strategy.ts#L17)
