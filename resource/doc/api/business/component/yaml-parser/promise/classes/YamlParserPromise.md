[**@beecode/msh-test-contractor**](../../../../../README.md)

***

[@beecode/msh-test-contractor](../../../../../README.md) / [business/component/yaml-parser/promise](../README.md) / YamlParserPromise

# Class: YamlParserPromise

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:6](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L6)

## Constructors

### Constructor

> **new YamlParserPromise**(`_yamlParserError`): `YamlParserPromise`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L7)

#### Parameters

##### \_yamlParserError

[`YamlParserError`](../../error/classes/YamlParserError.md)

#### Returns

`YamlParserPromise`

## Properties

### \_yamlParserError

> `protected` `readonly` **\_yamlParserError**: [`YamlParserError`](../../error/classes/YamlParserError.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:7](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L7)

## Methods

### \_convertToRejectionError()

> `protected` **\_convertToRejectionError**(`value`): `Error`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:119](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L119)

#### Parameters

##### value

`unknown`

#### Returns

`Error`

***

### \_extractInnerValueFromMatch()

> `protected` **\_extractInnerValueFromMatch**(`match`): `string` \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:21](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L21)

#### Parameters

##### match

`RegExpExecArray`

#### Returns

`string` \| `undefined`

***

### \_isBooleanLiteral()

> `protected` **\_isBooleanLiteral**(`value`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:33](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L33)

#### Parameters

##### value

`string`

#### Returns

`boolean`

***

### \_isEmptyOrUndefined()

> `protected` **\_isEmptyOrUndefined**(`value`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:25](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L25)

#### Parameters

##### value

`string`

#### Returns

`boolean`

***

### \_isErrorConstructor()

> `protected` **\_isErrorConstructor**(`value`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:49](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L49)

#### Parameters

##### value

`string`

#### Returns

`boolean`

***

### \_isJsonObjectOrArray()

> `protected` **\_isJsonObjectOrArray**(`value`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:45](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L45)

#### Parameters

##### value

`string`

#### Returns

`boolean`

***

### \_isNullLiteral()

> `protected` **\_isNullLiteral**(`value`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:29](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L29)

#### Parameters

##### value

`string`

#### Returns

`boolean`

***

### \_isNumericValue()

> `protected` **\_isNumericValue**(`value`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:37](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L37)

#### Parameters

##### value

`string`

#### Returns

`boolean`

***

### \_isQuotedString()

> `protected` **\_isQuotedString**(`value`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:41](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L41)

#### Parameters

##### value

`string`

#### Returns

`boolean`

***

### \_isRejectPatternMatch()

> `protected` **\_isRejectPatternMatch**(`value`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:17](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L17)

#### Parameters

##### value

`string`

#### Returns

`boolean`

***

### \_isResolvePatternMatch()

> `protected` **\_isResolvePatternMatch**(`value`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:13](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L13)

#### Parameters

##### value

`string`

#### Returns

`boolean`

***

### \_isStringValue()

> `protected` **\_isStringValue**(`value`): `value is string`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:9](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L9)

#### Parameters

##### value

`unknown`

#### Returns

`value is string`

***

### \_parseBooleanLiteral()

> `protected` **\_parseBooleanLiteral**(`value`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:61](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L61)

#### Parameters

##### value

`string`

#### Returns

`boolean`

***

### \_parseEmptyOrUndefined()

> `protected` **\_parseEmptyOrUndefined**(): `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:53](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L53)

#### Returns

`undefined`

***

### \_parseJsonLikeValue()

> `protected` **\_parseJsonLikeValue**(`value`): `unknown`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:73](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L73)

#### Parameters

##### value

`string`

#### Returns

`unknown`

***

### \_parseNullLiteral()

> `protected` **\_parseNullLiteral**(): `null`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:57](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L57)

#### Returns

`null`

***

### \_parseNumericValue()

> `protected` **\_parseNumericValue**(`value`): `number`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:65](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L65)

#### Parameters

##### value

`string`

#### Returns

`number`

***

### \_parsePromiseReject()

> `protected` **\_parsePromiseReject**(`match`): `Promise`\<`unknown`\> \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:127](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L127)

#### Parameters

##### match

`RegExpExecArray`

#### Returns

`Promise`\<`unknown`\> \| `undefined`

***

### \_parsePromiseResolve()

> `protected` **\_parsePromiseResolve**(`match`): `Promise`\<`unknown`\> \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:139](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L139)

#### Parameters

##### match

`RegExpExecArray`

#### Returns

`Promise`\<`unknown`\> \| `undefined`

***

### \_parseQuotedString()

> `protected` **\_parseQuotedString**(`value`): `string`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:69](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L69)

#### Parameters

##### value

`string`

#### Returns

`string`

***

### \_parseValueString()

> `protected` **\_parseValueString**(`valueStr`): `unknown`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:83](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L83)

#### Parameters

##### valueStr

`string`

#### Returns

`unknown`

***

### isRejectString()

> **isRejectString**(`params`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:150](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L150)

#### Parameters

##### params

###### value

`unknown`

#### Returns

`boolean`

***

### isResolveString()

> **isResolveString**(`params`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:160](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L160)

#### Parameters

##### params

###### value

`unknown`

#### Returns

`boolean`

***

### isString()

> **isString**(`params`): `boolean`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:170](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L170)

#### Parameters

##### params

###### value

`unknown`

#### Returns

`boolean`

***

### parse()

> **parse**(`params`): `Promise`\<`unknown`\> \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:176](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L176)

#### Parameters

##### params

###### value

`unknown`

#### Returns

`Promise`\<`unknown`\> \| `undefined`

***

### parseReject()

> **parseReject**(`params`): `Promise`\<`unknown`\> \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:187](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L187)

#### Parameters

##### params

###### value

`unknown`

#### Returns

`Promise`\<`unknown`\> \| `undefined`

***

### parseResolve()

> **parseResolve**(`params`): `Promise`\<`unknown`\> \| `undefined`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/promise.ts:202](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/business/component/yaml-parser/promise.ts#L202)

#### Parameters

##### params

###### value

`unknown`

#### Returns

`Promise`\<`unknown`\> \| `undefined`
