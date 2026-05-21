[**@beecode/msh-test-contractor**](../../../../README.md)

***

[@beecode/msh-test-contractor](../../../../README.md) / [business/model/yaml-contract-model](../README.md) / YamlContractModelValidator

# Class: YamlContractModelValidator

Defined in: [packages/test-contractor/src/business/model/yaml-contract-model.ts:25](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/model/yaml-contract-model.ts#L25)

## Constructors

### Constructor

> **new YamlContractModelValidator**(): `YamlContractModelValidator`

#### Returns

`YamlContractModelValidator`

## Methods

### \_validateEachFunction()

> `protected` `readonly` **\_validateEachFunction**(`params`): `void`

Defined in: [packages/test-contractor/src/business/model/yaml-contract-model.ts:174](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/model/yaml-contract-model.ts#L174)

#### Parameters

##### params

###### fns

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### \_validateEachTerm()

> `protected` `readonly` **\_validateEachTerm**(`params`): `void`

Defined in: [packages/test-contractor/src/business/model/yaml-contract-model.ts:63](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/model/yaml-contract-model.ts#L63)

#### Parameters

##### params

###### terms

`unknown`[]

#### Returns

`void`

***

### \_validateFnsField()

> `protected` `readonly` **\_validateFnsField**(`params`): `Record`\<`string`, `unknown`\>

Defined in: [packages/test-contractor/src/business/model/yaml-contract-model.ts:147](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/model/yaml-contract-model.ts#L147)

#### Parameters

##### params

###### model

`Record`\<`string`, `unknown`\>

#### Returns

`Record`\<`string`, `unknown`\>

***

### \_validateFunctionMockField()

> `protected` `readonly` **\_validateFunctionMockField**(`params`): `void`

Defined in: [packages/test-contractor/src/business/model/yaml-contract-model.ts:94](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/model/yaml-contract-model.ts#L94)

#### Parameters

##### params

###### fn

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### \_validateFunctionMockFunctionField()

> `protected` `readonly` **\_validateFunctionMockFunctionField**(`params`): `void`

Defined in: [packages/test-contractor/src/business/model/yaml-contract-model.ts:110](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/model/yaml-contract-model.ts#L110)

#### Parameters

##### params

###### fn

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### \_validateMockField()

> `protected` `readonly` **\_validateMockField**(`params`): `void`

Defined in: [packages/test-contractor/src/business/model/yaml-contract-model.ts:158](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/model/yaml-contract-model.ts#L158)

#### Parameters

##### params

###### model

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### \_validateNonEmptyStringField()

> `protected` `readonly` **\_validateNonEmptyStringField**(`params`): `void`

Defined in: [packages/test-contractor/src/business/model/yaml-contract-model.ts:126](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/model/yaml-contract-model.ts#L126)

#### Parameters

##### params

###### fieldName

`string`

###### model

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### \_validateSubjectTypeField()

> `protected` `readonly` **\_validateSubjectTypeField**(`params`): `void`

Defined in: [packages/test-contractor/src/business/model/yaml-contract-model.ts:138](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/model/yaml-contract-model.ts#L138)

#### Parameters

##### params

###### model

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### \_validateTermArrayField()

> `protected` `readonly` **\_validateTermArrayField**(`params`): `void`

Defined in: [packages/test-contractor/src/business/model/yaml-contract-model.ts:26](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/model/yaml-contract-model.ts#L26)

#### Parameters

##### params

###### fieldName

`string`

###### term

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### \_validateTermHasResultOrError()

> `protected` `readonly` **\_validateTermHasResultOrError**(`params`): `void`

Defined in: [packages/test-contractor/src/business/model/yaml-contract-model.ts:32](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/model/yaml-contract-model.ts#L32)

#### Parameters

##### params

###### term

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### \_validateTermsArray()

> `protected` `readonly` **\_validateTermsArray**(`params`): `void`

Defined in: [packages/test-contractor/src/business/model/yaml-contract-model.ts:53](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/model/yaml-contract-model.ts#L53)

#### Parameters

##### params

###### fn

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### isYamlContractFunction()

> **isYamlContractFunction**(`value`): `value is YamlContractFunction`

Defined in: [packages/test-contractor/src/business/model/yaml-contract-model.ts:79](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/model/yaml-contract-model.ts#L79)

#### Parameters

##### value

`unknown`

#### Returns

`value is YamlContractFunction`

***

### isYamlContractModel()

> **isYamlContractModel**(`value`): `value is YamlContractModel`

Defined in: [packages/test-contractor/src/business/model/yaml-contract-model.ts:190](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/model/yaml-contract-model.ts#L190)

#### Parameters

##### value

`unknown`

#### Returns

`value is YamlContractModel`

***

### isYamlContractTerm()

> **isYamlContractTerm**(`value`): `value is YamlContractTerm`

Defined in: [packages/test-contractor/src/business/model/yaml-contract-model.ts:38](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/model/yaml-contract-model.ts#L38)

#### Parameters

##### value

`unknown`

#### Returns

`value is YamlContractTerm`
