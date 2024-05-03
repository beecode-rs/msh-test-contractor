import { vi } from 'vitest';
import { JestSpyFunctionStrategy } from '#src/jest-spy/jest-spy-function-strategy';
import { mockerService } from '#src/mocker/mocker-service';
import { fnUtil } from '#src/util/fn-util';
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
            ? vi.spyOn(module, subjectName)
            : terms[0]?.constructorParams // if function belongs to class mock prototype
                ? vi.spyOn(module[subjectName].prototype, fnName)
                : vi.spyOn(module[subjectName], fnName);
        if (!terms) {
            throw new Error(`Terms not found in function ${fnName} for module ${subjectName}`);
        }
        const jestSpyFunction = new JestSpyFunctionStrategy({ name: `${subjectName}.${fnName}`, terms });
        spy.mockImplementation(jestSpyFunction.mockImplementationFactory());
        const mockRestore = () => spy.mockRestore();
        return { mockRestore, spy };
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vY2tlci9tb2NrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUUzQixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQTtBQUNsRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUE7QUFFMUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG1CQUFtQixDQUFBO0FBTzFDLE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRztJQUNyQixRQUFRLEVBQUUsQ0FBbUQsUUFBVyxFQUE2QixFQUFFO1FBQ3RHLE1BQU0sY0FBYyxHQUFHLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNuRSxNQUFNLEdBQUcsR0FBRyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDeEMsTUFBTSxXQUFXLEdBQUcsR0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDNUIsQ0FBQztJQUNELFFBQVEsRUFBRSxDQUNULFFBQVcsRUFDWCxNQUFZLEVBQ1csRUFBRTtRQUN6QixNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUE7UUFDN0MsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQXNCLENBQUE7UUFFbEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFDdkMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQztZQUMvQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLDhDQUE4QztnQkFDM0UsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUM7Z0JBQ2pELENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUV6QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixNQUFNLGVBQWUsV0FBVyxFQUFFLENBQUMsQ0FBQTtRQUNuRixDQUFDO1FBRUQsTUFBTSxlQUFlLEdBQUcsSUFBSSx1QkFBdUIsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLFdBQVcsSUFBSSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2hHLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxDQUFBO1FBRW5FLE1BQU0sV0FBVyxHQUFHLEdBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUVqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQzVCLENBQUM7Q0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdmkgfSBmcm9tICd2aXRlc3QnXG5cbmltcG9ydCB7IEplc3RTcHlGdW5jdGlvblN0cmF0ZWd5IH0gZnJvbSAnI3NyYy9qZXN0LXNweS9qZXN0LXNweS1mdW5jdGlvbi1zdHJhdGVneSdcbmltcG9ydCB7IG1vY2tlclNlcnZpY2UgfSBmcm9tICcjc3JjL21vY2tlci9tb2NrZXItc2VydmljZSdcbmltcG9ydCB7IEFueUNvbnRyYWN0LCBDb250cmFjdEZ1bmN0aW9uLCBDb250cmFjdE1vY2tSZXZlcnRGbiwgUHJvcFR5cGUgfSBmcm9tICcjc3JjL3R5cGVzJ1xuaW1wb3J0IHsgZm5VdGlsIH0gZnJvbSAnI3NyYy91dGlsL2ZuLXV0aWwnXG5cbmV4cG9ydCB0eXBlIE1vY2tlckNvbnRyYWN0UmVzdWx0PFNQWSA9IHZpLlNwaWVkPGFueT4+ID0ge1xuXHRzcHk6IFNQWVxuXHRtb2NrUmVzdG9yZTogQ29udHJhY3RNb2NrUmV2ZXJ0Rm5cbn1cblxuZXhwb3J0IGNvbnN0IG1vY2tlciA9IHtcblx0Y29udHJhY3Q6IDxTUFkgPSB2aS5TcGllZDxhbnk+LCBDIGV4dGVuZHMgQW55Q29udHJhY3QgPSBhbnk+KGNvbnRyYWN0OiBDKTogTW9ja2VyQ29udHJhY3RSZXN1bHQ8U1BZPiA9PiB7XG5cdFx0Y29uc3QgbW9ja2VyU3RyYXRlZ3kgPSBtb2NrZXJTZXJ2aWNlLnN0cmF0ZWd5RnJvbUNvbnRyYWN0KGNvbnRyYWN0KVxuXHRcdGNvbnN0IHNweSA9IG1vY2tlclN0cmF0ZWd5LmNvbnRyYWN0U3B5KClcblx0XHRjb25zdCBtb2NrUmVzdG9yZSA9ICgpOiB2b2lkID0+IG1vY2tlclN0cmF0ZWd5Lm1vY2tSZXN0b3JlKClcblxuXHRcdHJldHVybiB7IG1vY2tSZXN0b3JlLCBzcHkgfVxuXHR9LFxuXHRmdW5jdGlvbjogPEMgZXh0ZW5kcyBBbnlDb250cmFjdCwgQ0ZOSyBleHRlbmRzIEV4dHJhY3Q8a2V5b2YgUHJvcFR5cGU8QywgJ2Zucyc+LCBzdHJpbmc+Pihcblx0XHRjb250cmFjdDogQyxcblx0XHRmbk5hbWU6IENGTktcblx0KTogTW9ja2VyQ29udHJhY3RSZXN1bHQgPT4ge1xuXHRcdGNvbnN0IHsgbW9kdWxlLCBzdWJqZWN0TmFtZSwgZm5zIH0gPSBjb250cmFjdFxuXHRcdGNvbnN0IHsgdGVybXMgfSA9IGZuc1tmbk5hbWVdISBhcyBDb250cmFjdEZ1bmN0aW9uXG5cblx0XHRjb25zdCBzcHkgPSBmblV0aWwuaXNDb25zdHJ1Y3Rvcihmbk5hbWUpXG5cdFx0XHQ/IHZpLnNweU9uKG1vZHVsZSwgc3ViamVjdE5hbWUpXG5cdFx0XHQ6IHRlcm1zWzBdPy5jb25zdHJ1Y3RvclBhcmFtcyAvLyBpZiBmdW5jdGlvbiBiZWxvbmdzIHRvIGNsYXNzIG1vY2sgcHJvdG90eXBlXG5cdFx0XHRcdD8gdmkuc3B5T24obW9kdWxlW3N1YmplY3ROYW1lXS5wcm90b3R5cGUsIGZuTmFtZSlcblx0XHRcdFx0OiB2aS5zcHlPbihtb2R1bGVbc3ViamVjdE5hbWVdLCBmbk5hbWUpXG5cblx0XHRpZiAoIXRlcm1zKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFRlcm1zIG5vdCBmb3VuZCBpbiBmdW5jdGlvbiAke2ZuTmFtZX0gZm9yIG1vZHVsZSAke3N1YmplY3ROYW1lfWApXG5cdFx0fVxuXG5cdFx0Y29uc3QgamVzdFNweUZ1bmN0aW9uID0gbmV3IEplc3RTcHlGdW5jdGlvblN0cmF0ZWd5KHsgbmFtZTogYCR7c3ViamVjdE5hbWV9LiR7Zm5OYW1lfWAsIHRlcm1zIH0pXG5cdFx0c3B5Lm1vY2tJbXBsZW1lbnRhdGlvbihqZXN0U3B5RnVuY3Rpb24ubW9ja0ltcGxlbWVudGF0aW9uRmFjdG9yeSgpKVxuXG5cdFx0Y29uc3QgbW9ja1Jlc3RvcmUgPSAoKTogdm9pZCA9PiBzcHkubW9ja1Jlc3RvcmUoKVxuXG5cdFx0cmV0dXJuIHsgbW9ja1Jlc3RvcmUsIHNweSB9XG5cdH0sXG59XG4iXX0=