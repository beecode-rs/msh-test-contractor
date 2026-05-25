[**@beecode/msh-test-contractor**](../../../README.md)

***

[@beecode/msh-test-contractor](../../../README.md) / [mocker/mocker](../README.md) / mocker

# Variable: mocker

> `const` **mocker**: `object`

Defined in: [packages/test-contractor/src/mocker/mocker.ts:17](https://github.com/beecode-rs/msh-test-contractor/blob/68899e59ef95bd895f2ce2d11004dff7ce2c5f37/src/mocker/mocker.ts#L17)

## Type Declaration

### contract()

> **contract**: \<`SPY_INSTANCE`, `CONTRACT`\>(`contract`) => [`MockerContractResult`](../type-aliases/MockerContractResult.md)\<`SPY_INSTANCE`\>

#### Type Parameters

##### SPY_INSTANCE

`SPY_INSTANCE` = `MockInstance`\<`any`\>

##### CONTRACT

`CONTRACT` *extends* [`AnyContract`](../../../types/type-aliases/AnyContract.md) = `any`

#### Parameters

##### contract

`CONTRACT`

#### Returns

[`MockerContractResult`](../type-aliases/MockerContractResult.md)\<`SPY_INSTANCE`\>

### function()

> **function**: \<`CONTRACT`, `CONTRACT_FN_KEY`\>(`contract`, `fnName`) => [`MockerContractResult`](../type-aliases/MockerContractResult.md)

#### Type Parameters

##### CONTRACT

`CONTRACT` *extends* [`AnyContract`](../../../types/type-aliases/AnyContract.md)

##### CONTRACT_FN_KEY

`CONTRACT_FN_KEY` *extends* `string`

#### Parameters

##### contract

`CONTRACT`

##### fnName

`CONTRACT_FN_KEY`

#### Returns

[`MockerContractResult`](../type-aliases/MockerContractResult.md)
