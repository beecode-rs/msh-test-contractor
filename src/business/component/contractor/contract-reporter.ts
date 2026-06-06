import c from 'tinyrainbow'
import type { TestCase, TestModule, TestModuleState, TestSuite } from 'vitest/node'
import { DefaultReporter } from 'vitest/reporters'

const INDENT = '  '
const CONTRACT_SUFFIX = ' [contract]'
const TERM_REGEX = /^input: (.+?)\s{2,}output: (.+)$/

export class ContractReporter extends DefaultReporter {
	protected override _verbose = true
	override renderSucceed = true

	override printTestModule(testModule: TestModule): void {
		const moduleState = testModule.state()
		if (moduleState === 'queued' || moduleState === 'pending') {
			return
		}

		const relPath = this.relative(testModule.moduleId)
		this.log()
		this.log(c.dim(relPath))
		this._printChildren(testModule.children.array(), 1, moduleState, testModule.moduleId)
	}

	protected _printChildren(
		children: (TestCase | TestSuite)[],
		depth: number,
		moduleState: TestModuleState,
		moduleId: string
	): void {
		for (const child of children) {
			if (child.type === 'suite') {
				this._printSuite(child, depth, moduleState, moduleId)
			} else {
				this._printTest(child, depth)
			}
		}
	}

	protected _printSuite(suite: TestSuite, depth: number, moduleState: TestModuleState, moduleId: string): void {
		if (_isRedundantPathSuite(suite.name, moduleId)) {
			this._printChildren(suite.children.array(), depth, moduleState, moduleId)

			return
		}

		const indent = INDENT.repeat(depth)
		const name = _cleanSuiteName(suite.name, depth)
		this.log(`${indent}${c.bold(name)}`)
		this._printChildren(suite.children.array(), depth + 1, moduleState, moduleId)
	}

	protected _printTest(test: TestCase, depth: number): void {
		const indent = INDENT.repeat(depth)
		const symbol = this.getStateSymbol(test)
		const name = _formatTermName(test.name)
		const result = test.result()

		if (result.state === 'passed') {
			const diag = test.diagnostic()
			const duration = diag ? ` ${c.dim(`${diag.duration}ms`)}` : ''
			this.log(`${indent}${symbol} ${name}${duration}`)
		} else if (result.state === 'failed') {
			this.log(`${indent}${symbol} ${name}`)
			for (const error of result.errors ?? []) {
				const msg = typeof error === 'object' && 'message' in error ? String(error.message) : String(error)
				this.log(`${indent}${INDENT}${c.red(msg)}`)
			}
		} else {
			this.log(`${indent}${symbol} ${name}`)
		}
	}
}

const _isRedundantPathSuite = (suiteName: string, moduleId: string): boolean => {
	return suiteName === moduleId
}

const _cleanSuiteName = (name: string, depth: number): string => {
	if (depth >= 1 && name.endsWith(CONTRACT_SUFFIX)) {
		return name.slice(0, -CONTRACT_SUFFIX.length)
	}

	return name
}

const _formatTermName = (name: string): string => {
	const match = TERM_REGEX.exec(name)
	if (match) {
		return `${String(match[1])} → ${String(match[2])}`
	}

	return name
}
