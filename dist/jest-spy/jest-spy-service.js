import { JestSpyClassFunctionStrategy } from '../jest-spy/jest-spy-class-function-strategy.js';
import { JestSpyFunctionStrategy } from '../jest-spy/jest-spy-function-strategy.js';
export const jestSpyService = {
    strategyFromTerms: (params) => {
        const { terms, mockClassParams, name } = params;
        if (terms.length === 0) {
            throw new Error('Terms missing');
        }
        const [{ constructorParams } = { constructorParams: undefined }] = terms;
        if (mockClassParams && constructorParams) {
            return new JestSpyClassFunctionStrategy({ mockClassParams, name, terms });
        }
        return new JestSpyFunctionStrategy({ name, terms });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamVzdC1zcHktc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9qZXN0LXNweS9qZXN0LXNweS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdEQUFnRCxDQUFBO0FBQzdGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFBO0FBSWxGLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRztJQUM3QixpQkFBaUIsRUFBRSxDQUFDLE1BQXdFLEVBQW1CLEVBQUU7UUFDaEgsTUFBTSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQy9DLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ2pDLENBQUM7UUFDRCxNQUFNLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUE7UUFDeEUsSUFBSSxlQUFlLElBQUksaUJBQWlCLEVBQUUsQ0FBQztZQUMxQyxPQUFPLElBQUksNEJBQTRCLENBQUMsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDMUUsQ0FBQztRQUVELE9BQU8sSUFBSSx1QkFBdUIsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBQ3BELENBQUM7Q0FDRCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSmVzdFNweUNsYXNzRnVuY3Rpb25TdHJhdGVneSB9IGZyb20gJyNzcmMvamVzdC1zcHkvamVzdC1zcHktY2xhc3MtZnVuY3Rpb24tc3RyYXRlZ3knXG5pbXBvcnQgeyBKZXN0U3B5RnVuY3Rpb25TdHJhdGVneSB9IGZyb20gJyNzcmMvamVzdC1zcHkvamVzdC1zcHktZnVuY3Rpb24tc3RyYXRlZ3knXG5pbXBvcnQgeyBKZXN0U3B5U3RyYXRlZ3kgfSBmcm9tICcjc3JjL2plc3Qtc3B5L2plc3Qtc3B5LXN0cmF0ZWd5J1xuaW1wb3J0IHsgQ29udHJhY3RUZXJtIH0gZnJvbSAnI3NyYy90eXBlcydcblxuZXhwb3J0IGNvbnN0IGplc3RTcHlTZXJ2aWNlID0ge1xuXHRzdHJhdGVneUZyb21UZXJtczogKHBhcmFtczogeyB0ZXJtczogQ29udHJhY3RUZXJtW107IG1vY2tDbGFzc1BhcmFtcz86IGFueVtdOyBuYW1lOiBzdHJpbmcgfSk6IEplc3RTcHlTdHJhdGVneSA9PiB7XG5cdFx0Y29uc3QgeyB0ZXJtcywgbW9ja0NsYXNzUGFyYW1zLCBuYW1lIH0gPSBwYXJhbXNcblx0XHRpZiAodGVybXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1Rlcm1zIG1pc3NpbmcnKVxuXHRcdH1cblx0XHRjb25zdCBbeyBjb25zdHJ1Y3RvclBhcmFtcyB9ID0geyBjb25zdHJ1Y3RvclBhcmFtczogdW5kZWZpbmVkIH1dID0gdGVybXNcblx0XHRpZiAobW9ja0NsYXNzUGFyYW1zICYmIGNvbnN0cnVjdG9yUGFyYW1zKSB7XG5cdFx0XHRyZXR1cm4gbmV3IEplc3RTcHlDbGFzc0Z1bmN0aW9uU3RyYXRlZ3koeyBtb2NrQ2xhc3NQYXJhbXMsIG5hbWUsIHRlcm1zIH0pXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5ldyBKZXN0U3B5RnVuY3Rpb25TdHJhdGVneSh7IG5hbWUsIHRlcm1zIH0pXG5cdH0sXG59XG4iXX0=