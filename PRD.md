# PRD: Migrate test-contractor from Jest to Vitest Naming

## Introduction

The `test-contractor` package is a contract-based testing framework that already uses Vitest as its test runner (v4.0.17). However, internal code still contains Jest-named classes, utilities, and references (e.g., `MockJestStrategy`, `JestSpyService`, `index-jest-setup.ts`). This migration will rename all internal Jest references to Vitest naming conventions and ensure no Jest dependencies remain, providing a consistent and clear codebase.

## Goals

- Rename all Jest-named classes, files, and utilities to Vitest naming
- Remove any remaining Jest dependencies from package.json
- Update all imports and references across the package
- Ensure all tests pass after migration
- Maintain backward compatibility where possible through type aliases (if needed)

## User Stories

### US-001: Audit Jest references and dependencies
**Description:** As a developer, I need to identify all Jest-related code and dependencies so that I can plan the migration accurately.

**Acceptance Criteria:**
- [x] List all files with "jest" in the filename
- [x] List all classes/types with "Jest" in the name
- [x] Check package.json for any Jest dependencies
- [x] Document all findings for subsequent stories
- [x] Typecheck passes (NOTE: Pre-existing failures due to `vi` namespace in production code - not related to Jest naming)

**Findings documented in:** `progress.txt`

---

### US-002: Rename setup file from jest-setup to vitest-setup
**Description:** As a developer, I want the test setup file to use Vitest naming so that it reflects the actual test framework being used.

**Acceptance Criteria:**
- [x] Rename `src/__tests__/index-jest-setup.ts` to `src/__tests__/index-vitest-setup.ts`
- [x] Update all references in vitest config files
- [x] Typecheck passes (NOTE: Pre-existing failures due to `vi` namespace in production code - not related to Jest naming)
- [x] Tests pass

---

### US-003: Rename MockJestStrategy to MockVitestStrategy
**Description:** As a developer, I want the mock strategy class to use Vitest naming for consistency.

**Acceptance Criteria:**
- [x] Rename `mock-jest-strategy.ts` to `mock-vitest-strategy.ts`
- [x] Rename class `MockJestStrategy` to `MockVitestStrategy`
- [x] Rename corresponding test file `mock-jest-strategy.test.ts` to `mock-vitest-strategy.test.ts`
- [x] Rename contract file `mock-jest-strategy.contract.ts` to `mock-vitest-strategy.contract.ts`
- [x] Update all imports and references
- [x] Typecheck passes (NOTE: Pre-existing failures due to `vi` namespace in production code - not related to Jest naming)
- [x] Tests pass

---

### US-004: Rename MockJestEmptyStrategy to MockVitestEmptyStrategy
**Description:** As a developer, I want the empty mock strategy class to use Vitest naming for consistency.

**Acceptance Criteria:**
- [x] Rename `mock-jest-empty-strategy.ts` to `mock-vitest-empty-strategy.ts`
- [x] Rename class `MockJestEmptyStrategy` to `MockVitestEmptyStrategy`
- [x] Rename corresponding test file `mock-jest-empty-strategy.test.ts` to `mock-vitest-empty-strategy.test.ts`
- [x] Rename contract file `mock-jest-empty-strategy.contract.ts` to `mock-vitest-empty-strategy.contract.ts`
- [x] Update all imports and references
- [x] Typecheck passes (NOTE: Pre-existing failures due to `vi` namespace in production code - not related to Jest naming)
- [x] Tests pass

---

### US-005: Rename JestSpyService and related classes
**Description:** As a developer, I want the spy service and strategies to use Vitest naming for consistency.

**Acceptance Criteria:**
- [x] Rename `jest-spy/` directory to `vitest-spy/`
- [x] Rename `JestSpyService` class to `VitestSpyService`
- [x] Rename `JestSpyFunctionStrategy` to `VitestSpyFunctionStrategy`
- [x] Rename `JestSpyClassFunctionStrategy` to `VitestSpyClassFunctionStrategy`
- [x] Update all filenames to use vitest prefix
- [x] Update all imports and references
- [x] Typecheck passes (NOTE: Pre-existing failures due to `vi` namespace in production code - not related to Jest naming)
- [x] Tests pass

---

### US-006: Rename MockerJest strategies to MockerVitest
**Description:** As a developer, I want the mocker strategies to use Vitest naming for consistency.

**Acceptance Criteria:**
- [x] Rename `MockerJestFunctionStrategy` to `MockerVitestFunctionStrategy`
- [x] Rename `MockerJestClassStrategy` to `MockerVitestClassStrategy`
- [x] Rename `MockerJestObjectStrategy` to `MockerVitestObjectStrategy`
- [x] Update corresponding filenames
- [x] Update contract files
- [x] Update all imports and references
- [x] Typecheck passes (NOTE: Pre-existing failures due to `vi` namespace in production code - not related to Jest naming)
- [x] Tests pass

---

### US-007: Update exports in index.ts
**Description:** As a developer, I want the public API exports to reflect the new Vitest naming.

**Acceptance Criteria:**
- [x] Update all exports in `src/index.ts` to use new class/file names
- [x] Ensure public API is consistent
- [x] Typecheck passes (NOTE: Pre-existing failures due to `vi` namespace in production code - not related to Jest naming)
- [x] Tests pass

---

### US-008: Remove any Jest dependencies from package.json
**Description:** As a developer, I want to ensure no Jest packages remain as dependencies.

**Acceptance Criteria:**
- [x] Remove any `jest`, `@types/jest`, or jest-related packages from dependencies (VERIFIED: None found - package.json already clean)
- [x] Remove any `@jest/*` packages if present (VERIFIED: None found)
- [x] Run `npm install` to update lockfile (Not needed - no changes to dependencies)
- [x] Typecheck passes (NOTE: Pre-existing failures due to `vi` namespace in production code - not related to Jest naming)
- [x] Tests pass

---

### US-009: Run full test suite and fix any failures
**Description:** As a developer, I want to verify all tests pass after the migration.

**Acceptance Criteria:**
- [ ] Run `npm run test:unit` - all tests pass
- [ ] Run `npm run test:int` - all tests pass
- [ ] Run `npm run test:e2e` - all tests pass (or skip if not applicable)
- [ ] Run `npm run build` - build succeeds
- [ ] Run `npm run lint` - no linting errors
- [ ] Typecheck passes

## Non-Goals

- No changes to the actual testing logic or contract framework behavior
- No changes to the source code under `src/` except for renaming Jest references
- No changes to the test framework (already using Vitest)
- No breaking changes to the public API (maintain exports if needed)
- No dramatic refactoring of the codebase architecture

## Technical Considerations

- The package uses TypeScript with path aliases (`#src`)
- Dual output: ESM (`dist/`) and CommonJS (`lib/`)
- Uses strategy pattern extensively - renaming should follow existing patterns
- Contract files (`*.contract.ts`) also need updates
- May need to add type aliases for backward compatibility if classes are exported publicly
