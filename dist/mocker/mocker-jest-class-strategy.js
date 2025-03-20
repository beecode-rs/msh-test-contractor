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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja2VyLWplc3QtY2xhc3Mtc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9ja2VyL21vY2tlci1qZXN0LWNsYXNzLXN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFM0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBQ3pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFBO0FBQ2xGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQTtBQUkvRCw4REFBOEQ7QUFDOUQsTUFBTSxPQUFPLHVCQUF1QjtJQUliO0lBSHRCLDhEQUE4RDtJQUNwRCxJQUFJLENBQWdCO0lBRTlCLFlBQXNCLFNBQXNCO1FBQXRCLGNBQVMsR0FBVCxTQUFTLENBQWE7SUFBRyxDQUFDO0lBRWhELFdBQVc7UUFDVixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDeEIsQ0FBQztJQUNGLENBQUM7SUFFRCw4REFBOEQ7SUFDOUQsV0FBVztRQUNWLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQTtRQUM5QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO1FBQzlELElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUE7UUFFNUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO0lBQ2pCLENBQUM7SUFFRCw4REFBOEQ7SUFDcEQsY0FBYyxDQUFDLFdBQWdCO1FBQ3hDLE9BQU8sTUFBTSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxhQUFhLENBQUMsQ0FBQTtJQUM5RixDQUFDO0lBRUQsOERBQThEO0lBQ3BELFVBQVUsQ0FBQyxhQUF1QjtRQUMzQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7UUFFM0MsOERBQThEO1FBQzlELE9BQU8sQ0FBQyxHQUFHLFVBQWlCLEVBQU8sRUFBRTtZQUNwQyxNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUUsY0FBYyxFQUFFLEdBQUcsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFBO1lBRXZFLE1BQU0seUJBQXlCLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FDbkQsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUM1QixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUE7Z0JBQ3RCLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO29CQUM1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO3dCQUNuQyxlQUFlLEVBQUUsVUFBVTt3QkFDM0IsSUFBSSxFQUFFLEdBQUcsV0FBVyxJQUFJLE1BQU0sRUFBRTt3QkFDaEMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLO3FCQUM1QixDQUFDLENBQUE7b0JBQ0YsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUNwQyxDQUFDO2dCQUVELE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDeEIsQ0FBQyxDQUFDLENBQ0YsQ0FBQTtZQUVELE1BQU0sa0JBQWtCLEdBQUcsSUFBSSx1QkFBdUIsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLGNBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQzNHLE1BQU0sNkJBQTZCLEdBQUcsa0JBQWtCLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtZQUVwRixNQUFNLHVCQUF1QixHQUFHLDZCQUE2QixDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUE7WUFFNUUsT0FBTyxFQUFFLEdBQUcseUJBQXlCLEVBQUUsR0FBRyx1QkFBdUIsRUFBRSxDQUFBO1FBQ3BFLENBQUMsQ0FBQTtJQUNGLENBQUM7SUFFRCw4REFBOEQ7SUFDcEQsYUFBYSxDQUFDLE1BQXVFO1FBQzlGLE1BQU0sRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUMvQyxNQUFNLGVBQWUsR0FBRyxjQUFjLENBQUMsaUJBQWlCLENBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFFMUYsT0FBTyxlQUFlLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtJQUNuRCxDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2aSB9IGZyb20gJ3ZpdGVzdCdcblxuaW1wb3J0IHsgU3BlY2lhbEZuTmFtZSB9IGZyb20gJyNzcmMvZW51bS9zcGVjaWFsLWZuLW5hbWUnXG5pbXBvcnQgeyBKZXN0U3B5RnVuY3Rpb25TdHJhdGVneSB9IGZyb20gJyNzcmMvamVzdC1zcHkvamVzdC1zcHktZnVuY3Rpb24tc3RyYXRlZ3knXG5pbXBvcnQgeyBqZXN0U3B5U2VydmljZSB9IGZyb20gJyNzcmMvamVzdC1zcHkvamVzdC1zcHktc2VydmljZSdcbmltcG9ydCB7IHR5cGUgTW9ja2VyU3RyYXRlZ3kgfSBmcm9tICcjc3JjL21vY2tlci9tb2NrZXItc3RyYXRlZ3knXG5pbXBvcnQgeyB0eXBlIEFueUNvbnRyYWN0LCB0eXBlIENvbnRyYWN0VGVybSB9IGZyb20gJyNzcmMvdHlwZXMvaW5kZXgnXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5leHBvcnQgY2xhc3MgTW9ja2VySmVzdENsYXNzU3RyYXRlZ3kgaW1wbGVtZW50cyBNb2NrZXJTdHJhdGVneTx2aS5TcGllZDxhbnk+PiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5cdHByb3RlY3RlZCBfc3B5PzogdmkuU3BpZWQ8YW55PlxuXG5cdGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfY29udHJhY3Q6IEFueUNvbnRyYWN0KSB7fVxuXG5cdG1vY2tSZXN0b3JlKCk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9zcHkpIHtcblx0XHRcdHRoaXMuX3NweS5tb2NrUmVzdG9yZSgpXG5cdFx0fVxuXHR9XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0Y29udHJhY3RTcHkoKTogdmkuU3BpZWQ8YW55PiB7XG5cdFx0Y29uc3QgeyBtb2R1bGUsIHN1YmplY3ROYW1lIH0gPSB0aGlzLl9jb250cmFjdFxuXHRcdGNvbnN0IGZ1bmN0aW9uTmFtZXMgPSB0aGlzLl9mdW5jdGlvbk5hbWVzKG1vZHVsZVtzdWJqZWN0TmFtZV0pXG5cdFx0dGhpcy5fc3B5ID0gdmkuc3B5T24obW9kdWxlLCBzdWJqZWN0TmFtZSlcblx0XHR0aGlzLl9zcHkubW9ja0ltcGxlbWVudGF0aW9uKHRoaXMuX21vY2tDbGFzcyhmdW5jdGlvbk5hbWVzKSlcblxuXHRcdHJldHVybiB0aGlzLl9zcHlcblx0fVxuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5cdHByb3RlY3RlZCBfZnVuY3Rpb25OYW1lcyhjbGFzc09iamVjdDogYW55KTogc3RyaW5nW10ge1xuXHRcdHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjbGFzc09iamVjdC5wcm90b3R5cGUpLmZpbHRlcigoZm4pID0+IGZuICE9PSAnY29uc3RydWN0b3InKVxuXHR9XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0cHJvdGVjdGVkIF9tb2NrQ2xhc3MoZnVuY3Rpb25OYW1lczogc3RyaW5nW10pOiAoLi4uYXJnczogYW55W10pID0+IGFueSB7XG5cdFx0Y29uc3QgeyBmbnMsIHN1YmplY3ROYW1lIH0gPSB0aGlzLl9jb250cmFjdFxuXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0XHRyZXR1cm4gKC4uLm1vY2tQYXJhbXM6IGFueVtdKTogYW55ID0+IHtcblx0XHRcdGNvbnN0IHsgW1NwZWNpYWxGbk5hbWUuQ09OU1RSVUNUT1JdOiBjb25zdHJ1Y3RvckZucywgLi4ucmVzdEZucyB9ID0gZm5zXG5cblx0XHRcdGNvbnN0IG9iamVjdFdpdGhNb2NrZWRGdW5jdGlvbnMgPSBPYmplY3QuZnJvbUVudHJpZXMoXG5cdFx0XHRcdGZ1bmN0aW9uTmFtZXMubWFwKChmbk5hbWUpID0+IHtcblx0XHRcdFx0XHRjb25zdCBtb2NrRm4gPSB2aS5mbigpXG5cdFx0XHRcdFx0aWYgKHJlc3RGbnNbZm5OYW1lXT8udGVybXMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1vY2tJbXBsID0gdGhpcy5fbW9ja0Z1bmN0aW9uKHtcblx0XHRcdFx0XHRcdFx0bW9ja0NsYXNzUGFyYW1zOiBtb2NrUGFyYW1zLFxuXHRcdFx0XHRcdFx0XHRuYW1lOiBgJHtzdWJqZWN0TmFtZX0uJHtmbk5hbWV9YCxcblx0XHRcdFx0XHRcdFx0dGVybXM6IHJlc3RGbnNbZm5OYW1lXS50ZXJtcyxcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRtb2NrRm4ubW9ja0ltcGxlbWVudGF0aW9uKG1vY2tJbXBsKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBbZm5OYW1lLCBtb2NrRm5dXG5cdFx0XHRcdH0pXG5cdFx0XHQpXG5cblx0XHRcdGNvbnN0IGNvbnN0cnVjdG9ySmVzdFNweSA9IG5ldyBKZXN0U3B5RnVuY3Rpb25TdHJhdGVneSh7IG5hbWU6IHN1YmplY3ROYW1lLCB0ZXJtczogY29uc3RydWN0b3JGbnMhLnRlcm1zIH0pXG5cdFx0XHRjb25zdCBjb25zdHJ1Y3Rvck1vY2tJbXBsZW1lbnRhdGlvbiA9IGNvbnN0cnVjdG9ySmVzdFNweS5tb2NrSW1wbGVtZW50YXRpb25GYWN0b3J5KClcblxuXHRcdFx0Y29uc3QgY29uc3RydWN0b3JSZXN1bHRPYmplY3QgPSBjb25zdHJ1Y3Rvck1vY2tJbXBsZW1lbnRhdGlvbiguLi5tb2NrUGFyYW1zKVxuXG5cdFx0XHRyZXR1cm4geyAuLi5vYmplY3RXaXRoTW9ja2VkRnVuY3Rpb25zLCAuLi5jb25zdHJ1Y3RvclJlc3VsdE9iamVjdCB9XG5cdFx0fVxuXHR9XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0cHJvdGVjdGVkIF9tb2NrRnVuY3Rpb24ocGFyYW1zOiB7IHRlcm1zOiBDb250cmFjdFRlcm1bXTsgbW9ja0NsYXNzUGFyYW1zOiBhbnlbXTsgbmFtZTogc3RyaW5nIH0pOiAoLi4uYXJnczogYW55W10pID0+IGFueSB7XG5cdFx0Y29uc3QgeyB0ZXJtcywgbW9ja0NsYXNzUGFyYW1zLCBuYW1lIH0gPSBwYXJhbXNcblx0XHRjb25zdCBqZXN0U3B5U3RyYXRlZ3kgPSBqZXN0U3B5U2VydmljZS5zdHJhdGVneUZyb21UZXJtcyh7IG1vY2tDbGFzc1BhcmFtcywgbmFtZSwgdGVybXMgfSlcblxuXHRcdHJldHVybiBqZXN0U3B5U3RyYXRlZ3kubW9ja0ltcGxlbWVudGF0aW9uRmFjdG9yeSgpXG5cdH1cbn1cbiJdfQ==