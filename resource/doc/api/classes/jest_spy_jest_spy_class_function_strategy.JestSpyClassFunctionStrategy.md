[@beecode/msh-test-contractor](../README.md) / [jest-spy/jest-spy-class-function-strategy](../modules/jest_spy_jest_spy_class_function_strategy.md) / JestSpyClassFunctionStrategy

# Class: JestSpyClassFunctionStrategy

[jest-spy/jest-spy-class-function-strategy](../modules/jest_spy_jest_spy_class_function_strategy.md).JestSpyClassFunctionStrategy

## Implements

- [`JestSpyStrategy`](../interfaces/jest_spy_jest_spy_strategy.JestSpyStrategy.md)

## Table of contents

### Constructors

- [constructor](jest_spy_jest_spy_class_function_strategy.JestSpyClassFunctionStrategy.md#constructor)

### Properties

- [\_mockClassParams](jest_spy_jest_spy_class_function_strategy.JestSpyClassFunctionStrategy.md#_mockclassparams)
- [\_name](jest_spy_jest_spy_class_function_strategy.JestSpyClassFunctionStrategy.md#_name)
- [\_terms](jest_spy_jest_spy_class_function_strategy.JestSpyClassFunctionStrategy.md#_terms)

### Methods

- [mockImplementationFactory](jest_spy_jest_spy_class_function_strategy.JestSpyClassFunctionStrategy.md#mockimplementationfactory)

## Constructors

### constructor

• **new JestSpyClassFunctionStrategy**(`params`): [`JestSpyClassFunctionStrategy`](jest_spy_jest_spy_class_function_strategy.JestSpyClassFunctionStrategy.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.mockClassParams` | `any`[] |
| `params.name` | `string` |
| `params.terms` | [`ContractTerm`](../modules/types.md#contractterm)[] |

#### Returns

[`JestSpyClassFunctionStrategy`](jest_spy_jest_spy_class_function_strategy.JestSpyClassFunctionStrategy.md)

#### Defined in

[jest-spy/jest-spy-class-function-strategy.ts:12](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/jest-spy/jest-spy-class-function-strategy.ts#L12)

## Properties

### \_mockClassParams

• `Protected` `Readonly` **\_mockClassParams**: `any`[]

#### Defined in

[jest-spy/jest-spy-class-function-strategy.ts:9](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/jest-spy/jest-spy-class-function-strategy.ts#L9)

___

### \_name

• `Protected` `Readonly` **\_name**: `string`

#### Defined in

[jest-spy/jest-spy-class-function-strategy.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/jest-spy/jest-spy-class-function-strategy.ts#L10)

___

### \_terms

• `Protected` `Readonly` **\_terms**: [`ContractTerm`](../modules/types.md#contractterm)[]

#### Defined in

[jest-spy/jest-spy-class-function-strategy.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/jest-spy/jest-spy-class-function-strategy.ts#L8)

## Methods

### mockImplementationFactory

▸ **mockImplementationFactory**(): (...`args`: `any`[]) => `any`

#### Returns

`fn`

▸ (`...args`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`any`

#### Implementation of

[JestSpyStrategy](../interfaces/jest_spy_jest_spy_strategy.JestSpyStrategy.md).[mockImplementationFactory](../interfaces/jest_spy_jest_spy_strategy.JestSpyStrategy.md#mockimplementationfactory)

#### Defined in

[jest-spy/jest-spy-class-function-strategy.ts:19](https://github.com/beecode-rs/msh-test-contractor/blob/05cbddf/src/jest-spy/jest-spy-class-function-strategy.ts#L19)
