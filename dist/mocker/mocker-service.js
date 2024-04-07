import { SpecialFnName } from '../enum/special-fn-name.js';
import { MockerJestClassStrategy } from '../mocker/mocker-jest-class-strategy.js';
import { MockerJestFunctionStrategy } from '../mocker/mocker-jest-function-strategy.js';
import { MockerJestObjectStrategy } from '../mocker/mocker-jest-object-strategy.js';
import { typeUtil } from '../util/type-util.js';
export const mockerService = {
    strategyFromContract: (contract) => {
        const { module, subjectName, fns } = contract;
        const subject = module[subjectName];
        const { [SpecialFnName.SELF]: selfFunction } = fns;
        if (typeUtil.isFunction(subject) && selfFunction) {
            return new MockerJestFunctionStrategy(contract);
        }
        if (typeUtil.isClass(subject)) {
            return new MockerJestClassStrategy(contract);
        }
        if (typeUtil.isObject(subject)) {
            return new MockerJestObjectStrategy(contract);
        }
        throw new Error('Unknown mocker');
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja2VyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9ja2VyL21vY2tlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQTtBQUN6RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQTtBQUNoRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQTtBQUN0RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQTtBQUdsRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFFOUMsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHO0lBQzVCLG9CQUFvQixFQUFFLENBQUMsUUFBcUIsRUFBdUIsRUFBRTtRQUNwRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsR0FBRyxRQUFRLENBQUE7UUFDN0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ25DLE1BQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxZQUFZLEVBQUUsR0FBRyxHQUFHLENBQUE7UUFDbEQsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFlBQVksRUFBRSxDQUFDO1lBQ2xELE9BQU8sSUFBSSwwQkFBMEIsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNoRCxDQUFDO1FBQ0QsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDL0IsT0FBTyxJQUFJLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzdDLENBQUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNoQyxPQUFPLElBQUksd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDOUMsQ0FBQztRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUNsQyxDQUFDO0NBQ0QsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNwZWNpYWxGbk5hbWUgfSBmcm9tICcjc3JjL2VudW0vc3BlY2lhbC1mbi1uYW1lJ1xuaW1wb3J0IHsgTW9ja2VySmVzdENsYXNzU3RyYXRlZ3kgfSBmcm9tICcjc3JjL21vY2tlci9tb2NrZXItamVzdC1jbGFzcy1zdHJhdGVneSdcbmltcG9ydCB7IE1vY2tlckplc3RGdW5jdGlvblN0cmF0ZWd5IH0gZnJvbSAnI3NyYy9tb2NrZXIvbW9ja2VyLWplc3QtZnVuY3Rpb24tc3RyYXRlZ3knXG5pbXBvcnQgeyBNb2NrZXJKZXN0T2JqZWN0U3RyYXRlZ3kgfSBmcm9tICcjc3JjL21vY2tlci9tb2NrZXItamVzdC1vYmplY3Qtc3RyYXRlZ3knXG5pbXBvcnQgeyBNb2NrZXJTdHJhdGVneSB9IGZyb20gJyNzcmMvbW9ja2VyL21vY2tlci1zdHJhdGVneSdcbmltcG9ydCB7IEFueUNvbnRyYWN0IH0gZnJvbSAnI3NyYy90eXBlcydcbmltcG9ydCB7IHR5cGVVdGlsIH0gZnJvbSAnI3NyYy91dGlsL3R5cGUtdXRpbCdcblxuZXhwb3J0IGNvbnN0IG1vY2tlclNlcnZpY2UgPSB7XG5cdHN0cmF0ZWd5RnJvbUNvbnRyYWN0OiAoY29udHJhY3Q6IEFueUNvbnRyYWN0KTogTW9ja2VyU3RyYXRlZ3k8YW55PiA9PiB7XG5cdFx0Y29uc3QgeyBtb2R1bGUsIHN1YmplY3ROYW1lLCBmbnMgfSA9IGNvbnRyYWN0XG5cdFx0Y29uc3Qgc3ViamVjdCA9IG1vZHVsZVtzdWJqZWN0TmFtZV1cblx0XHRjb25zdCB7IFtTcGVjaWFsRm5OYW1lLlNFTEZdOiBzZWxmRnVuY3Rpb24gfSA9IGZuc1xuXHRcdGlmICh0eXBlVXRpbC5pc0Z1bmN0aW9uKHN1YmplY3QpICYmIHNlbGZGdW5jdGlvbikge1xuXHRcdFx0cmV0dXJuIG5ldyBNb2NrZXJKZXN0RnVuY3Rpb25TdHJhdGVneShjb250cmFjdClcblx0XHR9XG5cdFx0aWYgKHR5cGVVdGlsLmlzQ2xhc3Moc3ViamVjdCkpIHtcblx0XHRcdHJldHVybiBuZXcgTW9ja2VySmVzdENsYXNzU3RyYXRlZ3koY29udHJhY3QpXG5cdFx0fVxuXHRcdGlmICh0eXBlVXRpbC5pc09iamVjdChzdWJqZWN0KSkge1xuXHRcdFx0cmV0dXJuIG5ldyBNb2NrZXJKZXN0T2JqZWN0U3RyYXRlZ3koY29udHJhY3QpXG5cdFx0fVxuXHRcdHRocm93IG5ldyBFcnJvcignVW5rbm93biBtb2NrZXInKVxuXHR9LFxufVxuIl19