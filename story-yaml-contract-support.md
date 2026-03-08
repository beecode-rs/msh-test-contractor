# Story: YAML Contract Support

## Overview

Implement YAML-based contract definitions to improve readability and maintainability of test contracts. This involves:
1. Creating a YAML parser component that accepts a YAML file location and returns a JS object
2. Converting all existing `*.contract.ts` files to `*.contract.yaml` format
3. Using the YAML contracts in unit tests

---

## Dependencies

- `js-yaml` package for YAML parsing
- Existing `test-contractor` types and interfaces
- Existing contract files in `test/` and `src/` directories

---

## Tasks

### Task 1: Install js-yaml Dependency

**Layer:** backend

**Description:**
Add the `js-yaml` package as a dependency for YAML parsing.

**Changes:**
- Update `package.json` to include `js-yaml` dependency

**Verification:**
- [ ] `npm install` completes without errors
- [ ] `import yaml from 'js-yaml'` works
- [ ] Typecheck passes
- [ ] All tests pass

---

### Task 2: Create Special Object Parsers for YAML

**Layer:** backend

**Description:**
Create parsers for JavaScript objects that need special handling (Error, Promise, Date, RegExp). These parse JavaScript-style syntax strings (e.g., `new Error("msg")`, `Promise.resolve(value)`) and convert them to real JS objects at runtime.

**Changes:**
- Create `src/yaml/types/` directory
- Create `src/yaml/types/error-parser.ts` - parses `new Error("message")` syntax
- Create `src/yaml/types/promise-parser.ts` - parses `Promise.resolve()` and `Promise.reject()` syntax
- Create `src/yaml/types/date-parser.ts` - parses `new Date("2024-01-15")` syntax
- Create `src/yaml/types/regex-parser.ts` - parses `new RegExp("pattern", "flags")` syntax
- Create `src/yaml/types/index.ts` - exports all parsers and type guards

**Verification:**
- [ ] Unit test: `new Error("message")` string creates `Error` object
- [ ] Unit test: `Promise.resolve({ id: 1 })` string creates resolved promise
- [ ] Unit test: `Promise.reject(new Error("failed"))` string creates rejected promise
- [ ] Unit test: `new Date("2024-01-15")` string creates `Date` object
- [ ] Unit test: `new RegExp("^[a-z]+$", "gi")` string creates `RegExp` object
- [ ] Typecheck passes
- [ ] All tests pass

---

### Task 3: Create Shorthand String Parser

**Layer:** backend

**Description:**
Implement parser for shorthand string format like `"[1, 2] => 3"` and `"([ctorParams]); [params] => result"`.

**Changes:**
- Create `src/yaml/parsers/shorthand-parser.ts`
- Implement regex patterns for:
  - Basic: `[params] => result`
  - With constructor: `([ctorParams]); [params] => result`
- Export `parseShorthandTerm(string): Partial<ContractTerm>` function

**Verification:**
- [ ] Unit test: `"[1, 2] => 3"` returns `{ params: [1, 2], result: 3 }`
- [ ] Unit test: `"(['hello'] => 'world'"` returns `{ params: ['hello'], result: 'world' }`
- [ ] Unit test: `"(['db-config']); ['userId'] => user"` returns `{ constructorParams: ['db-config'], params: ['userId'], result: 'user' }`
- [ ] Unit test: invalid strings return `null` or throw appropriate error
- [ ] Typecheck passes
- [ ] All tests pass

---

### Task 4: Create Contract YAML Parser Service

**Layer:** backend

**Description:**
Create the main YAML parser service that:
1. Reads YAML file from filesystem
2. Parses YAML content with custom schema
3. Transforms to internal contract format
4. Resolves module path at runtime

**Changes:**
- Create `src/yaml/yaml-contract-parser.ts`
- Implement `YamlContractParser` interface:
  - `parseFile(path: string): Promise<YamlContractDefinition>`
  - `parseString(yaml: string): YamlContractDefinition`
- Handle field mapping (YAML -> JSON):
  - `subject` -> `subjectName`
  - `methods` -> `fns`
  - `constructor` -> `fns.constructor`
- Support subject type inference (class vs function)
- Create `src/yaml/index.ts` - main export

**Verification:**
- [ ] Unit test: parsing valid YAML file returns correct contract object
- [ ] Unit test: parsing YAML string returns correct contract object
- [ ] Unit test: shorthand terms are converted to structured terms
- [ ] Unit test: custom types (!error, !resolve) create real JS objects
- [ ] Unit test: subjectType is correctly inferred
- [ ] Typecheck passes
- [ ] All tests pass

---

### Task 5: Create Contract Definition Types for YAML

**Layer:** backend

**Description:**
Create TypeScript types that represent the YAML contract structure.

**Changes:**
- Create `src/yaml/types/yaml-contract-types.ts`
- Define types:
  - `YamlContractDefinition` - top-level contract
  - `YamlMethodDefinition` - method with terms
  - `YamlTerm` - term with params/result
- Create type guards for validation

**Verification:**
- [ ] Types compile without errors
- [ ] Type guards correctly identify valid/invalid structures
- [ ] Typecheck passes
- [ ] All tests pass

---

### Task 6: Create YAML Contract Loader (Runtime Module Resolution)

**Layer:** backend

**Description:**
Create a loader that takes the parsed YAML contract and resolves the module reference at runtime, producing a fully functional `Contract` object compatible with the existing contractor system.

**Changes:**
- Create `src/yaml/yaml-contract-loader.ts`
- Implement `loadYamlContract(path: string): Promise<Contract>`
- Implement `yamlContractFactory(definition: YamlContractDefinition, modulePath: string): Contract`
- Handle module import resolution
- Handle mock function generation from YAML

**Verification:**
- [ ] Unit test: loading function contract produces valid Contract
- [ ] Unit test: loading class contract produces valid Contract
- [ ] Unit test: contract works with existing `contractor` test runner
- [ ] Integration test: loaded contract executes correctly
- [ ] Typecheck passes
- [ ] All tests pass

---

### Task 7: Update Test Runner to Support YAML Contracts

**Layer:** backend

**Description:**
Extend the existing test runner to discover and run `*.contract.yaml` files alongside `*.contract.ts` files.

**Changes:**
- Update `src/contract/contractor-test-runner.ts`
- Add YAML file glob pattern to discovery
- Integrate `YamlContractLoader` for YAML files
- Ensure both formats work in the same test run

**Verification:**
- [ ] Unit test: test runner discovers `*.contract.yaml` files
- [ ] Integration test: YAML contracts run alongside TS contracts
- [ ] All existing tests continue to pass
- [ ] Typecheck passes
- [ ] App runs without errors

---

### Task 8: Convert Sample Contract Files (Test Phase)

**Layer:** backend

**Description:**
Convert a few representative contract files to YAML format to validate the implementation.

**Changes:**
- Create `test/simple-function.contract.yaml` (function contract)
- Create `test/dummy-class.contract.yaml` (class contract with constructor)
- Create `test/dummy-function.contract.yaml` (dependency mock)

**Verification:**
- [ ] Converted YAML files are valid YAML
- [ ] Converted YAML contracts pass all tests that TS contracts pass
- [ ] Typecheck passes
- [ ] All tests pass (both TS and YAML)

---

### Task 9: Convert All Contract Files to YAML

**Layer:** cleanup

**Description:**
Convert all remaining `*.contract.ts` files to `*.contract.yaml` format.

**Changes:**
- Convert `src/contract-mock/*.contract.ts` -> `*.contract.yaml`
- Convert `src/vitest-spy/*.contract.ts` -> `*.contract.yaml`
- Convert `src/subject/*.contract.ts` -> `*.contract.yaml`
- Convert `src/util/*.contract.ts` -> `*.contract.yaml`
- Convert `src/global-contract/*.contract.ts` -> `*.contract.yaml`
- Convert `src/mocker/*.contract.ts` -> `*.contract.yaml`
- Convert `test/*.contract.ts` -> `*.contract.yaml`
- Remove or deprecate old `*.contract.ts` files

**Files to Convert (17 total):**
- `test/dummy-function.contract.ts`
- `test/dummy-class.contract.ts`
- `test/simple-function.contract.ts`
- `test/logger.contract.ts`
- `src/contract-mock/mock-vitest-strategy.contract.ts`
- `src/contract-mock/mock-vitest-empty-strategy.contract.ts`
- `src/contract-mock/contract-mock-service.contract.ts`
- `src/vitest-spy/vitest-spy-function-strategy.contract.ts`
- `src/vitest-spy/vitest-spy-class-function-strategy.contract.ts`
- `src/subject/subject-function-strategy.contract.ts`
- `src/subject/subject-class-function-strategy.contract.ts`
- `src/subject/subject-constructor-strategy.contract.ts`
- `src/subject/subject-service.contract.ts`
- `src/util/fn-util.contract.ts`
- `src/util/type-util.contract.ts`
- `src/global-contract/date.contract.ts`
- `src/mocker/mocker-vitest-object-strategy.contract.ts`

**Verification:**
- [ ] All 17 contract files converted to YAML
- [ ] All tests pass with YAML contracts only
- [ ] Typecheck passes
- [ ] No breaking changes to existing functionality

---

### Task 10: Update Documentation and Examples

**Layer:** cleanup

**Description:**
Update CLAUDE.md and create documentation for the new YAML format.

**Changes:**
- Update `CLAUDE.md` with YAML contract examples
- Move proposal files to appropriate documentation location
- Create usage examples

**Verification:**
- [ ] Documentation is clear and complete
- [ ] Examples work correctly
- [ ] Typecheck passes
- [ ] All tests pass

---

## Completion Criteria

The story is complete when:

- [ ] YAML parser component accepts file location and returns JS object
- [ ] All `*.contract.ts` files converted to `*.contract.yaml`
- [ ] All tests pass with YAML contracts
- [ ] Special object parsers (new Error, Promise.resolve/reject, new Date, new RegExp) work correctly
- [ ] Shorthand format `[params] => result` is supported
- [ ] Test runner discovers and runs both TS and YAML contracts
- [ ] Documentation is updated

## Rollback Plan

1. If YAML contracts cause issues, revert to `*.contract.ts` files from git
2. Remove `src/yaml/` directory
3. Remove `js-yaml` dependency
4. Revert test runner changes

---

## Notes

### Design Decisions

1. **JavaScript-style Syntax over Custom YAML Tags**: Using `new Error("msg")` instead of `!error "msg"` because it's more familiar to developers and easier to read. Strings are parsed after YAML loading to create real JS objects.

2. **Hybrid Format Support**: The parser will support both:
   - Native YAML objects for complex data
   - JavaScript-style strings for special objects (Error, Promise, Date, RegExp)
   - Shorthand strings for simple cases

3. **Module Resolution at Runtime**: YAML files store module paths as strings, resolved to actual modules when loaded.

4. **Backward Compatibility**: Existing `*.contract.ts` files will continue to work during transition.

### Reference Files

- Proposal: `resource/doc/improvement/yaml-format/contract-yaml-proposal.md`
- JSON conversion: `resource/doc/improvement/yaml-format/yaml-to-json-conversion-proposal.md`
- Demo: `resource/doc/improvement/yaml-format/yaml-to-js-object-demo.ts`
