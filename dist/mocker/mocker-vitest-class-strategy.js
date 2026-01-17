import { vi } from 'vitest';
import { SpecialFnName } from '#src/enum/special-fn-name';
import { VitestSpyFunctionStrategy } from '#src/vitest-spy/vitest-spy-function-strategy';
import { vitestSpyService } from '#src/vitest-spy/vitest-spy-service';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class MockerVitestClassStrategy {
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
            const constructorVitestSpy = new VitestSpyFunctionStrategy({ name: subjectName, terms: constructorFns.terms });
            const constructorMockImplementation = constructorVitestSpy.mockImplementationFactory();
            const constructorResultObject = constructorMockImplementation(...mockParams);
            return { ...objectWithMockedFunctions, ...constructorResultObject };
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _mockFunction(params) {
        const { terms, mockClassParams, name } = params;
        const vitestSpyStrategy = vitestSpyService.strategyFromTerms({ mockClassParams, name, terms });
        return vitestSpyStrategy.mockImplementationFactory();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja2VyLXZpdGVzdC1jbGFzcy1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2NrZXIvbW9ja2VyLXZpdGVzdC1jbGFzcy1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBRTNCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQTtBQUN6RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQTtBQUN4RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQTtBQUlyRSw4REFBOEQ7QUFDOUQsTUFBTSxPQUFPLHlCQUF5QjtJQUlmO0lBSHRCLDhEQUE4RDtJQUNwRCxJQUFJLENBQWdCO0lBRTlCLFlBQXNCLFNBQXNCO1FBQXRCLGNBQVMsR0FBVCxTQUFTLENBQWE7SUFBRyxDQUFDO0lBRWhELFdBQVc7UUFDVixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDeEIsQ0FBQztJQUNGLENBQUM7SUFFRCw4REFBOEQ7SUFDOUQsV0FBVztRQUNWLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQTtRQUM5QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO1FBQzlELElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7UUFFNUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO0lBQ2pCLENBQUM7SUFFRCw4REFBOEQ7SUFDcEQsY0FBYyxDQUFDLFdBQWdCO1FBQ3hDLE9BQU8sTUFBTSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxhQUFhLENBQUMsQ0FBQTtJQUM5RixDQUFDO0lBRUQsOERBQThEO0lBQ3BELFVBQVUsQ0FBQyxhQUF1QjtRQUMzQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7UUFFM0MsOERBQThEO1FBQzlELE9BQU8sQ0FBQyxHQUFHLFVBQWlCLEVBQU8sRUFBRTtZQUNwQyxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUUsY0FBYyxFQUFFLEdBQUcsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFBO1lBRXZFLE1BQU0seUJBQXlCLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FDbkQsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUM1QixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUE7Z0JBQ3RCLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO29CQUM1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO3dCQUNuQyxlQUFlLEVBQUUsVUFBVTt3QkFDM0IsNEVBQTRFO3dCQUM1RSxJQUFJLEVBQUUsR0FBRyxXQUFXLElBQUksTUFBTSxFQUFFO3dCQUNoQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUs7cUJBQzVCLENBQUMsQ0FBQTtvQkFDRixNQUFNLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ3BDLENBQUM7Z0JBRUQsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtZQUN4QixDQUFDLENBQUMsQ0FDRixDQUFBO1lBRUQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLHlCQUF5QixDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsY0FBZSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDL0csTUFBTSw2QkFBNkIsR0FBRyxvQkFBb0IsQ0FBQyx5QkFBeUIsRUFBRSxDQUFBO1lBRXRGLE1BQU0sdUJBQXVCLEdBQUcsNkJBQTZCLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQTtZQUU1RSxPQUFPLEVBQUUsR0FBRyx5QkFBeUIsRUFBRSxHQUFHLHVCQUF1QixFQUFFLENBQUE7UUFDcEUsQ0FBQyxDQUFBO0lBQ0YsQ0FBQztJQUVELDhEQUE4RDtJQUNwRCxhQUFhLENBQUMsTUFBdUU7UUFDOUYsTUFBTSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQy9DLE1BQU0saUJBQWlCLEdBQUcsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFFOUYsT0FBTyxpQkFBaUIsQ0FBQyx5QkFBeUIsRUFBRSxDQUFBO0lBQ3JELENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHZpIH0gZnJvbSAndml0ZXN0J1xuXG5pbXBvcnQgeyBTcGVjaWFsRm5OYW1lIH0gZnJvbSAnI3NyYy9lbnVtL3NwZWNpYWwtZm4tbmFtZSdcbmltcG9ydCB7IFZpdGVzdFNweUZ1bmN0aW9uU3RyYXRlZ3kgfSBmcm9tICcjc3JjL3ZpdGVzdC1zcHkvdml0ZXN0LXNweS1mdW5jdGlvbi1zdHJhdGVneSdcbmltcG9ydCB7IHZpdGVzdFNweVNlcnZpY2UgfSBmcm9tICcjc3JjL3ZpdGVzdC1zcHkvdml0ZXN0LXNweS1zZXJ2aWNlJ1xuaW1wb3J0IHsgdHlwZSBNb2NrZXJTdHJhdGVneSB9IGZyb20gJyNzcmMvbW9ja2VyL21vY2tlci1zdHJhdGVneSdcbmltcG9ydCB7IHR5cGUgQW55Q29udHJhY3QsIHR5cGUgQ29udHJhY3RUZXJtIH0gZnJvbSAnI3NyYy90eXBlcy9pbmRleCdcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmV4cG9ydCBjbGFzcyBNb2NrZXJWaXRlc3RDbGFzc1N0cmF0ZWd5IGltcGxlbWVudHMgTW9ja2VyU3RyYXRlZ3k8dmkuU3BpZWQ8YW55Pj4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRwcm90ZWN0ZWQgX3NweT86IHZpLlNwaWVkPGFueT5cblxuXHRjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2NvbnRyYWN0OiBBbnlDb250cmFjdCkge31cblxuXHRtb2NrUmVzdG9yZSgpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fc3B5KSB7XG5cdFx0XHR0aGlzLl9zcHkubW9ja1Jlc3RvcmUoKVxuXHRcdH1cblx0fVxuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5cdGNvbnRyYWN0U3B5KCk6IHZpLlNwaWVkPGFueT4ge1xuXHRcdGNvbnN0IHsgbW9kdWxlLCBzdWJqZWN0TmFtZSB9ID0gdGhpcy5fY29udHJhY3Rcblx0XHRjb25zdCBmdW5jdGlvbk5hbWVzID0gdGhpcy5fZnVuY3Rpb25OYW1lcyhtb2R1bGVbc3ViamVjdE5hbWVdKVxuXHRcdHRoaXMuX3NweSA9IHZpLnNweU9uKG1vZHVsZSwgc3ViamVjdE5hbWUpXG5cdFx0dGhpcy5fc3B5Lm1vY2tJbXBsZW1lbnRhdGlvbih0aGlzLl9tb2NrQ2xhc3MoZnVuY3Rpb25OYW1lcykpXG5cblx0XHRyZXR1cm4gdGhpcy5fc3B5XG5cdH1cblxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRwcm90ZWN0ZWQgX2Z1bmN0aW9uTmFtZXMoY2xhc3NPYmplY3Q6IGFueSk6IHN0cmluZ1tdIHtcblx0XHRyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY2xhc3NPYmplY3QucHJvdG90eXBlKS5maWx0ZXIoKGZuKSA9PiBmbiAhPT0gJ2NvbnN0cnVjdG9yJylcblx0fVxuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5cdHByb3RlY3RlZCBfbW9ja0NsYXNzKGZ1bmN0aW9uTmFtZXM6IHN0cmluZ1tdKTogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkge1xuXHRcdGNvbnN0IHsgZm5zLCBzdWJqZWN0TmFtZSB9ID0gdGhpcy5fY29udHJhY3RcblxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5cdFx0cmV0dXJuICguLi5tb2NrUGFyYW1zOiBhbnlbXSk6IGFueSA9PiB7XG5cdFx0XHRjb25zdCB7IFtTcGVjaWFsRm5OYW1lLkNPTlNUUlVDVE9SXTogY29uc3RydWN0b3JGbnMsIC4uLnJlc3RGbnMgfSA9IGZuc1xuXG5cdFx0XHRjb25zdCBvYmplY3RXaXRoTW9ja2VkRnVuY3Rpb25zID0gT2JqZWN0LmZyb21FbnRyaWVzKFxuXHRcdFx0XHRmdW5jdGlvbk5hbWVzLm1hcCgoZm5OYW1lKSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgbW9ja0ZuID0gdmkuZm4oKVxuXHRcdFx0XHRcdGlmIChyZXN0Rm5zW2ZuTmFtZV0/LnRlcm1zKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtb2NrSW1wbCA9IHRoaXMuX21vY2tGdW5jdGlvbih7XG5cdFx0XHRcdFx0XHRcdG1vY2tDbGFzc1BhcmFtczogbW9ja1BhcmFtcyxcblx0XHRcdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9yZXN0cmljdC10ZW1wbGF0ZS1leHByZXNzaW9uc1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBgJHtzdWJqZWN0TmFtZX0uJHtmbk5hbWV9YCxcblx0XHRcdFx0XHRcdFx0dGVybXM6IHJlc3RGbnNbZm5OYW1lXS50ZXJtcyxcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRtb2NrRm4ubW9ja0ltcGxlbWVudGF0aW9uKG1vY2tJbXBsKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBbZm5OYW1lLCBtb2NrRm5dXG5cdFx0XHRcdH0pXG5cdFx0XHQpXG5cblx0XHRcdGNvbnN0IGNvbnN0cnVjdG9yVml0ZXN0U3B5ID0gbmV3IFZpdGVzdFNweUZ1bmN0aW9uU3RyYXRlZ3koeyBuYW1lOiBzdWJqZWN0TmFtZSwgdGVybXM6IGNvbnN0cnVjdG9yRm5zIS50ZXJtcyB9KVxuXHRcdFx0Y29uc3QgY29uc3RydWN0b3JNb2NrSW1wbGVtZW50YXRpb24gPSBjb25zdHJ1Y3RvclZpdGVzdFNweS5tb2NrSW1wbGVtZW50YXRpb25GYWN0b3J5KClcblxuXHRcdFx0Y29uc3QgY29uc3RydWN0b3JSZXN1bHRPYmplY3QgPSBjb25zdHJ1Y3Rvck1vY2tJbXBsZW1lbnRhdGlvbiguLi5tb2NrUGFyYW1zKVxuXG5cdFx0XHRyZXR1cm4geyAuLi5vYmplY3RXaXRoTW9ja2VkRnVuY3Rpb25zLCAuLi5jb25zdHJ1Y3RvclJlc3VsdE9iamVjdCB9XG5cdFx0fVxuXHR9XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0cHJvdGVjdGVkIF9tb2NrRnVuY3Rpb24ocGFyYW1zOiB7IHRlcm1zOiBDb250cmFjdFRlcm1bXTsgbW9ja0NsYXNzUGFyYW1zOiBhbnlbXTsgbmFtZTogc3RyaW5nIH0pOiAoLi4uYXJnczogYW55W10pID0+IGFueSB7XG5cdFx0Y29uc3QgeyB0ZXJtcywgbW9ja0NsYXNzUGFyYW1zLCBuYW1lIH0gPSBwYXJhbXNcblx0XHRjb25zdCB2aXRlc3RTcHlTdHJhdGVneSA9IHZpdGVzdFNweVNlcnZpY2Uuc3RyYXRlZ3lGcm9tVGVybXMoeyBtb2NrQ2xhc3NQYXJhbXMsIG5hbWUsIHRlcm1zIH0pXG5cblx0XHRyZXR1cm4gdml0ZXN0U3B5U3RyYXRlZ3kubW9ja0ltcGxlbWVudGF0aW9uRmFjdG9yeSgpXG5cdH1cbn1cbiJdfQ==