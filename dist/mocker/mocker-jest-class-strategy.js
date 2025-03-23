import { vi } from 'vitest';
import { SpecialFnName } from '#src/enum/special-fn-name';
import { JestSpyFunctionStrategy } from '#src/jest-spy/jest-spy-function-strategy';
import { jestSpyService } from '#src/jest-spy/jest-spy-service';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class MockerJestClassStrategy {
    _contract;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _spy;
    constructor(_contract) {
        this._contract = _contract;
    }
    mockRestore() {
        if (this._spy) {
            this._spy.mockRestore();
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contractSpy() {
        const { module, subjectName } = this._contract;
        const functionNames = this._functionNames(module[subjectName]);
        this._spy = vi.spyOn(module, subjectName);
        this._spy.mockImplementation(this._mockClass(functionNames));
        return this._spy;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _functionNames(classObject) {
        return Object.getOwnPropertyNames(classObject.prototype).filter((fn) => fn !== 'constructor');
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _mockClass(functionNames) {
        const { fns, subjectName } = this._contract;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (...mockParams) => {
            const { [SpecialFnName.CONSTRUCTOR]: constructorFns, ...restFns } = fns;
            const objectWithMockedFunctions = Object.fromEntries(functionNames.map((fnName) => {
                const mockFn = vi.fn();
                if (restFns[fnName]?.terms) {
                    const mockImpl = this._mockFunction({
                        mockClassParams: mockParams,
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        name: `${subjectName}.${fnName}`,
                        terms: restFns[fnName].terms,
                    });
                    mockFn.mockImplementation(mockImpl);
                }
                return [fnName, mockFn];
            }));
            const constructorJestSpy = new JestSpyFunctionStrategy({ name: subjectName, terms: constructorFns.terms });
            const constructorMockImplementation = constructorJestSpy.mockImplementationFactory();
            const constructorResultObject = constructorMockImplementation(...mockParams);
            return { ...objectWithMockedFunctions, ...constructorResultObject };
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _mockFunction(params) {
        const { terms, mockClassParams, name } = params;
        const jestSpyStrategy = jestSpyService.strategyFromTerms({ mockClassParams, name, terms });
        return jestSpyStrategy.mockImplementationFactory();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja2VyLWplc3QtY2xhc3Mtc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9ja2VyL21vY2tlci1qZXN0LWNsYXNzLXN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFM0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBQ3pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFBO0FBQ2xGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQTtBQUkvRCw4REFBOEQ7QUFDOUQsTUFBTSxPQUFPLHVCQUF1QjtJQUliO0lBSHRCLDhEQUE4RDtJQUNwRCxJQUFJLENBQWdCO0lBRTlCLFlBQXNCLFNBQXNCO1FBQXRCLGNBQVMsR0FBVCxTQUFTLENBQWE7SUFBRyxDQUFDO0lBRWhELFdBQVc7UUFDVixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDeEIsQ0FBQztJQUNGLENBQUM7SUFFRCw4REFBOEQ7SUFDOUQsV0FBVztRQUNWLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQTtRQUM5QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO1FBQzlELElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7UUFFNUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO0lBQ2pCLENBQUM7SUFFRCw4REFBOEQ7SUFDcEQsY0FBYyxDQUFDLFdBQWdCO1FBQ3hDLE9BQU8sTUFBTSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxhQUFhLENBQUMsQ0FBQTtJQUM5RixDQUFDO0lBRUQsOERBQThEO0lBQ3BELFVBQVUsQ0FBQyxhQUF1QjtRQUMzQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7UUFFM0MsOERBQThEO1FBQzlELE9BQU8sQ0FBQyxHQUFHLFVBQWlCLEVBQU8sRUFBRTtZQUNwQyxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUUsY0FBYyxFQUFFLEdBQUcsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFBO1lBRXZFLE1BQU0seUJBQXlCLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FDbkQsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUM1QixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUE7Z0JBQ3RCLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO29CQUM1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO3dCQUNuQyxlQUFlLEVBQUUsVUFBVTt3QkFDM0IsNEVBQTRFO3dCQUM1RSxJQUFJLEVBQUUsR0FBRyxXQUFXLElBQUksTUFBTSxFQUFFO3dCQUNoQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUs7cUJBQzVCLENBQUMsQ0FBQTtvQkFDRixNQUFNLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ3BDLENBQUM7Z0JBRUQsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtZQUN4QixDQUFDLENBQUMsQ0FDRixDQUFBO1lBRUQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLHVCQUF1QixDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsY0FBZSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDM0csTUFBTSw2QkFBNkIsR0FBRyxrQkFBa0IsQ0FBQyx5QkFBeUIsRUFBRSxDQUFBO1lBRXBGLE1BQU0sdUJBQXVCLEdBQUcsNkJBQTZCLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQTtZQUU1RSxPQUFPLEVBQUUsR0FBRyx5QkFBeUIsRUFBRSxHQUFHLHVCQUF1QixFQUFFLENBQUE7UUFDcEUsQ0FBQyxDQUFBO0lBQ0YsQ0FBQztJQUVELDhEQUE4RDtJQUNwRCxhQUFhLENBQUMsTUFBdUU7UUFDOUYsTUFBTSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQy9DLE1BQU0sZUFBZSxHQUFHLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUUxRixPQUFPLGVBQWUsQ0FBQyx5QkFBeUIsRUFBRSxDQUFBO0lBQ25ELENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHZpIH0gZnJvbSAndml0ZXN0J1xuXG5pbXBvcnQgeyBTcGVjaWFsRm5OYW1lIH0gZnJvbSAnI3NyYy9lbnVtL3NwZWNpYWwtZm4tbmFtZSdcbmltcG9ydCB7IEplc3RTcHlGdW5jdGlvblN0cmF0ZWd5IH0gZnJvbSAnI3NyYy9qZXN0LXNweS9qZXN0LXNweS1mdW5jdGlvbi1zdHJhdGVneSdcbmltcG9ydCB7IGplc3RTcHlTZXJ2aWNlIH0gZnJvbSAnI3NyYy9qZXN0LXNweS9qZXN0LXNweS1zZXJ2aWNlJ1xuaW1wb3J0IHsgdHlwZSBNb2NrZXJTdHJhdGVneSB9IGZyb20gJyNzcmMvbW9ja2VyL21vY2tlci1zdHJhdGVneSdcbmltcG9ydCB7IHR5cGUgQW55Q29udHJhY3QsIHR5cGUgQ29udHJhY3RUZXJtIH0gZnJvbSAnI3NyYy90eXBlcy9pbmRleCdcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmV4cG9ydCBjbGFzcyBNb2NrZXJKZXN0Q2xhc3NTdHJhdGVneSBpbXBsZW1lbnRzIE1vY2tlclN0cmF0ZWd5PHZpLlNwaWVkPGFueT4+IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0cHJvdGVjdGVkIF9zcHk/OiB2aS5TcGllZDxhbnk+XG5cblx0Y29uc3RydWN0b3IocHJvdGVjdGVkIF9jb250cmFjdDogQW55Q29udHJhY3QpIHt9XG5cblx0bW9ja1Jlc3RvcmUoKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX3NweSkge1xuXHRcdFx0dGhpcy5fc3B5Lm1vY2tSZXN0b3JlKClcblx0XHR9XG5cdH1cblxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRjb250cmFjdFNweSgpOiB2aS5TcGllZDxhbnk+IHtcblx0XHRjb25zdCB7IG1vZHVsZSwgc3ViamVjdE5hbWUgfSA9IHRoaXMuX2NvbnRyYWN0XG5cdFx0Y29uc3QgZnVuY3Rpb25OYW1lcyA9IHRoaXMuX2Z1bmN0aW9uTmFtZXMobW9kdWxlW3N1YmplY3ROYW1lXSlcblx0XHR0aGlzLl9zcHkgPSB2aS5zcHlPbihtb2R1bGUsIHN1YmplY3ROYW1lKVxuXHRcdHRoaXMuX3NweS5tb2NrSW1wbGVtZW50YXRpb24odGhpcy5fbW9ja0NsYXNzKGZ1bmN0aW9uTmFtZXMpKVxuXG5cdFx0cmV0dXJuIHRoaXMuX3NweVxuXHR9XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0cHJvdGVjdGVkIF9mdW5jdGlvbk5hbWVzKGNsYXNzT2JqZWN0OiBhbnkpOiBzdHJpbmdbXSB7XG5cdFx0cmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGNsYXNzT2JqZWN0LnByb3RvdHlwZSkuZmlsdGVyKChmbikgPT4gZm4gIT09ICdjb25zdHJ1Y3RvcicpXG5cdH1cblxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRwcm90ZWN0ZWQgX21vY2tDbGFzcyhmdW5jdGlvbk5hbWVzOiBzdHJpbmdbXSk6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55IHtcblx0XHRjb25zdCB7IGZucywgc3ViamVjdE5hbWUgfSA9IHRoaXMuX2NvbnRyYWN0XG5cblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRcdHJldHVybiAoLi4ubW9ja1BhcmFtczogYW55W10pOiBhbnkgPT4ge1xuXHRcdFx0Y29uc3QgeyBbU3BlY2lhbEZuTmFtZS5DT05TVFJVQ1RPUl06IGNvbnN0cnVjdG9yRm5zLCAuLi5yZXN0Rm5zIH0gPSBmbnNcblxuXHRcdFx0Y29uc3Qgb2JqZWN0V2l0aE1vY2tlZEZ1bmN0aW9ucyA9IE9iamVjdC5mcm9tRW50cmllcyhcblx0XHRcdFx0ZnVuY3Rpb25OYW1lcy5tYXAoKGZuTmFtZSkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IG1vY2tGbiA9IHZpLmZuKClcblx0XHRcdFx0XHRpZiAocmVzdEZuc1tmbk5hbWVdPy50ZXJtcykge1xuXHRcdFx0XHRcdFx0Y29uc3QgbW9ja0ltcGwgPSB0aGlzLl9tb2NrRnVuY3Rpb24oe1xuXHRcdFx0XHRcdFx0XHRtb2NrQ2xhc3NQYXJhbXM6IG1vY2tQYXJhbXMsXG5cdFx0XHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvcmVzdHJpY3QtdGVtcGxhdGUtZXhwcmVzc2lvbnNcblx0XHRcdFx0XHRcdFx0bmFtZTogYCR7c3ViamVjdE5hbWV9LiR7Zm5OYW1lfWAsXG5cdFx0XHRcdFx0XHRcdHRlcm1zOiByZXN0Rm5zW2ZuTmFtZV0udGVybXMsXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0bW9ja0ZuLm1vY2tJbXBsZW1lbnRhdGlvbihtb2NrSW1wbClcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gW2ZuTmFtZSwgbW9ja0ZuXVxuXHRcdFx0XHR9KVxuXHRcdFx0KVxuXG5cdFx0XHRjb25zdCBjb25zdHJ1Y3Rvckplc3RTcHkgPSBuZXcgSmVzdFNweUZ1bmN0aW9uU3RyYXRlZ3koeyBuYW1lOiBzdWJqZWN0TmFtZSwgdGVybXM6IGNvbnN0cnVjdG9yRm5zIS50ZXJtcyB9KVxuXHRcdFx0Y29uc3QgY29uc3RydWN0b3JNb2NrSW1wbGVtZW50YXRpb24gPSBjb25zdHJ1Y3Rvckplc3RTcHkubW9ja0ltcGxlbWVudGF0aW9uRmFjdG9yeSgpXG5cblx0XHRcdGNvbnN0IGNvbnN0cnVjdG9yUmVzdWx0T2JqZWN0ID0gY29uc3RydWN0b3JNb2NrSW1wbGVtZW50YXRpb24oLi4ubW9ja1BhcmFtcylcblxuXHRcdFx0cmV0dXJuIHsgLi4ub2JqZWN0V2l0aE1vY2tlZEZ1bmN0aW9ucywgLi4uY29uc3RydWN0b3JSZXN1bHRPYmplY3QgfVxuXHRcdH1cblx0fVxuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5cdHByb3RlY3RlZCBfbW9ja0Z1bmN0aW9uKHBhcmFtczogeyB0ZXJtczogQ29udHJhY3RUZXJtW107IG1vY2tDbGFzc1BhcmFtczogYW55W107IG5hbWU6IHN0cmluZyB9KTogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkge1xuXHRcdGNvbnN0IHsgdGVybXMsIG1vY2tDbGFzc1BhcmFtcywgbmFtZSB9ID0gcGFyYW1zXG5cdFx0Y29uc3QgamVzdFNweVN0cmF0ZWd5ID0gamVzdFNweVNlcnZpY2Uuc3RyYXRlZ3lGcm9tVGVybXMoeyBtb2NrQ2xhc3NQYXJhbXMsIG5hbWUsIHRlcm1zIH0pXG5cblx0XHRyZXR1cm4gamVzdFNweVN0cmF0ZWd5Lm1vY2tJbXBsZW1lbnRhdGlvbkZhY3RvcnkoKVxuXHR9XG59XG4iXX0=