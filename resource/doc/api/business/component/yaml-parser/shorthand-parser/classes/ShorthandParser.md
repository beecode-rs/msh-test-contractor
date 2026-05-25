[**@beecode/msh-test-contractor**](../../../../../README.md)

***

[@beecode/msh-test-contractor](../../../../../README.md) / [business/component/yaml-parser/shorthand-parser](../README.md) / ShorthandParser

# Class: ShorthandParser

Defined in: [packages/test-contractor/src/business/component/yaml-parser/shorthand-parser.ts:17](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/shorthand-parser.ts#L17)

## Constructors

### Constructor

> **new ShorthandParser**(): `ShorthandParser`

#### Returns

`ShorthandParser`

## Methods

### \_findArrowPosition()

> `protected` **\_findArrowPosition**(`input`): `number`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/shorthand-parser.ts:18](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/shorthand-parser.ts#L18)

#### Parameters

##### input

`string`

#### Returns

`number`

***

### \_getPrevChar()

> `protected` **\_getPrevChar**(`input`, `index`): `string`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/shorthand-parser.ts:76](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/shorthand-parser.ts#L76)

#### Parameters

##### input

`string`

##### index

`number`

#### Returns

`string`

***

### \_parseConstructorParams()

> `protected` **\_parseConstructorParams**(`value`): `unknown`[]

Defined in: [packages/test-contractor/src/business/component/yaml-parser/shorthand-parser.ts:104](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/shorthand-parser.ts#L104)

#### Parameters

##### value

`string`

#### Returns

`unknown`[]

***

### \_parseJsonArray()

> `protected` **\_parseJsonArray**(`value`): `unknown`[]

Defined in: [packages/test-contractor/src/business/component/yaml-parser/shorthand-parser.ts:84](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/shorthand-parser.ts#L84)

#### Parameters

##### value

`string`

#### Returns

`unknown`[]

***

### \_parseResult()

> `protected` **\_parseResult**(`value`): `unknown`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/shorthand-parser.ts:130](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/shorthand-parser.ts#L130)

#### Parameters

##### value

`string`

#### Returns

`unknown`

***

### \_toggleInString()

> `protected` **\_toggleInString**(`current`, `char`): `string` \| `null`

Defined in: [packages/test-contractor/src/business/component/yaml-parser/shorthand-parser.ts:64](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/shorthand-parser.ts#L64)

#### Parameters

##### current

`string` | `null`

##### char

`string`

#### Returns

`string` \| `null`

***

### parse()

> **parse**(`input`): [`ParsedShorthand`](../type-aliases/ParsedShorthand.md)

Defined in: [packages/test-contractor/src/business/component/yaml-parser/shorthand-parser.ts:142](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/business/component/yaml-parser/shorthand-parser.ts#L142)

#### Parameters

##### input

`string`

#### Returns

[`ParsedShorthand`](../type-aliases/ParsedShorthand.md)
