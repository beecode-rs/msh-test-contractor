[**@beecode/msh-test-contractor**](../../../../../README.md)

***

[@beecode/msh-test-contractor](../../../../../README.md) / [business/component/yaml-parser/regex](../README.md) / YamlParserRegex

# Class: YamlParserRegex

Defined in: [packages/test-contractor/src/business/component/yaml-parser/regex.ts:3](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/regex.ts#L3)

## Constructors

### Constructor

> **new YamlParserRegex**(): `YamlParserRegex`

#### Returns

`YamlParserRegex`

## Methods

### \_createRegExpSafely()

> `protected` **\_createRegExpSafely**(`pattern`, `flags`): `RegExp` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/regex.ts:20](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/regex.ts#L20)

#### Parameters

##### pattern

`string`

##### flags

`string`

#### Returns

`RegExp` \| `undefined`

***

### \_extractFlagsFromMatch()

> `protected` **\_extractFlagsFromMatch**(`match`): `string`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/regex.ts:16](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/regex.ts#L16)

#### Parameters

##### match

`RegExpExecArray`

#### Returns

`string`

***

### \_extractPatternFromMatch()

> `protected` **\_extractPatternFromMatch**(`match`): `string` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/regex.ts:12](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/regex.ts#L12)

#### Parameters

##### match

`RegExpExecArray`

#### Returns

`string` \| `undefined`

***

### \_isRegexPatternMatch()

> `protected` **\_isRegexPatternMatch**(`value`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/regex.ts:8](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/regex.ts#L8)

#### Parameters

##### value

`string`

#### Returns

`boolean`

***

### \_isStringValue()

> `protected` **\_isStringValue**(`value`): `value is string`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/regex.ts:4](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/regex.ts#L4)

#### Parameters

##### value

`unknown`

#### Returns

`value is string`

***

### \_parseRegexFromMatch()

> `protected` **\_parseRegexFromMatch**(`match`): `RegExp` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/regex.ts:28](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/regex.ts#L28)

#### Parameters

##### match

`RegExpExecArray`

#### Returns

`RegExp` \| `undefined`

***

### isString()

> **isString**(`params`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/regex.ts:39](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/regex.ts#L39)

#### Parameters

##### params

###### value

`unknown`

#### Returns

`boolean`

***

### parse()

> **parse**(`params`): `RegExp` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/regex.ts:49](https://github.com/beecode-rs/msh-test-contractor/blob/e458d63f47fa80aa3927f987026fdadedc41f47f/src/business/component/yaml-parser/regex.ts#L49)

#### Parameters

##### params

###### value

`unknown`

#### Returns

`RegExp` \| `undefined`
