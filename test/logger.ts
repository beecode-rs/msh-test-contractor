export const logger = {
	_message: (type: string, message: string): string => {
		return `${new Date().toISOString()}:${type.toUpperCase()}:${message}`
	},
	debug: (message: string): string => {
		const debugMessage = logger._message('DEBUG', message)
		console.log(debugMessage) // eslint-disable-line no-console

		return debugMessage
	},
}
