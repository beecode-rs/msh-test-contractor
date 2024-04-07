import { ContractExpectAnyEqualStrategy } from '../../contract/expect/contract-expect-any-equal-strategy.js';
import { ContractExpectFunctionResultEqualStrategy } from '../../contract/expect/contract-expect-function-result-equal-strategy.js';
import { ContractExpectThrowErrorStrategy } from '../../contract/expect/contract-expect-throw-error-strategy.js';
export const contractExpectService = {
    fromTerm: (params) => {
        const { term } = params;
        if (term.result instanceof Error) {
            return new ContractExpectThrowErrorStrategy({ term });
        }
        if (term.returnFnParams) {
            return new ContractExpectFunctionResultEqualStrategy({ term });
        }
        return new ContractExpectAnyEqualStrategy({ term });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3QtZXhwZWN0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJhY3QvZXhwZWN0L2NvbnRyYWN0LWV4cGVjdC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLHlEQUF5RCxDQUFBO0FBQ3hHLE9BQU8sRUFBRSx5Q0FBeUMsRUFBRSxNQUFNLHFFQUFxRSxDQUFBO0FBQy9ILE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDJEQUEyRCxDQUFBO0FBTzVHLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFHO0lBQ3BDLFFBQVEsRUFBRSxDQUFDLE1BQThCLEVBQTBCLEVBQUU7UUFDcEUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLFlBQVksS0FBSyxFQUFFLENBQUM7WUFDbEMsT0FBTyxJQUFJLGdDQUFnQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUN0RCxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDekIsT0FBTyxJQUFJLHlDQUF5QyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUMvRCxDQUFDO1FBRUQsT0FBTyxJQUFJLDhCQUE4QixDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0NBQ0QsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyYWN0RXhwZWN0QW55RXF1YWxTdHJhdGVneSB9IGZyb20gJyNzcmMvY29udHJhY3QvZXhwZWN0L2NvbnRyYWN0LWV4cGVjdC1hbnktZXF1YWwtc3RyYXRlZ3knXG5pbXBvcnQgeyBDb250cmFjdEV4cGVjdEZ1bmN0aW9uUmVzdWx0RXF1YWxTdHJhdGVneSB9IGZyb20gJyNzcmMvY29udHJhY3QvZXhwZWN0L2NvbnRyYWN0LWV4cGVjdC1mdW5jdGlvbi1yZXN1bHQtZXF1YWwtc3RyYXRlZ3knXG5pbXBvcnQgeyBDb250cmFjdEV4cGVjdFRocm93RXJyb3JTdHJhdGVneSB9IGZyb20gJyNzcmMvY29udHJhY3QvZXhwZWN0L2NvbnRyYWN0LWV4cGVjdC10aHJvdy1lcnJvci1zdHJhdGVneSdcbmltcG9ydCB7IENvbnRyYWN0VGVybSB9IGZyb20gJyNzcmMvdHlwZXMnXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udHJhY3RFeHBlY3RTdHJhdGVneSB7XG5cdHRlc3QoZm46ICgpID0+IGFueSk6IFByb21pc2U8dm9pZD5cbn1cblxuZXhwb3J0IGNvbnN0IGNvbnRyYWN0RXhwZWN0U2VydmljZSA9IHtcblx0ZnJvbVRlcm06IChwYXJhbXM6IHsgdGVybTogQ29udHJhY3RUZXJtIH0pOiBDb250cmFjdEV4cGVjdFN0cmF0ZWd5ID0+IHtcblx0XHRjb25zdCB7IHRlcm0gfSA9IHBhcmFtc1xuXHRcdGlmICh0ZXJtLnJlc3VsdCBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0XHRyZXR1cm4gbmV3IENvbnRyYWN0RXhwZWN0VGhyb3dFcnJvclN0cmF0ZWd5KHsgdGVybSB9KVxuXHRcdH1cblx0XHRpZiAodGVybS5yZXR1cm5GblBhcmFtcykge1xuXHRcdFx0cmV0dXJuIG5ldyBDb250cmFjdEV4cGVjdEZ1bmN0aW9uUmVzdWx0RXF1YWxTdHJhdGVneSh7IHRlcm0gfSlcblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3IENvbnRyYWN0RXhwZWN0QW55RXF1YWxTdHJhdGVneSh7IHRlcm0gfSlcblx0fSxcbn1cbiJdfQ==