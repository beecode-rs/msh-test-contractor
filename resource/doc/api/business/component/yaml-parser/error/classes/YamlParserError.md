[**@beecode/msh-test-contractor**](../../../../../README.md)

***

[@beecode/msh-test-contractor](../../../../../README.md) / [business/component/yaml-parser/error](../README.md) / YamlParserError

# Class: YamlParserError

Defined in: [packages/test-contractor/src/business/component/yaml-parser/error.ts:3](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/error.ts#L3)

## Constructors

### Constructor

> **new YamlParserError**(): `YamlParserError`

#### Returns

`YamlParserError`

## Methods

### \_applyErrorNameFromOptions()

> `protected` **\_applyErrorNameFromOptions**(`error`, `optionsStr`): `void`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/error.ts:26](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/error.ts#L26)

#### Parameters

##### error

`Error`

##### optionsStr

`string`

#### Returns

`void`

***

### \_createErrorFromMatch()

> `protected` **\_createErrorFromMatch**(`match`): `Error`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/error.ts:37](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/error.ts#L37)

#### Parameters

##### match

`RegExpExecArray`

#### Returns

`Error`

***

### \_extractErrorMessageFromMatch()

> `protected` **\_extractErrorMessageFromMatch**(`match`): `string` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/error.ts:12](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/error.ts#L12)

#### Parameters

##### match

`RegExpExecArray`

#### Returns

`string` \| `undefined`

***

### \_extractErrorNameFromOptions()

> `protected` **\_extractErrorNameFromOptions**(`optionsStr`): `string` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/error.ts:20](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/error.ts#L20)

#### Parameters

##### optionsStr

`string`

#### Returns

`string` \| `undefined`

***

### \_extractOptionsStringFromMatch()

> `protected` **\_extractOptionsStringFromMatch**(`match`): `string` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/error.ts:16](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/error.ts#L16)

#### Parameters

##### match

`RegExpExecArray`

#### Returns

`string` \| `undefined`

***

### \_isErrorPatternMatch()

> `protected` **\_isErrorPatternMatch**(`value`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/error.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/error.ts#L8)

#### Parameters

##### value

`string`

#### Returns

`boolean`

***

### \_isStringValue()

> `protected` **\_isStringValue**(`value`): `value is string`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/error.ts:4](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/error.ts#L4)

#### Parameters

##### value

`unknown`

#### Returns

`value is string`

***

### isString()

> **isString**(`params`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/error.ts:53](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/error.ts#L53)

#### Parameters

##### params

###### value

`unknown`

#### Returns

`boolean`

***

### parse()

> **parse**(`params`): `Error` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/error.ts:63](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/error.ts#L63)

#### Parameters

##### params

###### value

`unknown`

#### Returns

`Error` \| `undefined`
