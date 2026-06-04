import c from 'tinyrainbow'
import { DefaultReporter } from 'vitest/reporters'

import type { TestCase, TestModule, TestModuleState, TestSuite } from 'vitest/reporters'

const INDENT = '  '
const CONTRACT_SUFFIX = ' [contract]'
const TERM_REGEX = /^input: (.+?)\s{2,}output: (.+)$/

export class ContractReporter extends DefaultReporter {
	protected override verbose = true
	override renderSucceed = true

	override printTestModule(testModule: TestModule): void {
		const moduleState = testModule.state()
		if (moduleState === 'queued' || moduleState === 'pending') {
			return
		}

		const relPath = this.relative(testModule.moduleId)
		this.log()
		this.log(c.dim(relPath))
		this._printChildren(testModule.children.array(), 1, moduleState)
	}

	private _printChildren(children: (TestCase | TestSuite)[], depth: number, moduleState: TestModuleState): void {
		for (const child of children) {
			if (child.type === 'suite') {
				this._printSuite(child, depth, moduleState)
			} else {
				this._printTest(child, depth)
			}
		}
	}

	private _printSuite(suite: TestSuite, depth: number, moduleState: TestModuleState): void {
		const indent = INDENT.repeat(depth)
		const name = _cleanSuiteName(suite.name, depth)
		this.log(`${indent}${c.bold(name)}`)
		this._printChildren(suite.children.array(), depth + 1, moduleState)
	}

	private _printTest(test: TestCase, depth: number): void {
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

const _cleanSuiteName = (name: string, depth: number): string => {
	if (depth >= 2 && name.endsWith(CONTRACT_SUFFIX)) {
		return name.slice(0, -CONTRACT_SUFFIX.length)
	}

	return name
}

const _formatTermName = (name: string): string => {
	const match = name.match(TERM_REGEX)
	if (match) {
		return `${match[1]} → ${match[2]}`
	}

	return name
}
