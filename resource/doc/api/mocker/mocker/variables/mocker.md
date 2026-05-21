[**@beecode/msh-test-contractor**](../../../README.md)

***

[@beecode/msh-test-contractor](../../../README.md) / [mocker/mocker](../README.md) / mocker

# Variable: mocker

> `const` **mocker**: `object`

Defined in: [packages/test-contractor/src/mocker/mocker.ts:14](https://github.com/beecode-rs/msh-test-contractor/blob/f661ea0ed34fe03f2af13d922c3b29fbc8bdb727/src/mocker/mocker.ts#L14)

## Type Declaration

### contract()

> **contract**: \<`SPY`, `C`\>(`contract`) => [`MockerContractResult`](../type-aliases/MockerContractResult.md)\<`SPY`\>

#### Type Parameters

##### SPY

`SPY` = `MockInstance`\<`any`\>

##### C

`C` *extends* [`AnyContract`](../../../types/type-aliases/AnyContract.md) = `any`

#### Parameters

##### contract

`C`

#### Returns

[`MockerContractResult`](../type-aliases/MockerContractResult.md)\<`SPY`\>

### function()

> **function**: \<`C`, `CFNK`\>(`contract`, `fnName`) => [`MockerContractResult`](../type-aliases/MockerContractResult.md)

#### Type Parameters

##### C

`C` *extends* [`AnyContract`](../../../types/type-aliases/AnyContract.md)

##### CFNK

`CFNK` *extends* `string`

#### Parameters

##### contract

`C`

##### fnName

`CFNK`

#### Returns

[`MockerContractResult`](../type-aliases/MockerContractResult.md)
