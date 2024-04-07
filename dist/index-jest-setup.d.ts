declare module '@jest/expect' {
    interface Matchers<R extends void | Promise<void>> extends CustomMatchers<R> {
    }
}
export {};
//# sourceMappingURL=index-jest-setup.d.ts.map