export const logger = {
  debug: (message: string): void => {
    console.log(logger._message('DEBUG', message)) // eslint-disable-line no-console
  },
  _message: (type: string, message: string): string => {
    return `${new Date().toISOString()}:${type.toUpperCase()}:${message}`
  },
}
