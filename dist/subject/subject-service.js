import { SpecialFnName } from '#src/enum/special-fn-name';
import { SubjectClassFunctionStrategy } from '#src/subject/subject-class-function-strategy';
import { SubjectConstructorStrategy } from '#src/subject/subject-constructor-strategy';
import { SubjectFunctionStrategy } from '#src/subject/subject-function-strategy';
import { fnUtil } from '#src/util/fn-util';
export const subjectService = {
    strategyFromContractFunction: (params) => {
        const { contract: { module, subjectName, fns }, fnName, term: { constructorParams }, } = params;
        const subjectFromContract = { module, subjectName };
        if (fnUtil.isConstructor(fnName)) {
            return new SubjectConstructorStrategy({ subjectFromContract });
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (Object.keys(fns ?? {}).includes(SpecialFnName.CONSTRUCTOR)) {
            if (!constructorParams) {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                throw new Error(`Missing constructorParams in contract: ${subjectName}.${fnName}`);
            }
            return new SubjectClassFunctionStrategy({ constructorParams, fnName, subjectFromContract });
        }
        return new SubjectFunctionStrategy({ fnName, subjectFromContract });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViamVjdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N1YmplY3Qvc3ViamVjdC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQTtBQUN6RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQTtBQUMzRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQTtBQUN0RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQTtBQUdoRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFFMUMsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHO0lBQzdCLDRCQUE0QixFQUFFLENBQUMsTUFBcUUsRUFBbUIsRUFBRTtRQUN4SCxNQUFNLEVBQ0wsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsRUFDdEMsTUFBTSxFQUNOLElBQUksRUFBRSxFQUFFLGlCQUFpQixFQUFFLEdBQzNCLEdBQUcsTUFBTSxDQUFBO1FBQ1YsTUFBTSxtQkFBbUIsR0FBRyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQXlCLENBQUE7UUFDMUUsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDbEMsT0FBTyxJQUFJLDBCQUEwQixDQUFDLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFBO1FBQy9ELENBQUM7UUFDRCx1RUFBdUU7UUFDdkUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7WUFDaEUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3hCLDRFQUE0RTtnQkFDNUUsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsV0FBVyxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDbkYsQ0FBQztZQUVELE9BQU8sSUFBSSw0QkFBNEIsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUE7UUFDNUYsQ0FBQztRQUVELE9BQU8sSUFBSSx1QkFBdUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUE7SUFDcEUsQ0FBQztDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTcGVjaWFsRm5OYW1lIH0gZnJvbSAnI3NyYy9lbnVtL3NwZWNpYWwtZm4tbmFtZSdcbmltcG9ydCB7IFN1YmplY3RDbGFzc0Z1bmN0aW9uU3RyYXRlZ3kgfSBmcm9tICcjc3JjL3N1YmplY3Qvc3ViamVjdC1jbGFzcy1mdW5jdGlvbi1zdHJhdGVneSdcbmltcG9ydCB7IFN1YmplY3RDb25zdHJ1Y3RvclN0cmF0ZWd5IH0gZnJvbSAnI3NyYy9zdWJqZWN0L3N1YmplY3QtY29uc3RydWN0b3Itc3RyYXRlZ3knXG5pbXBvcnQgeyBTdWJqZWN0RnVuY3Rpb25TdHJhdGVneSB9IGZyb20gJyNzcmMvc3ViamVjdC9zdWJqZWN0LWZ1bmN0aW9uLXN0cmF0ZWd5J1xuaW1wb3J0IHsgdHlwZSBTdWJqZWN0RnJvbUNvbnRyYWN0LCB0eXBlIFN1YmplY3RTdHJhdGVneSB9IGZyb20gJyNzcmMvc3ViamVjdC9zdWJqZWN0LXN0cmF0ZWd5J1xuaW1wb3J0IHsgdHlwZSBBbnlDb250cmFjdCwgdHlwZSBDb250cmFjdFRlcm0gfSBmcm9tICcjc3JjL3R5cGVzL2luZGV4J1xuaW1wb3J0IHsgZm5VdGlsIH0gZnJvbSAnI3NyYy91dGlsL2ZuLXV0aWwnXG5cbmV4cG9ydCBjb25zdCBzdWJqZWN0U2VydmljZSA9IHtcblx0c3RyYXRlZ3lGcm9tQ29udHJhY3RGdW5jdGlvbjogKHBhcmFtczogeyBjb250cmFjdDogQW55Q29udHJhY3Q7IGZuTmFtZTogc3RyaW5nOyB0ZXJtOiBDb250cmFjdFRlcm0gfSk6IFN1YmplY3RTdHJhdGVneSA9PiB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0Y29udHJhY3Q6IHsgbW9kdWxlLCBzdWJqZWN0TmFtZSwgZm5zIH0sXG5cdFx0XHRmbk5hbWUsXG5cdFx0XHR0ZXJtOiB7IGNvbnN0cnVjdG9yUGFyYW1zIH0sXG5cdFx0fSA9IHBhcmFtc1xuXHRcdGNvbnN0IHN1YmplY3RGcm9tQ29udHJhY3QgPSB7IG1vZHVsZSwgc3ViamVjdE5hbWUgfSBhcyBTdWJqZWN0RnJvbUNvbnRyYWN0XG5cdFx0aWYgKGZuVXRpbC5pc0NvbnN0cnVjdG9yKGZuTmFtZSkpIHtcblx0XHRcdHJldHVybiBuZXcgU3ViamVjdENvbnN0cnVjdG9yU3RyYXRlZ3koeyBzdWJqZWN0RnJvbUNvbnRyYWN0IH0pXG5cdFx0fVxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5uZWNlc3NhcnktY29uZGl0aW9uXG5cdFx0aWYgKE9iamVjdC5rZXlzKGZucyA/PyB7fSkuaW5jbHVkZXMoU3BlY2lhbEZuTmFtZS5DT05TVFJVQ1RPUikpIHtcblx0XHRcdGlmICghY29uc3RydWN0b3JQYXJhbXMpIHtcblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9yZXN0cmljdC10ZW1wbGF0ZS1leHByZXNzaW9uc1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgY29uc3RydWN0b3JQYXJhbXMgaW4gY29udHJhY3Q6ICR7c3ViamVjdE5hbWV9LiR7Zm5OYW1lfWApXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBuZXcgU3ViamVjdENsYXNzRnVuY3Rpb25TdHJhdGVneSh7IGNvbnN0cnVjdG9yUGFyYW1zLCBmbk5hbWUsIHN1YmplY3RGcm9tQ29udHJhY3QgfSlcblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3IFN1YmplY3RGdW5jdGlvblN0cmF0ZWd5KHsgZm5OYW1lLCBzdWJqZWN0RnJvbUNvbnRyYWN0IH0pXG5cdH0sXG59XG4iXX0=