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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja2VyLXZpdGVzdC1jbGFzcy1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2NrZXIvbW9ja2VyLXZpdGVzdC1jbGFzcy1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXFCLEVBQUUsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUU5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUE7QUFHekQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sOENBQThDLENBQUE7QUFDeEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUE7QUFFckUsOERBQThEO0FBQzlELE1BQU0sT0FBTyx5QkFBeUI7SUFJZjtJQUh0Qiw4REFBOEQ7SUFDcEQsSUFBSSxDQUFvQjtJQUVsQyxZQUFzQixTQUFzQjtRQUF0QixjQUFTLEdBQVQsU0FBUyxDQUFhO0lBQUcsQ0FBQztJQUVoRCxXQUFXO1FBQ1YsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ3hCLENBQUM7SUFDRixDQUFDO0lBRUQsOERBQThEO0lBQzlELFdBQVc7UUFDVixNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7UUFDOUMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtRQUM5RCxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFBO1FBRTVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQTtJQUNqQixDQUFDO0lBRUQsOERBQThEO0lBQ3BELGNBQWMsQ0FBQyxXQUFnQjtRQUN4QyxPQUFPLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssYUFBYSxDQUFDLENBQUE7SUFDOUYsQ0FBQztJQUVELDhEQUE4RDtJQUNwRCxVQUFVLENBQUMsYUFBdUI7UUFDM0MsTUFBTSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFBO1FBRTNDLDhEQUE4RDtRQUM5RCxPQUFPLENBQUMsR0FBRyxVQUFpQixFQUFPLEVBQUU7WUFDcEMsTUFBTSxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFLGNBQWMsRUFBRSxHQUFHLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQTtZQUV2RSxNQUFNLHlCQUF5QixHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQ25ELGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDNUIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFBO2dCQUN0QixJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztvQkFDNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQzt3QkFDbkMsZUFBZSxFQUFFLFVBQVU7d0JBQzNCLDRFQUE0RTt3QkFDNUUsSUFBSSxFQUFFLEdBQUcsV0FBVyxJQUFJLE1BQU0sRUFBRTt3QkFDaEMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLO3FCQUM1QixDQUFDLENBQUE7b0JBQ0YsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUNwQyxDQUFDO2dCQUVELE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDeEIsQ0FBQyxDQUFDLENBQ0YsQ0FBQTtZQUVELE1BQU0sb0JBQW9CLEdBQUcsSUFBSSx5QkFBeUIsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLGNBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQy9HLE1BQU0sNkJBQTZCLEdBQUcsb0JBQW9CLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtZQUV0RixNQUFNLHVCQUF1QixHQUFHLDZCQUE2QixDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUE7WUFFNUUsT0FBTyxFQUFFLEdBQUcseUJBQXlCLEVBQUUsR0FBRyx1QkFBdUIsRUFBRSxDQUFBO1FBQ3BFLENBQUMsQ0FBQTtJQUNGLENBQUM7SUFFRCw4REFBOEQ7SUFDcEQsYUFBYSxDQUFDLE1BQXVFO1FBQzlGLE1BQU0sRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUMvQyxNQUFNLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBRTlGLE9BQU8saUJBQWlCLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtJQUNyRCxDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0eXBlIE1vY2tJbnN0YW5jZSwgdmkgfSBmcm9tICd2aXRlc3QnXG5cbmltcG9ydCB7IFNwZWNpYWxGbk5hbWUgfSBmcm9tICcjc3JjL2VudW0vc3BlY2lhbC1mbi1uYW1lJ1xuaW1wb3J0IHsgdHlwZSBNb2NrZXJTdHJhdGVneSB9IGZyb20gJyNzcmMvbW9ja2VyL21vY2tlci1zdHJhdGVneSdcbmltcG9ydCB7IHR5cGUgQW55Q29udHJhY3QsIHR5cGUgQ29udHJhY3RUZXJtIH0gZnJvbSAnI3NyYy90eXBlcy9pbmRleCdcbmltcG9ydCB7IFZpdGVzdFNweUZ1bmN0aW9uU3RyYXRlZ3kgfSBmcm9tICcjc3JjL3ZpdGVzdC1zcHkvdml0ZXN0LXNweS1mdW5jdGlvbi1zdHJhdGVneSdcbmltcG9ydCB7IHZpdGVzdFNweVNlcnZpY2UgfSBmcm9tICcjc3JjL3ZpdGVzdC1zcHkvdml0ZXN0LXNweS1zZXJ2aWNlJ1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZXhwb3J0IGNsYXNzIE1vY2tlclZpdGVzdENsYXNzU3RyYXRlZ3kgaW1wbGVtZW50cyBNb2NrZXJTdHJhdGVneTxNb2NrSW5zdGFuY2U8YW55Pj4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRwcm90ZWN0ZWQgX3NweT86IE1vY2tJbnN0YW5jZTxhbnk+XG5cblx0Y29uc3RydWN0b3IocHJvdGVjdGVkIF9jb250cmFjdDogQW55Q29udHJhY3QpIHt9XG5cblx0bW9ja1Jlc3RvcmUoKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX3NweSkge1xuXHRcdFx0dGhpcy5fc3B5Lm1vY2tSZXN0b3JlKClcblx0XHR9XG5cdH1cblxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRjb250cmFjdFNweSgpOiBNb2NrSW5zdGFuY2U8YW55PiB7XG5cdFx0Y29uc3QgeyBtb2R1bGUsIHN1YmplY3ROYW1lIH0gPSB0aGlzLl9jb250cmFjdFxuXHRcdGNvbnN0IGZ1bmN0aW9uTmFtZXMgPSB0aGlzLl9mdW5jdGlvbk5hbWVzKG1vZHVsZVtzdWJqZWN0TmFtZV0pXG5cdFx0dGhpcy5fc3B5ID0gdmkuc3B5T24obW9kdWxlLCBzdWJqZWN0TmFtZSlcblx0XHR0aGlzLl9zcHkubW9ja0ltcGxlbWVudGF0aW9uKHRoaXMuX21vY2tDbGFzcyhmdW5jdGlvbk5hbWVzKSlcblxuXHRcdHJldHVybiB0aGlzLl9zcHlcblx0fVxuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5cdHByb3RlY3RlZCBfZnVuY3Rpb25OYW1lcyhjbGFzc09iamVjdDogYW55KTogc3RyaW5nW10ge1xuXHRcdHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjbGFzc09iamVjdC5wcm90b3R5cGUpLmZpbHRlcigoZm4pID0+IGZuICE9PSAnY29uc3RydWN0b3InKVxuXHR9XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0cHJvdGVjdGVkIF9tb2NrQ2xhc3MoZnVuY3Rpb25OYW1lczogc3RyaW5nW10pOiAoLi4uYXJnczogYW55W10pID0+IGFueSB7XG5cdFx0Y29uc3QgeyBmbnMsIHN1YmplY3ROYW1lIH0gPSB0aGlzLl9jb250cmFjdFxuXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0XHRyZXR1cm4gKC4uLm1vY2tQYXJhbXM6IGFueVtdKTogYW55ID0+IHtcblx0XHRcdGNvbnN0IHsgW1NwZWNpYWxGbk5hbWUuQ09OU1RSVUNUT1JdOiBjb25zdHJ1Y3RvckZucywgLi4ucmVzdEZucyB9ID0gZm5zXG5cblx0XHRcdGNvbnN0IG9iamVjdFdpdGhNb2NrZWRGdW5jdGlvbnMgPSBPYmplY3QuZnJvbUVudHJpZXMoXG5cdFx0XHRcdGZ1bmN0aW9uTmFtZXMubWFwKChmbk5hbWUpID0+IHtcblx0XHRcdFx0XHRjb25zdCBtb2NrRm4gPSB2aS5mbigpXG5cdFx0XHRcdFx0aWYgKHJlc3RGbnNbZm5OYW1lXT8udGVybXMpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG1vY2tJbXBsID0gdGhpcy5fbW9ja0Z1bmN0aW9uKHtcblx0XHRcdFx0XHRcdFx0bW9ja0NsYXNzUGFyYW1zOiBtb2NrUGFyYW1zLFxuXHRcdFx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3Jlc3RyaWN0LXRlbXBsYXRlLWV4cHJlc3Npb25zXG5cdFx0XHRcdFx0XHRcdG5hbWU6IGAke3N1YmplY3ROYW1lfS4ke2ZuTmFtZX1gLFxuXHRcdFx0XHRcdFx0XHR0ZXJtczogcmVzdEZuc1tmbk5hbWVdLnRlcm1zLFxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdG1vY2tGbi5tb2NrSW1wbGVtZW50YXRpb24obW9ja0ltcGwpXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIFtmbk5hbWUsIG1vY2tGbl1cblx0XHRcdFx0fSlcblx0XHRcdClcblxuXHRcdFx0Y29uc3QgY29uc3RydWN0b3JWaXRlc3RTcHkgPSBuZXcgVml0ZXN0U3B5RnVuY3Rpb25TdHJhdGVneSh7IG5hbWU6IHN1YmplY3ROYW1lLCB0ZXJtczogY29uc3RydWN0b3JGbnMhLnRlcm1zIH0pXG5cdFx0XHRjb25zdCBjb25zdHJ1Y3Rvck1vY2tJbXBsZW1lbnRhdGlvbiA9IGNvbnN0cnVjdG9yVml0ZXN0U3B5Lm1vY2tJbXBsZW1lbnRhdGlvbkZhY3RvcnkoKVxuXG5cdFx0XHRjb25zdCBjb25zdHJ1Y3RvclJlc3VsdE9iamVjdCA9IGNvbnN0cnVjdG9yTW9ja0ltcGxlbWVudGF0aW9uKC4uLm1vY2tQYXJhbXMpXG5cblx0XHRcdHJldHVybiB7IC4uLm9iamVjdFdpdGhNb2NrZWRGdW5jdGlvbnMsIC4uLmNvbnN0cnVjdG9yUmVzdWx0T2JqZWN0IH1cblx0XHR9XG5cdH1cblxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRwcm90ZWN0ZWQgX21vY2tGdW5jdGlvbihwYXJhbXM6IHsgdGVybXM6IENvbnRyYWN0VGVybVtdOyBtb2NrQ2xhc3NQYXJhbXM6IGFueVtdOyBuYW1lOiBzdHJpbmcgfSk6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55IHtcblx0XHRjb25zdCB7IHRlcm1zLCBtb2NrQ2xhc3NQYXJhbXMsIG5hbWUgfSA9IHBhcmFtc1xuXHRcdGNvbnN0IHZpdGVzdFNweVN0cmF0ZWd5ID0gdml0ZXN0U3B5U2VydmljZS5zdHJhdGVneUZyb21UZXJtcyh7IG1vY2tDbGFzc1BhcmFtcywgbmFtZSwgdGVybXMgfSlcblxuXHRcdHJldHVybiB2aXRlc3RTcHlTdHJhdGVneS5tb2NrSW1wbGVtZW50YXRpb25GYWN0b3J5KClcblx0fVxufVxuIl19