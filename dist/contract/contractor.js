import { describe, it } from 'vitest';
import { contractorService } from '#src/contract/contractor-service';
import { contractExpectService } from '#src/contract/expect/contract-expect-service';
import { contractMockService } from '#src/contract-mock/contract-mock-service';
import { subjectService } from '#src/subject/subject-service';
export const contractor = (contract, fnName) => {
    const { terms, mock } = contract.fns[fnName];
    const moduleMockStrategy = contractMockService.strategyFromFunctionMock(contract.mock);
    const functionMockStrategy = contractMockService.strategyFromFunctionMock(mock);
    describe(contractorService.testDescription({ fnName }), () => {
        try {
            terms.forEach((term) => {
                const subjectStrategy = subjectService.strategyFromContractFunction({ contract, fnName, term });
                it(contractorService.testName({ term }), async () => {
                    moduleMockStrategy.mock({ params: term.params });
                    functionMockStrategy.mock({ params: term.params });
                    const expectStrategy = contractExpectService.fromTerm({ term });
                    await expectStrategy.test(() => subjectStrategy.exec(term));
                    functionMockStrategy.restore();
                    moduleMockStrategy.restore();
                });
            });
        }
        catch (err) {
            console.error(`Error running test on contract:${contract.subjectName}, fn:${fnName}`); // eslint-disable-line no-console
            throw err;
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cmFjdC9jb250cmFjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBRXJDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFBO0FBQ3BFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFBO0FBQ3BGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFBO0FBQzlFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQTtBQUc3RCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsQ0FPekIsUUFBVyxFQUNYLE1BQVksRUFDTCxFQUFFO0lBQ1QsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBc0IsQ0FBQTtJQUVqRSxNQUFNLGtCQUFrQixHQUFHLG1CQUFtQixDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN0RixNQUFNLG9CQUFvQixHQUFHLG1CQUFtQixDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFBO0lBRS9FLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRTtRQUM1RCxJQUFJLENBQUM7WUFDSixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3RCLE1BQU0sZUFBZSxHQUFHLGNBQWMsQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtnQkFFL0YsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUU7b0JBQ25ELGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtvQkFDaEQsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO29CQUNsRCxNQUFNLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO29CQUMvRCxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO29CQUMzRCxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtvQkFDOUIsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUE7Z0JBQzdCLENBQUMsQ0FBQyxDQUFBO1lBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDSCxDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLFFBQVEsQ0FBQyxXQUFXLFFBQVEsTUFBTSxFQUFFLENBQUMsQ0FBQSxDQUFDLGlDQUFpQztZQUN2SCxNQUFNLEdBQUcsQ0FBQTtRQUNWLENBQUM7SUFDRixDQUFDLENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlc2NyaWJlLCBpdCB9IGZyb20gJ3ZpdGVzdCdcblxuaW1wb3J0IHsgY29udHJhY3RvclNlcnZpY2UgfSBmcm9tICcjc3JjL2NvbnRyYWN0L2NvbnRyYWN0b3Itc2VydmljZSdcbmltcG9ydCB7IGNvbnRyYWN0RXhwZWN0U2VydmljZSB9IGZyb20gJyNzcmMvY29udHJhY3QvZXhwZWN0L2NvbnRyYWN0LWV4cGVjdC1zZXJ2aWNlJ1xuaW1wb3J0IHsgY29udHJhY3RNb2NrU2VydmljZSB9IGZyb20gJyNzcmMvY29udHJhY3QtbW9jay9jb250cmFjdC1tb2NrLXNlcnZpY2UnXG5pbXBvcnQgeyBzdWJqZWN0U2VydmljZSB9IGZyb20gJyNzcmMvc3ViamVjdC9zdWJqZWN0LXNlcnZpY2UnXG5pbXBvcnQgeyBDb250cmFjdCwgQ29udHJhY3RGdW5jdGlvbiwgUHJvcFR5cGUgfSBmcm9tICcjc3JjL3R5cGVzJ1xuXG5leHBvcnQgY29uc3QgY29udHJhY3RvciA9IDxcblx0TSxcblx0U04gZXh0ZW5kcyBFeHRyYWN0PGtleW9mIE0sIHN0cmluZz4sXG5cdFMgZXh0ZW5kcyBQcm9wVHlwZTxNLCBTTj4sXG5cdEMgZXh0ZW5kcyBDb250cmFjdDxNLCBTTiwgUz4sXG5cdENGTksgZXh0ZW5kcyBFeHRyYWN0PGtleW9mIFByb3BUeXBlPEMsICdmbnMnPiwgc3RyaW5nPixcbj4oXG5cdGNvbnRyYWN0OiBDLFxuXHRmbk5hbWU6IENGTktcbik6IHZvaWQgPT4ge1xuXHRjb25zdCB7IHRlcm1zLCBtb2NrIH0gPSBjb250cmFjdC5mbnNbZm5OYW1lXSEgYXMgQ29udHJhY3RGdW5jdGlvblxuXG5cdGNvbnN0IG1vZHVsZU1vY2tTdHJhdGVneSA9IGNvbnRyYWN0TW9ja1NlcnZpY2Uuc3RyYXRlZ3lGcm9tRnVuY3Rpb25Nb2NrKGNvbnRyYWN0Lm1vY2spXG5cdGNvbnN0IGZ1bmN0aW9uTW9ja1N0cmF0ZWd5ID0gY29udHJhY3RNb2NrU2VydmljZS5zdHJhdGVneUZyb21GdW5jdGlvbk1vY2sobW9jaylcblxuXHRkZXNjcmliZShjb250cmFjdG9yU2VydmljZS50ZXN0RGVzY3JpcHRpb24oeyBmbk5hbWUgfSksICgpID0+IHtcblx0XHR0cnkge1xuXHRcdFx0dGVybXMuZm9yRWFjaCgodGVybSkgPT4ge1xuXHRcdFx0XHRjb25zdCBzdWJqZWN0U3RyYXRlZ3kgPSBzdWJqZWN0U2VydmljZS5zdHJhdGVneUZyb21Db250cmFjdEZ1bmN0aW9uKHsgY29udHJhY3QsIGZuTmFtZSwgdGVybSB9KVxuXG5cdFx0XHRcdGl0KGNvbnRyYWN0b3JTZXJ2aWNlLnRlc3ROYW1lKHsgdGVybSB9KSwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdG1vZHVsZU1vY2tTdHJhdGVneS5tb2NrKHsgcGFyYW1zOiB0ZXJtLnBhcmFtcyB9KVxuXHRcdFx0XHRcdGZ1bmN0aW9uTW9ja1N0cmF0ZWd5Lm1vY2soeyBwYXJhbXM6IHRlcm0ucGFyYW1zIH0pXG5cdFx0XHRcdFx0Y29uc3QgZXhwZWN0U3RyYXRlZ3kgPSBjb250cmFjdEV4cGVjdFNlcnZpY2UuZnJvbVRlcm0oeyB0ZXJtIH0pXG5cdFx0XHRcdFx0YXdhaXQgZXhwZWN0U3RyYXRlZ3kudGVzdCgoKSA9PiBzdWJqZWN0U3RyYXRlZ3kuZXhlYyh0ZXJtKSlcblx0XHRcdFx0XHRmdW5jdGlvbk1vY2tTdHJhdGVneS5yZXN0b3JlKClcblx0XHRcdFx0XHRtb2R1bGVNb2NrU3RyYXRlZ3kucmVzdG9yZSgpXG5cdFx0XHRcdH0pXG5cdFx0XHR9KVxuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgRXJyb3IgcnVubmluZyB0ZXN0IG9uIGNvbnRyYWN0OiR7Y29udHJhY3Quc3ViamVjdE5hbWV9LCBmbjoke2ZuTmFtZX1gKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblx0XHRcdHRocm93IGVyclxuXHRcdH1cblx0fSlcbn1cbiJdfQ==