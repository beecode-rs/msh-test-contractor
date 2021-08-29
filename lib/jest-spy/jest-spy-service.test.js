"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const JestSpyClassFunctionStrategyModule = __importStar(require("./jest-spy-class-function-strategy"));
const JestSpyFunctionStrategyModule = __importStar(require("./jest-spy-function-strategy"));
const jest_spy_service_1 = require("./jest-spy-service");
describe('jestSpyService', () => {
    describe('strategyFromTerms', () => {
        let spy_JestSpyFunctionStrategy;
        let spy_JestSpyClassFunctionStrategy;
        beforeEach(() => {
            spy_JestSpyFunctionStrategy = jest.spyOn(JestSpyFunctionStrategyModule, 'JestSpyFunctionStrategy');
            spy_JestSpyClassFunctionStrategy = jest.spyOn(JestSpyClassFunctionStrategyModule, 'JestSpyClassFunctionStrategy');
        });
        afterEach(() => {
            jest.resetAllMocks();
        });
        it('should throw error if terms are empty array', () => {
            expect(() => {
                jest_spy_service_1.jestSpyService.strategyFromTerms({ terms: [] });
            }).toThrow('Terms missing');
        });
        it('should return JestSpyFunctionStrategy if there is no constructorParams in params', () => {
            jest_spy_service_1.jestSpyService.strategyFromTerms({ terms: [{}] });
            expect(spy_JestSpyFunctionStrategy).toHaveBeenCalledTimes(1);
            expect(spy_JestSpyClassFunctionStrategy).toHaveBeenCalledTimes(0);
        });
        it('should return JestSpyClassFunctionStrategy if there is constructorParams in params', () => {
            jest_spy_service_1.jestSpyService.strategyFromTerms({ terms: [{ constructorParams: [] }] });
            expect(spy_JestSpyFunctionStrategy).toHaveBeenCalledTimes(1);
            expect(spy_JestSpyClassFunctionStrategy).toHaveBeenCalledTimes(0);
        });
    });
});
//# sourceMappingURL=jest-spy-service.test.js.map