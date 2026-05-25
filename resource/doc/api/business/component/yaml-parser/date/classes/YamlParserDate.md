[**@beecode/msh-test-contractor**](../../../../../README.md)

***

[@beecode/msh-test-contractor](../../../../../README.md) / [business/component/yaml-parser/date](../README.md) / YamlParserDate

# Class: YamlParserDate

Defined in: [packages/test-contractor/src/business/component/yaml-parser/date.ts:3](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/date.ts#L3)

## Constructors

### Constructor

> **new YamlParserDate**(): `YamlParserDate`

#### Returns

`YamlParserDate`

## Methods

### \_extractDateStringFromMatch()

> `protected` **\_extractDateStringFromMatch**(`match`): `string` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/date.ts:12](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/date.ts#L12)

#### Parameters

##### match

`RegExpExecArray`

#### Returns

`string` \| `undefined`

***

### \_isDatePatternMatch()

> `protected` **\_isDatePatternMatch**(`value`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/date.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/date.ts#L8)

#### Parameters

##### value

`string`

#### Returns

`boolean`

***

### \_isStringValue()

> `protected` **\_isStringValue**(`value`): `value is string`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/date.ts:4](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/date.ts#L4)

#### Parameters

##### value

`unknown`

#### Returns

`value is string`

***

### \_isValidDate()

> `protected` **\_isValidDate**(`date`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/date.ts:16](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/date.ts#L16)

#### Parameters

##### date

`Date`

#### Returns

`boolean`

***

### \_parseDateFromMatch()

> `protected` **\_parseDateFromMatch**(`match`): `Date` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/date.ts:20](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/date.ts#L20)

#### Parameters

##### match

`RegExpExecArray`

#### Returns

`Date` \| `undefined`

***

### isString()

> **isString**(`params`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/date.ts:34](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/date.ts#L34)

#### Parameters

##### params

###### value

`unknown`

#### Returns

`boolean`

***

### parse()

> **parse**(`params`): `Date` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/date.ts:44](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/date.ts#L44)

#### Parameters

##### params

###### value

`unknown`

#### Returns

`Date` \| `undefined`
