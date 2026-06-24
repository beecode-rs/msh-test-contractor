# Refactoring Suggestion: test-contractor Folder Structure

> **Scope**: Pure folder placement and naming. No logic changes.
>
> **Date**: 2026-06-06

---

## 1. Current Structure

```
src/
  index.ts                                              # npm entry (exports: contractor, mocker)
  vitest-plugin.ts                                     # npm export "./vitest-plugin"

  business/
    component/
      yaml-parser/                                     # YAML parsing component
        index.ts                                       # barrel export (public API)
        contract-parser.ts                             # YamlParserContract class
        contract-loader.ts                             # YamlParserContractLoader class
        shorthand-parser.ts                            # ShorthandParser class + parseShorthandTerm fn
        date.ts                                        # YamlParserDate class
        error.ts                                       # YamlParserError class
        promise.ts                                     # YamlParserPromise class
        regex.ts                                       # YamlParserRegex class
        special-object.ts                              # YamlParserSpecialObject class
        __fixtures__/                                  # test fixture YAML files
        __tests__/                                     # integration tests
        *.test.ts                                      # unit tests (alongside source)
    model/
      yaml-contract-model.ts                           # types + YamlContractModelValidator class

  contract/                                            # TOP-LEVEL domain folder
    contractor.ts                                      # contractor singleton (npm public API)
    contractor-service.ts                              # contractorService singleton
    contractor-test-runner.ts                          # contractorTestRunner singleton
    contractor-factory.ts                              # contractFactory function
    contract-reporter.ts                               # ContractReporter class (npm export "./contract-reporter")
    expect/                                            # sub-folder inside contract/
      contract-expect-service.ts                       # interface + singleton
      contract-expect-any-equal-strategy.ts            # strategy class
      contract-expect-function-result-equal-strategy.ts
      contract-expect-throw-error-strategy.ts
      __fixtures__/
      *.test.ts, *.contract.yaml
    __tests__/

  contract-mock/                                       # TOP-LEVEL domain folder
    mock-strategy.ts                                   # interface
    contract-mock-service.ts                           # singleton
    mock-vitest-strategy.ts                            # strategy class
    mock-vitest-empty-strategy.ts                      # strategy class
    *.test.ts, *.contract.yaml

  mocker/                                              # TOP-LEVEL domain folder
    mocker.ts                                          # mocker singleton (npm public API)
    mocker-strategy.ts                                 # interface
    mocker-service.ts                                  # singleton
    mocker-vitest-class-strategy.ts                    # strategy class
    mocker-vitest-function-strategy.ts                 # strategy class
    mocker-vitest-object-strategy.ts                   # strategy class
    *.test.ts, *.contract.yaml

  subject/                                             # TOP-LEVEL domain folder
    subject-strategy.ts                                # interface + type
    subject-service.ts                                 # singleton
    subject-function-strategy.ts                       # strategy class
    subject-class-function-strategy.ts                 # strategy class
    subject-constructor-strategy.ts                    # strategy class
    __fixtures__/
    *.contract.yaml

  vitest-spy/                                          # TOP-LEVEL domain folder
    vitest-spy-strategy.ts                             # interface
    vitest-spy-service.ts                              # singleton
    vitest-spy-function-strategy.ts                    # strategy class
    vitest-spy-class-function-strategy.ts              # strategy class
    *.test.ts, *.contract.yaml

  enum/
    special-fn-name.ts                                 # SpecialFnName enum

  global-contract/
    date-mock.ts                                       # default export function
    date.contract.yaml

  types/
    index.ts                                           # core type definitions
    global.d.ts                                        # ambient type declaration

  util/
    fn-util.ts                                         # fnUtil singleton
    object-util.ts                                     # objectUtil singleton
    type-util.ts                                       # typeUtil singleton
    *.contract.yaml

  __tests__/
    index-vitest-setup.ts
```

---

## 2. Issues Found

### Issue 1: Arbitrary top-level domain folders

**Rule violated**: "NEVER create arbitrary folders outside the defined structure"

The folders `contract/`, `contract-mock/`, `mocker/`, `subject/`, `vitest-spy/` are all top-level domain folders under `src/` that do not exist in the clean-typescript structure (`business/`, `util/` only). Each contains business logic (services, strategies, interfaces) that belongs under `src/business/`.

### Issue 2: Types in a separate `src/types/` folder

**Rule violated**: "Type definitions go in `src/business/model/` -- not in a separate `src/types/`"

`src/types/index.ts` contains core domain types (`Contract`, `ContractTerm`, `AnyContract`, `ContractMock`, etc.) that are the foundation of the entire library. These are business models and should live in `src/business/model/`.

### Issue 3: Enum in a separate `src/enum/` folder

**Rule violated**: "Enums should be in `src/business/model/` or `src/util/`"

`src/enum/special-fn-name.ts` is a single-file folder. It should be placed in `src/business/model/` (it is a domain concept) or `src/util/` (it is a simple utility constant).

### Issue 4: `src/global-contract/` folder with no structural justification

**Rule violated**: "NEVER create arbitrary folders outside the defined structure"

`src/global-contract/` contains a single mock utility (`date-mock.ts`) and its contract YAML. This is a convenience mock, not a domain group. It belongs under `src/util/` since it is a utility providing a reusable mock function.

### Issue 5: Barrel export in `yaml-parser/index.ts`

**Rule violated**: "No barrel exports (index.ts) except for component public API and npm package entry points"

The `yaml-parser/index.ts` barrel is actually acceptable here since `yaml-parser` is a component with a public API. This is an allowed exception per the rules ("component public API"). **No change needed**.

### Issue 6: `vitest-plugin.ts` is a loose file at `src/` root

**Rule violated**: "Business logic MUST be in `src/business/`"

`src/vitest-plugin.ts` is infrastructure/framework integration code. It does not contain business logic itself (it is a thin Vite plugin wrapper), so it can stay at the root as an npm entry-point file. **Acceptable exception** -- similar to `src/index.ts`.

### Issue 7: Strategy groups scattered across top-level folders

**Rule violated**: "Strategy pattern groups: interface + implementations should be in the same folder under component or service"

There are 5 strategy groups, each in its own top-level folder:
- `contract/expect/` -- expect strategies
- `contract-mock/` -- mock strategies
- `mocker/` -- mocker strategies
- `subject/` -- subject strategies
- `vitest-spy/` -- spy strategies

All should be consolidated under `src/business/` as either components (complex multi-file strategy groups) or services (simpler logic).

---

## 3. Proposed New Structure

The key insight is that this library has 5 strategy-based domain groups. Under clean-typescript, the mapping is:

- **Complex strategy groups** (interface + 2+ implementations + service) become **components** under `src/business/component/`
- **Simpler groups** (interface + 1-2 implementations + service) become **services** under `src/business/service/`
- **Type definitions** move to `src/business/model/`
- **Enums** move to `src/business/model/`
- **Utility functions** stay in `src/util/`

```
src/
  index.ts                                              # npm entry (no change)
  vitest-plugin.ts                                     # npm export (no change)

  business/
    component/
      yaml-parser/                                     # (no change)
        index.ts
        contract-parser.ts
        contract-loader.ts
        shorthand-parser.ts
        date.ts
        error.ts
        promise.ts
        regex.ts
        special-object.ts
        __fixtures__/
        __tests__/
        *.test.ts

      contractor/                                      # NEW component
        contractor-service.ts
        contractor-test-runner.ts
        contractor-factory.ts
        contract-reporter.ts
        __tests__/

      contractor-expect/                               # NEW component (was contract/expect/)
        contractor-expect-service.ts                   # renamed from contract-expect-service.ts
        contractor-expect-any-equal-strategy.ts
        contractor-expect-function-result-equal-strategy.ts
        contractor-expect-throw-error-strategy.ts
        __fixtures__/
        *.test.ts, *.contract.yaml

      contractor-mock/                                 # NEW component (was contract-mock/)
        contractor-mock-service.ts                     # renamed from contract-mock-service.ts
        contractor-mock-strategy.ts                    # renamed from mock-strategy.ts
        contractor-mock-vitest-strategy.ts             # renamed from mock-vitest-strategy.ts
        contractor-mock-vitest-empty-strategy.ts       # renamed from mock-vitest-empty-strategy.ts
        *.test.ts, *.contract.yaml

      mocker/                                          # NEW component (was mocker/)
        mocker-service.ts
        mocker-strategy.ts
        mocker-vitest-class-strategy.ts
        mocker-vitest-function-strategy.ts
        mocker-vitest-object-strategy.ts
        *.test.ts, *.contract.yaml

      subject/                                         # NEW component (was subject/)
        subject-service.ts
        subject-strategy.ts
        subject-function-strategy.ts
        subject-class-function-strategy.ts
        subject-constructor-strategy.ts
        __fixtures__/
        *.contract.yaml

      vitest-spy/                                      # NEW component (was vitest-spy/)
        vitest-spy-service.ts
        vitest-spy-strategy.ts
        vitest-spy-function-strategy.ts
        vitest-spy-class-function-strategy.ts
        *.test.ts, *.contract.yaml

    service/
      contractor.ts                                    # promoted singleton (was contract/contractor.ts)

    model/
      contract-model.ts                                # renamed from types/index.ts
      yaml-contract-model.ts                           # (no change)
      special-fn-name.ts                               # moved from enum/special-fn-name.ts
      yaml-contract-model.test.ts                      # (no change)

  util/
    fn-util.ts                                         # (no change)
    object-util.ts                                     # (no change)
    type-util.ts                                       # (no change)
    date-mock-util.ts                                  # moved + renamed from global-contract/date-mock.ts
    date-mock-util.contract.yaml                       # moved from global-contract/date.contract.yaml
    *.contract.yaml

  __tests__/
    index-vitest-setup.ts                              # (no change)

  types/
    global.d.ts                                        # (no change -- ambient declarations are acceptable here)
```

> **Note**: `src/types/global.d.ts` remains in place because it is an ambient TypeScript declaration (not a domain model), and the clean-typescript rules target domain type definitions, not `*.d.ts` ambient augmentation files.

---

## 4. Migration Mapping

### Move to `src/business/component/contractor/`

| Old Path | New Path | Notes |
|----------|----------|-------|
| `src/contract/contractor-service.ts` | `src/business/component/contractor/contractor-service.ts` | |
| `src/contract/contractor-test-runner.ts` | `src/business/component/contractor/contractor-test-runner.ts` | |
| `src/contract/contractor-factory.ts` | `src/business/component/contractor/contractor-factory.ts` | |
| `src/contract/contract-reporter.ts` | `src/business/component/contractor/contract-reporter.ts` | |
| `src/contract/__tests__/` | `src/business/component/contractor/__tests__/` | |

### Move to `src/business/component/contractor-expect/`

| Old Path | New Path | Notes |
|----------|----------|-------|
| `src/contract/expect/contract-expect-service.ts` | `src/business/component/contractor-expect/contractor-expect-service.ts` | |
| `src/contract/expect/contract-expect-any-equal-strategy.ts` | `src/business/component/contractor-expect/contractor-expect-any-equal-strategy.ts` | |
| `src/contract/expect/contract-expect-function-result-equal-strategy.ts` | `src/business/component/contractor-expect/contractor-expect-function-result-equal-strategy.ts` | |
| `src/contract/expect/contract-expect-throw-error-strategy.ts` | `src/business/component/contractor-expect/contract-expect-throw-error-strategy.ts` | |
| `src/contract/expect/contract-expect-throw-error-strategy.contract.yaml` | `src/business/component/contractor-expect/contract-expect-throw-error-strategy.contract.yaml` | |
| `src/contract/expect/contract-expect-throw-error-strategy.test.ts` | `src/business/component/contractor-expect/contract-expect-throw-error-strategy.test.ts` | |
| `src/contract/expect/__fixtures__/` | `src/business/component/contractor-expect/__fixtures__/` | |

### Move to `src/business/component/contractor-mock/`

| Old Path | New Path | Notes |
|----------|----------|-------|
| `src/contract-mock/mock-strategy.ts` | `src/business/component/contractor-mock/contractor-mock-strategy.ts` | **renamed** |
| `src/contract-mock/contract-mock-service.ts` | `src/business/component/contractor-mock/contractor-mock-service.ts` | |
| `src/contract-mock/mock-vitest-strategy.ts` | `src/business/component/contractor-mock/contractor-mock-vitest-strategy.ts` | **renamed** |
| `src/contract-mock/mock-vitest-empty-strategy.ts` | `src/business/component/contractor-mock/contractor-mock-vitest-empty-strategy.ts` | **renamed** |
| `src/contract-mock/mock-vitest-empty-strategy.test.ts` | `src/business/component/contractor-mock/contractor-mock-vitest-empty-strategy.test.ts` | |
| `src/contract-mock/mock-vitest-empty-strategy.contract.yaml` | `src/business/component/contractor-mock/contractor-mock-vitest-empty-strategy.contract.yaml` | |
| `src/contract-mock/mock-vitest-strategy.test.ts` | `src/business/component/contractor-mock/contractor-mock-vitest-strategy.test.ts` | |
| `src/contract-mock/mock-vitest-strategy.contract.yaml` | `src/business/component/contractor-mock/contractor-mock-vitest-strategy.contract.yaml` | |
| `src/contract-mock/contract-mock-service.contract.yaml` | `src/business/component/contractor-mock/contractor-mock-service.contract.yaml` | |

### Move to `src/business/component/mocker/`

| Old Path | New Path | Notes |
|----------|----------|-------|
| `src/mocker/mocker-strategy.ts` | `src/business/component/mocker/mocker-strategy.ts` | |
| `src/mocker/mocker-service.ts` | `src/business/component/mocker/mocker-service.ts` | |
| `src/mocker/mocker-vitest-class-strategy.ts` | `src/business/component/mocker/mocker-vitest-class-strategy.ts` | |
| `src/mocker/mocker-vitest-function-strategy.ts` | `src/business/component/mocker/mocker-vitest-function-strategy.ts` | |
| `src/mocker/mocker-vitest-object-strategy.ts` | `src/business/component/mocker/mocker-vitest-object-strategy.ts` | |
| `src/mocker/mocker-service.test.ts` | `src/business/component/mocker/mocker-service.test.ts` | |
| `src/mocker/mocker-service.contract.yaml` | `src/business/component/mocker/mocker-service.contract.yaml` | |
| `src/mocker/mocker-vitest-function-strategy.test.ts` | `src/business/component/mocker/mocker-vitest-function-strategy.test.ts` | |
| `src/mocker/mocker-vitest-function-strategy.contract.yaml` | `src/business/component/mocker/mocker-vitest-function-strategy.contract.yaml` | |
| `src/mocker/mocker-vitest-object-strategy.test.ts` | `src/business/component/mocker/mocker-vitest-object-strategy.test.ts` | |
| `src/mocker/mocker-vitest-object-strategy.contract.yaml` | `src/business/component/mocker/mocker-vitest-object-strategy.contract.yaml` | |

### Move to `src/business/component/subject/`

| Old Path | New Path | Notes |
|----------|----------|-------|
| `src/subject/subject-strategy.ts` | `src/business/component/subject/subject-strategy.ts` | |
| `src/subject/subject-service.ts` | `src/business/component/subject/subject-service.ts` | |
| `src/subject/subject-function-strategy.ts` | `src/business/component/subject/subject-function-strategy.ts` | |
| `src/subject/subject-class-function-strategy.ts` | `src/business/component/subject/subject-class-function-strategy.ts` | |
| `src/subject/subject-constructor-strategy.ts` | `src/business/component/subject/subject-constructor-strategy.ts` | |
| `src/subject/__fixtures__/` | `src/business/component/subject/__fixtures__/` | |
| `src/subject/*.contract.yaml` | `src/business/component/subject/*.contract.yaml` | |

### Move to `src/business/component/vitest-spy/`

| Old Path | New Path | Notes |
|----------|----------|-------|
| `src/vitest-spy/vitest-spy-strategy.ts` | `src/business/component/vitest-spy/vitest-spy-strategy.ts` | |
| `src/vitest-spy/vitest-spy-service.ts` | `src/business/component/vitest-spy/vitest-spy-service.ts` | |
| `src/vitest-spy/vitest-spy-function-strategy.ts` | `src/business/component/vitest-spy/vitest-spy-function-strategy.ts` | |
| `src/vitest-spy/vitest-spy-class-function-strategy.ts` | `src/business/component/vitest-spy/vitest-spy-class-function-strategy.ts` | |
| `src/vitest-spy/vitest-spy-service.test.ts` | `src/business/component/vitest-spy/vitest-spy-service.test.ts` | |
| `src/vitest-spy/*.contract.yaml` | `src/business/component/vitest-spy/*.contract.yaml` | |

### Promote to `src/business/service/`

| Old Path | New Path | Notes |
|----------|----------|-------|
| `src/contract/contractor.ts` | `src/business/service/contractor.ts` | Singleton -- promoted to service |

### Move to `src/business/model/`

| Old Path | New Path | Notes |
|----------|----------|-------|
| `src/types/index.ts` | `src/business/model/contract-model.ts` | **renamed** |
| `src/enum/special-fn-name.ts` | `src/business/model/special-fn-name.ts` | |
| `src/business/model/yaml-contract-model.ts` | `src/business/model/yaml-contract-model.ts` | no change |
| `src/business/model/yaml-contract-model.test.ts` | `src/business/model/yaml-contract-model.test.ts` | no change |

### Move to `src/util/`

| Old Path | New Path | Notes |
|----------|----------|-------|
| `src/global-contract/date-mock.ts` | `src/util/date-mock-util.ts` | **renamed** |
| `src/global-contract/date.contract.yaml` | `src/util/date-mock-util.contract.yaml` | **renamed** |

### No change

| Path | Reason |
|------|--------|
| `src/index.ts` | npm package entry point |
| `src/vitest-plugin.ts` | npm export entry point |
| `src/types/global.d.ts` | Ambient declaration, not a domain model |
| `src/__tests__/index-vitest-setup.ts` | Test infrastructure |
| `src/util/fn-util.ts` | Already in correct location |
| `src/util/object-util.ts` | Already in correct location |
| `src/util/type-util.ts` | Already in correct location |
| `src/util/fn-util.contract.yaml` | Already in correct location |
| `src/util/type-util.contract.yaml` | Already in correct location |
| `src/business/component/yaml-parser/**` | Already in correct location |

---

## 5. Naming Changes

### File renames

| Old Name | New Name | Reason |
|----------|----------|--------|
| `src/types/index.ts` | `src/business/model/contract-model.ts` | "index.ts" is only for barrel/entry files; this is a model file. The new name describes its content. |
| `src/contract-mock/mock-strategy.ts` | `src/business/component/contractor-mock/contractor-mock-strategy.ts` | Prefix with domain name to avoid ambiguity now that it lives alongside other strategy groups. |
| `src/contract-mock/mock-vitest-strategy.ts` | `src/business/component/contractor-mock/contractor-mock-vitest-strategy.ts` | Prefix with domain name. |
| `src/contract-mock/mock-vitest-empty-strategy.ts` | `src/business/component/contractor-mock/contractor-mock-vitest-empty-strategy.ts` | Prefix with domain name. |
| `src/global-contract/date-mock.ts` | `src/util/date-mock-util.ts` | Follow util naming convention (`*-util.ts`). |
| `src/global-contract/date.contract.yaml` | `src/util/date-mock-util.contract.yaml` | Match the new source file name. |

### Export renames

No export renames are needed. All existing export names (`contractor`, `mocker`, `contractorService`, `contractExpectService`, `contractMockService`, `mockerService`, `subjectService`, `vitestSpyService`, `SpecialFnName`, etc.) already follow the conventions:
- Singletons use camelCase
- Classes use PascalCase
- Enums use PascalCase

### Import path updates required

Every file that imports from a moved module needs its `#src/...` path updated. The most impacted imports:

| Old Import Path | New Import Path | Used In |
|-----------------|-----------------|---------|
| `#src/types/index.js` | `#src/business/model/contract-model.js` | ~20 files |
| `#src/enum/special-fn-name.js` | `#src/business/model/special-fn-name.js` | ~8 files |
| `#src/contract/contractor-service.js` | `#src/business/component/contractor/contractor-service.js` | contractor.ts |
| `#src/contract/contractor.js` | `#src/business/service/contractor.js` | contractor-test-runner.ts, vitest-plugin.ts |
| `#src/contract/expect/contract-expect-service.js` | `#src/business/component/contractor-expect/contract-expect-service.js` | contractor.ts |
| `#src/contract-mock/contract-mock-service.js` | `#src/business/component/contractor-mock/contractor-mock-service.js` | contractor.ts |
| `#src/mocker/mocker-service.js` | `#src/business/component/mocker/mocker-service.js` | mocker.ts |
| `#src/mocker/mocker-strategy.js` | `#src/business/component/mocker/mocker-strategy.js` | mocker-service.ts, mocker strategies |
| `#src/mocker/mocker-vitest-class-strategy.js` | `#src/business/component/mocker/mocker-vitest-class-strategy.js` | mocker-service.ts |
| `#src/mocker/mocker-vitest-function-strategy.js` | `#src/business/component/mocker/mocker-vitest-function-strategy.js` | mocker-service.ts |
| `#src/mocker/mocker-vitest-object-strategy.js` | `#src/business/component/mocker/mocker-vitest-object-strategy.js` | mocker-service.ts |
| `#src/mocker/mocker.js` | `#src/mocker/mocker.js` (stays -- see Note below) | contract-loader.ts, index.ts |
| `#src/subject/subject-service.js` | `#src/business/component/subject/subject-service.js` | contractor.ts |
| `#src/subject/subject-strategy.js` | `#src/business/component/subject/subject-strategy.js` | subject-service.ts, strategies |
| `#src/vitest-spy/vitest-spy-service.js` | `#src/business/component/vitest-spy/vitest-spy-service.js` | mocker-vitest-class-strategy.ts |
| `#src/vitest-spy/vitest-spy-function-strategy.js` | `#src/business/component/vitest-spy/vitest-spy-function-strategy.js` | mocker.ts, mocker strategies |
| `#src/global-contract/date-mock.js` | `#src/util/date-mock-util.js` | external consumers |

---

## 6. Notes and Edge Cases

### 6.1 `mocker.ts` placement -- special case

`src/mocker/mocker.ts` exports the `mocker` singleton which is one of the two main public API entry points (alongside `contractor`). Unlike the other strategies in the `mocker/` folder, it is the **facade** that ties everything together.

**Options considered**:
- **A**: Move to `src/business/service/mocker.ts` (parallel to `contractor.ts`). This is the cleanest conceptual fit but requires `mocker.ts` to import strategies from `src/business/component/mocker/` -- a service importing from a component, which is the correct dependency direction.
- **B**: Leave in `src/mocker/mocker.ts` (current location). Avoids import changes but leaves a top-level folder.

**Recommendation**: Option A. Move to `src/business/service/mocker.ts`. This creates symmetry with `contractor.ts` and ensures no top-level domain folders remain.

### 6.2 `src/types/global.d.ts` stays in place

This file contains an ambient global type augmentation (`declare global { ... }`). It is not a business model -- it is TypeScript infrastructure. Clean-typescript rules target domain type definitions, not `*.d.ts` ambient files. It should remain at `src/types/global.d.ts`.

### 6.3 `src/types/` folder after migration

After moving `src/types/index.ts` to `src/business/model/contract-model.ts`, the `src/types/` folder will contain only `global.d.ts`. This is acceptable -- it becomes a TypeScript-only utility folder with no business logic.

### 6.4 package.json exports paths must be updated

The package.json `exports` field references specific paths that will change:

```jsonc
// BEFORE
"./contract-reporter": {
  "types": "./dist/contract/contract-reporter.d.ts",
  "import": "./dist/contract/contract-reporter.js"
}

// AFTER
"./contract-reporter": {
  "types": "./dist/business/component/contractor/contract-reporter.d.ts",
  "import": "./dist/business/component/contractor/contract-reporter.js"
}
```

The `./vitest-plugin` export stays the same since `vitest-plugin.ts` does not move.

### 6.5 vitest-plugin.ts internal reference

`vitest-plugin.ts` imports `contractorTestRunner` from `@beecode/msh-test-contractor/contract/contractor-test-runner`. After migration this becomes `@beecode/msh-test-contractor/business/component/contractor/contractor-test-runner`. The `#src` alias ensures the source import resolves correctly at build time, but the package.json export path may also need updating.

### 6.6 Contract YAML files co-located with source

The `*.contract.yaml` files that live alongside their source files (e.g., `mock-vitest-strategy.contract.yaml` next to `mock-vitest-strategy.ts`) should move together with their source. This preserves the co-location pattern.

### 6.7 yaml-parser barrel export is acceptable

`src/business/component/yaml-parser/index.ts` is a barrel export. The clean-typescript rule says "No barrel exports except for component public API and npm package entry points." Since `yaml-parser` is a component with a public API, this barrel is justified. No change needed.

### 6.8 No logic changes

This refactoring touches only:
- File locations (moves)
- File names (renames for the files listed in section 5)
- Import paths (update `#src/...` references)
- package.json exports (update paths)

No function bodies, class implementations, type definitions, or business logic should change.

### 6.9 Suggested migration order

1. Move `src/types/index.ts` -> `src/business/model/contract-model.ts` + update all imports
2. Move `src/enum/special-fn-name.ts` -> `src/business/model/special-fn-name.ts` + update all imports
3. Move `src/global-contract/` -> `src/util/` + rename + update imports
4. Move `src/contract-mock/` -> `src/business/component/contractor-mock/` + rename files + update imports
5. Move `src/contract/expect/` -> `src/business/component/contractor-expect/` + update imports
6. Move `src/vitest-spy/` -> `src/business/component/vitest-spy/` + update imports
7. Move `src/subject/` -> `src/business/component/subject/` + update imports
8. Move `src/mocker/` (strategies only) -> `src/business/component/mocker/` + update imports
9. Move `src/mocker/mocker.ts` -> `src/business/service/mocker.ts` + update imports
10. Move `src/contract/` (remaining files) -> `src/business/component/contractor/` + `src/business/service/contractor.ts` + update imports
11. Update `package.json` exports
12. Run full test suite to verify

Each step should be a separate commit with `npm run build && npm run test` passing.

### 6.10 Files that do NOT move

For clarity, these files stay exactly where they are:

- `src/index.ts`
- `src/vitest-plugin.ts`
- `src/types/global.d.ts`
- `src/__tests__/index-vitest-setup.ts`
- `src/business/component/yaml-parser/**` (already correct)
- `src/business/model/yaml-contract-model.ts`
- `src/business/model/yaml-contract-model.test.ts`
- `src/util/fn-util.ts`
- `src/util/object-util.ts`
- `src/util/type-util.ts`
- `src/util/fn-util.contract.yaml`
- `src/util/type-util.contract.yaml`
