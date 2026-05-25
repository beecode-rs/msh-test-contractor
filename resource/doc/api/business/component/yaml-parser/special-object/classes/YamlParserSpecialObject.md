[**@beecode/msh-test-contractor**](../../../../../README.md)

***

[@beecode/msh-test-contractor](../../../../../README.md) / [business/component/yaml-parser/special-object](../README.md) / YamlParserSpecialObject

# Class: YamlParserSpecialObject

Defined in: [packages/test-contractor/src/business/component/yaml-parser/special-object.ts:6](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/special-object.ts#L6)

## Constructors

### Constructor

> **new YamlParserSpecialObject**(`_yamlParserError`, `_yamlParserPromise`, `_yamlParserDate`, `_yamlParserRegex`): `YamlParserSpecialObject`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/special-object.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/special-object.ts#L7)

#### Parameters

##### \_yamlParserError

[`YamlParserError`](../../error/classes/YamlParserError.md)

##### \_yamlParserPromise

[`YamlParserPromise`](../../promise/classes/YamlParserPromise.md)

##### \_yamlParserDate

[`YamlParserDate`](../../date/classes/YamlParserDate.md)

##### \_yamlParserRegex

[`YamlParserRegex`](../../regex/classes/YamlParserRegex.md)

#### Returns

`YamlParserSpecialObject`

## Properties

### \_yamlParserDate

> `protected` `readonly` **\_yamlParserDate**: [`YamlParserDate`](../../date/classes/YamlParserDate.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/special-object.ts:10](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/special-object.ts#L10)

***

### \_yamlParserError

> `protected` `readonly` **\_yamlParserError**: [`YamlParserError`](../../error/classes/YamlParserError.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/special-object.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/special-object.ts#L8)

***

### \_yamlParserPromise

> `protected` `readonly` **\_yamlParserPromise**: [`YamlParserPromise`](../../promise/classes/YamlParserPromise.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/special-object.ts:9](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/special-object.ts#L9)

***

### \_yamlParserRegex

> `protected` `readonly` **\_yamlParserRegex**: [`YamlParserRegex`](../../regex/classes/YamlParserRegex.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/special-object.ts:11](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/special-object.ts#L11)

## Methods

### \_isStringValue()

> `protected` **\_isStringValue**(`value`): `value is string`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/special-object.ts:14](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/special-object.ts#L14)

#### Parameters

##### value

`unknown`

#### Returns

`value is string`

***

### \_parseSpecialObjectFromString()

> `protected` **\_parseSpecialObjectFromString**(`value`): `unknown`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/special-object.ts:68](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/special-object.ts#L68)

#### Parameters

##### value

`string`

#### Returns

`unknown`

***

### \_tryParseClassRef()

> `protected` **\_tryParseClassRef**(`value`): `Function` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/special-object.ts:52](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/special-object.ts#L52)

#### Parameters

##### value

`string`

#### Returns

`Function` \| `undefined`

***

### \_tryParseDate()

> `protected` **\_tryParseDate**(`value`): `Date` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/special-object.ts:26](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/special-object.ts#L26)

#### Parameters

##### value

`string`

#### Returns

`Date` \| `undefined`

***

### \_tryParseError()

> `protected` **\_tryParseError**(`value`): `Error` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/special-object.ts:18](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/special-object.ts#L18)

#### Parameters

##### value

`string`

#### Returns

`Error` \| `undefined`

***

### \_tryParseFunction()

> `protected` **\_tryParseFunction**(`value`): `Function` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/special-object.ts:35](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/special-object.ts#L35)

#### Parameters

##### value

`string`

#### Returns

`Function` \| `undefined`

***

### \_tryParseImport()

> `protected` **\_tryParseImport**(`value`): \{ `__yaml_import__`: \{ `path`: `string`; `property`: `string`; \}; \} \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/special-object.ts:107](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/special-object.ts#L107)

#### Parameters

##### value

`string`

#### Returns

\{ `__yaml_import__`: \{ `path`: `string`; `property`: `string`; \}; \} \| `undefined`

***

### \_tryParsePromise()

> `protected` **\_tryParsePromise**(`value`): `Promise`\<`unknown`\> \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/special-object.ts:22](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/special-object.ts#L22)

#### Parameters

##### value

`string`

#### Returns

`Promise`\<`unknown`\> \| `undefined`

***

### \_tryParseRegex()

> `protected` **\_tryParseRegex**(`value`): `RegExp` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/special-object.ts:30](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/special-object.ts#L30)

#### Parameters

##### value

`string`

#### Returns

`RegExp` \| `undefined`

***

### parse()

> **parse**(`params`): `unknown`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/special-object.ts:116](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/special-object.ts#L116)

#### Parameters

##### params

###### value

`unknown`

#### Returns

`unknown`
