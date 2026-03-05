/**
 * YAML to JavaScript Object Demo
 *
 * This demonstrates how to parse YAML and get real JavaScript objects
 * like Error, Promise, Date, RegExp, etc. at runtime.
 *
 * Approach: Use js-yaml with custom YAML tags
 */

import yaml from 'js-yaml'

// =============================================================================
// OPTION 1: Custom YAML Tags (Recommended)
// =============================================================================

/**
 * Define custom YAML types that create real JS objects
 */
const ErrorYamlType = new yaml.Type('!error', {
	kind: 'scalar',
	construct: (data: string) => {
		// Parse: !error "Something went wrong"
		return new Error(data)
	},
})

const PromiseResolveYamlType = new yaml.Type('!resolve', {
	kind: 'scalar',
	construct: (data: string) => {
		// Parse: !resolve { id: 1, name: "John" }
		// The data is already parsed as JS object by js-yaml
		return Promise.resolve(data)
	},
})

const PromiseRejectYamlType = new yaml.Type('!reject', {
	kind: 'scalar',
	construct: (data: string) => {
		return Promise.reject(new Error(data))
	},
})

const DateYamlType = new yaml.Type('!date', {
	kind: 'scalar',
	construct: (data: string) => {
		return new Date(data)
	},
})

const RegexYamlType = new yaml.Type('!regex', {
	kind: 'scalar',
	construct: (data: string) => {
		const match = data.match(/^\/(.*)\/([gimsuy]*)$/)
		if (!match) throw new Error(`Invalid regex: ${data}`)
		return new RegExp(match[1], match[2])
	},
})

// Create schema with all custom types
const CONTRACT_SCHEMA = yaml.DEFAULT_SCHEMA.extend({
	implicit: [], // No implicit types
	explicit: [ErrorYamlType, PromiseResolveYamlType, PromiseRejectYamlType, DateYamlType, RegexYamlType],
})

// =============================================================================
// Usage Examples
// =============================================================================

const yamlWithCustomTags = `
# Using custom tags - creates real JS objects
errorResult: !error "Something went wrong"
promiseResult: !resolve { id: 1, name: "John" }
rejectResult: !reject "User not found"
dateResult: !date "2024-01-15"
regexResult: !regex "/^[a-z]+$/gi"
`

console.log('=== Custom YAML Tags ===')
const parsedCustom = yaml.load(yamlWithCustomTags, { schema: CONTRACT_SCHEMA }) as Record<string, unknown>

console.log('errorResult:', parsedCustom.errorResult)
console.log('  instanceof Error:', parsedCustom.errorResult instanceof Error)

console.log('promiseResult:', parsedCustom.promiseResult)
console.log('  instanceof Promise:', parsedCustom.promiseResult instanceof Promise)

console.log('rejectResult:', parsedCustom.rejectResult)
console.log('  instanceof Promise:', parsedCustom.rejectResult instanceof Promise)

console.log('dateResult:', parsedCustom.dateResult)
console.log('  instanceof Date:', parsedCustom.dateResult instanceof Date)

console.log('regexResult:', parsedCustom.regexResult)
console.log('  instanceof RegExp:', parsedCustom.regexResult instanceof RegExp)

// =============================================================================
// OPTION 2: Post-Parse Transformation (Alternative)
// =============================================================================

/**
 * Alternative: Parse YAML normally, then transform special patterns
 */

interface SpecialTypeMatchers {
	error: RegExp
	promiseResolve: RegExp
	promiseReject: RegExp
}

const SPECIAL_TYPES: SpecialTypeMatchers = {
	error: /^new Error\(["'](.*)["']\)$/,
	promiseResolve: /^Promise\.resolve\((.+)\)$/,
	promiseReject: /^Promise\.reject\(new Error\(["'](.*)["']\)\)$/,
}

function transformSpecialTypes(value: unknown): unknown {
	if (typeof value === 'string') {
		// Check for Error pattern
		const errorMatch = value.match(SPECIAL_TYPES.error)
		if (errorMatch) {
			return new Error(errorMatch[1])
		}

		// Check for Promise.resolve pattern
		const resolveMatch = value.match(SPECIAL_TYPES.promiseResolve)
		if (resolveMatch) {
			// Note: The inner value would need its own parsing
			return Promise.resolve(resolveMatch[1])
		}

		// Check for Promise.reject pattern
		const rejectMatch = value.match(SPECIAL_TYPES.promiseReject)
		if (rejectMatch) {
			return Promise.reject(new Error(rejectMatch[1]))
		}
	}

	// Recursively transform arrays
	if (Array.isArray(value)) {
		return value.map(transformSpecialTypes)
	}

	// Recursively transform objects
	if (value && typeof value === 'object') {
		const result: Record<string, unknown> = {}
		for (const [key, val] of Object.entries(value)) {
			result[key] = transformSpecialTypes(val)
		}
		return result
	}

	return value
}

const yamlWithPatterns = `
# Using TypeScript-style patterns (requires post-parse transform)
errorResult: 'new Error("Something went wrong")'
promiseResult: 'Promise.resolve({ id: 1 })'
rejectResult: 'Promise.reject(new Error("User not found"))'
normalString: "just a string"
nestedObject:
  error: 'new Error("Nested error")'
  value: 42
`

console.log('\n=== Post-Parse Transformation ===')
const parsedNormal = yaml.load(yamlWithPatterns) as Record<string, unknown>
const transformed = transformSpecialTypes(parsedNormal) as Record<string, unknown>

console.log('errorResult:', transformed.errorResult)
console.log('  instanceof Error:', transformed.errorResult instanceof Error)

console.log('nestedObject.error:', (transformed.nestedObject as Record<string, unknown>).error)
console.log('  instanceof Error:', (transformed.nestedObject as Record<string, unknown>).error instanceof Error)

// =============================================================================
// OPTION 3: Hybrid Approach for Contract Terms
// =============================================================================

/**
 * For contracts: Use native YAML for complex objects + tags for special types
 */

const contractYamlExample = `
module: ./services/user-service
subject: UserService
subjectType: class

methods:
  findById:
    terms:
      # Native YAML objects
      - params: [1]
        result:
          id: 1
          name: John
          email: john@example.com

      # Null result
      - params: [999]
        result: null

      # Error result using custom tag
      - params: [-1]
        result: !error "Invalid ID"

      # Promise result using custom tag
      - params: [1]
        result: !resolve { sent: true, messageId: "msg-123" }
`

console.log('\n=== Contract Example ===')
const contract = yaml.load(contractYamlExample, { schema: CONTRACT_SCHEMA })
console.log(JSON.stringify(contract, null, 2))

// =============================================================================
// Type Definitions for the Parser
// =============================================================================

/**
 * Contract Term with real JS objects at runtime
 */
interface ContractTerm {
	params: unknown[]
	result: unknown // Can be Error, Promise, or any value
	constructorParams?: unknown[]
}

/**
 * Parser function signature
 */
type YamlContractParser = (yamlContent: string) => {
	module: string
	subject: string
	subjectType?: 'class' | 'function' | 'constant'
	methods: Record<string, { terms: ContractTerm[] }>
}

// =============================================================================
// Summary
// =============================================================================

console.log('\n=== Summary ===')
console.log(`
Option 1: Custom YAML Tags (Recommended)
  - Use !error, !resolve, !reject tags in YAML
  - Clean syntax, explicit intent
  - Works with js-yaml's Type system

  Example:
    result: !error "Invalid ID"
    result: !resolve { id: 1 }

Option 2: Post-Parse Transformation
  - Use TypeScript-style strings: "new Error(\\"msg\\")"
  - Requires regex matching and transformation
  - More verbose, harder to handle nested objects

Option 3: Hybrid (Best for Contracts)
  - Use native YAML for regular values
  - Use custom tags only for special types (Error, Promise)
  - Most readable and maintainable
`)
