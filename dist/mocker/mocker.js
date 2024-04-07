import { jest } from '@jest/globals';
import { JestSpyFunctionStrategy } from '../jest-spy/jest-spy-function-strategy.js';
import { mockerService } from '../mocker/mocker-service.js';
import { fnUtil } from '../util/fn-util.js';
export const mocker = {
    contract: (contract) => {
        const mockerStrategy = mockerService.strategyFromContract(contract);
        const spy = mockerStrategy.contractSpy();
        const mockRestore = () => mockerStrategy.mockRestore();
        return { mockRestore, spy };
    },
    function: (contract, fnName) => {
        const { module, subjectName, fns } = contract;
        const { terms } = fns[fnName];
        const spy = fnUtil.isConstructor(fnName)
            ? jest.spyOn(module, subjectName)
            : terms[0]?.constructorParams // if function belongs to class mock prototype
                ? jest.spyOn(module[subjectName].prototype, fnName)
                : jest.spyOn(module[subjectName], fnName);
        if (!terms) {
            throw new Error(`Terms not found in function ${fnName} for module ${subjectName}`);
        }
        const jestSpyFunction = new JestSpyFunctionStrategy({ name: `${subjectName}.${fnName}`, terms });
        spy.mockImplementation(jestSpyFunction.mockImplementationFactory());
        const mockRestore = () => spy.mockRestore();
        return { mockRestore, spy };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vY2tlci9tb2NrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUVwQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQTtBQUNsRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFFMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBTzFDLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRztJQUNyQixRQUFRLEVBQUUsQ0FBcUQsUUFBVyxFQUE2QixFQUFFO1FBQ3hHLE1BQU0sY0FBYyxHQUFHLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNuRSxNQUFNLEdBQUcsR0FBRyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDeEMsTUFBTSxXQUFXLEdBQUcsR0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDNUIsQ0FBQztJQUNELFFBQVEsRUFBRSxDQUNULFFBQVcsRUFDWCxNQUFZLEVBQ1csRUFBRTtRQUN6QixNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUE7UUFDN0MsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQXNCLENBQUE7UUFFbEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQztZQUNqQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLDhDQUE4QztnQkFDM0UsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUUzQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixNQUFNLGVBQWUsV0FBVyxFQUFFLENBQUMsQ0FBQTtRQUNuRixDQUFDO1FBRUQsTUFBTSxlQUFlLEdBQUcsSUFBSSx1QkFBdUIsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLFdBQVcsSUFBSSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2hHLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxDQUFBO1FBRW5FLE1BQU0sV0FBVyxHQUFHLEdBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUVqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQzVCLENBQUM7Q0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgamVzdCB9IGZyb20gJ0BqZXN0L2dsb2JhbHMnXG5cbmltcG9ydCB7IEplc3RTcHlGdW5jdGlvblN0cmF0ZWd5IH0gZnJvbSAnI3NyYy9qZXN0LXNweS9qZXN0LXNweS1mdW5jdGlvbi1zdHJhdGVneSdcbmltcG9ydCB7IG1vY2tlclNlcnZpY2UgfSBmcm9tICcjc3JjL21vY2tlci9tb2NrZXItc2VydmljZSdcbmltcG9ydCB7IEFueUNvbnRyYWN0LCBDb250cmFjdEZ1bmN0aW9uLCBDb250cmFjdE1vY2tSZXZlcnRGbiwgUHJvcFR5cGUgfSBmcm9tICcjc3JjL3R5cGVzJ1xuaW1wb3J0IHsgZm5VdGlsIH0gZnJvbSAnI3NyYy91dGlsL2ZuLXV0aWwnXG5cbmV4cG9ydCB0eXBlIE1vY2tlckNvbnRyYWN0UmVzdWx0PFNQWSA9IGplc3QuU3BpZWQ8YW55Pj4gPSB7XG5cdHNweTogU1BZXG5cdG1vY2tSZXN0b3JlOiBDb250cmFjdE1vY2tSZXZlcnRGblxufVxuXG5leHBvcnQgY29uc3QgbW9ja2VyID0ge1xuXHRjb250cmFjdDogPFNQWSA9IGplc3QuU3BpZWQ8YW55PiwgQyBleHRlbmRzIEFueUNvbnRyYWN0ID0gYW55Pihjb250cmFjdDogQyk6IE1vY2tlckNvbnRyYWN0UmVzdWx0PFNQWT4gPT4ge1xuXHRcdGNvbnN0IG1vY2tlclN0cmF0ZWd5ID0gbW9ja2VyU2VydmljZS5zdHJhdGVneUZyb21Db250cmFjdChjb250cmFjdClcblx0XHRjb25zdCBzcHkgPSBtb2NrZXJTdHJhdGVneS5jb250cmFjdFNweSgpXG5cdFx0Y29uc3QgbW9ja1Jlc3RvcmUgPSAoKTogdm9pZCA9PiBtb2NrZXJTdHJhdGVneS5tb2NrUmVzdG9yZSgpXG5cblx0XHRyZXR1cm4geyBtb2NrUmVzdG9yZSwgc3B5IH1cblx0fSxcblx0ZnVuY3Rpb246IDxDIGV4dGVuZHMgQW55Q29udHJhY3QsIENGTksgZXh0ZW5kcyBFeHRyYWN0PGtleW9mIFByb3BUeXBlPEMsICdmbnMnPiwgc3RyaW5nPj4oXG5cdFx0Y29udHJhY3Q6IEMsXG5cdFx0Zm5OYW1lOiBDRk5LXG5cdCk6IE1vY2tlckNvbnRyYWN0UmVzdWx0ID0+IHtcblx0XHRjb25zdCB7IG1vZHVsZSwgc3ViamVjdE5hbWUsIGZucyB9ID0gY29udHJhY3Rcblx0XHRjb25zdCB7IHRlcm1zIH0gPSBmbnNbZm5OYW1lXSEgYXMgQ29udHJhY3RGdW5jdGlvblxuXG5cdFx0Y29uc3Qgc3B5ID0gZm5VdGlsLmlzQ29uc3RydWN0b3IoZm5OYW1lKVxuXHRcdFx0PyBqZXN0LnNweU9uKG1vZHVsZSwgc3ViamVjdE5hbWUpXG5cdFx0XHQ6IHRlcm1zWzBdPy5jb25zdHJ1Y3RvclBhcmFtcyAvLyBpZiBmdW5jdGlvbiBiZWxvbmdzIHRvIGNsYXNzIG1vY2sgcHJvdG90eXBlXG5cdFx0XHRcdD8gamVzdC5zcHlPbihtb2R1bGVbc3ViamVjdE5hbWVdLnByb3RvdHlwZSwgZm5OYW1lKVxuXHRcdFx0XHQ6IGplc3Quc3B5T24obW9kdWxlW3N1YmplY3ROYW1lXSwgZm5OYW1lKVxuXG5cdFx0aWYgKCF0ZXJtcykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBUZXJtcyBub3QgZm91bmQgaW4gZnVuY3Rpb24gJHtmbk5hbWV9IGZvciBtb2R1bGUgJHtzdWJqZWN0TmFtZX1gKVxuXHRcdH1cblxuXHRcdGNvbnN0IGplc3RTcHlGdW5jdGlvbiA9IG5ldyBKZXN0U3B5RnVuY3Rpb25TdHJhdGVneSh7IG5hbWU6IGAke3N1YmplY3ROYW1lfS4ke2ZuTmFtZX1gLCB0ZXJtcyB9KVxuXHRcdHNweS5tb2NrSW1wbGVtZW50YXRpb24oamVzdFNweUZ1bmN0aW9uLm1vY2tJbXBsZW1lbnRhdGlvbkZhY3RvcnkoKSlcblxuXHRcdGNvbnN0IG1vY2tSZXN0b3JlID0gKCk6IHZvaWQgPT4gc3B5Lm1vY2tSZXN0b3JlKClcblxuXHRcdHJldHVybiB7IG1vY2tSZXN0b3JlLCBzcHkgfVxuXHR9LFxufVxuIl19