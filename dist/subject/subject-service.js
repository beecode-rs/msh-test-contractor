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
        if (Object.keys(fns ?? {}).includes(SpecialFnName.CONSTRUCTOR)) {
            if (!constructorParams) {
                throw new Error(`Missing constructorParams in contract: ${subjectName}.${fnName}`);
            }
            return new SubjectClassFunctionStrategy({ constructorParams, fnName, subjectFromContract });
        }
        return new SubjectFunctionStrategy({ fnName, subjectFromContract });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViamVjdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N1YmplY3Qvc3ViamVjdC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQTtBQUN6RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQTtBQUMzRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQTtBQUN0RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQTtBQUdoRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sbUJBQW1CLENBQUE7QUFFMUMsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHO0lBQzdCLDRCQUE0QixFQUFFLENBQUMsTUFBcUUsRUFBbUIsRUFBRTtRQUN4SCxNQUFNLEVBQ0wsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsRUFDdEMsTUFBTSxFQUNOLElBQUksRUFBRSxFQUFFLGlCQUFpQixFQUFFLEdBQzNCLEdBQUcsTUFBTSxDQUFBO1FBQ1YsTUFBTSxtQkFBbUIsR0FBRyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQXlCLENBQUE7UUFDMUUsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDbEMsT0FBTyxJQUFJLDBCQUEwQixDQUFDLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFBO1FBQy9ELENBQUM7UUFDRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztZQUNoRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsV0FBVyxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDbkYsQ0FBQztZQUVELE9BQU8sSUFBSSw0QkFBNEIsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUE7UUFDNUYsQ0FBQztRQUVELE9BQU8sSUFBSSx1QkFBdUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUE7SUFDcEUsQ0FBQztDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTcGVjaWFsRm5OYW1lIH0gZnJvbSAnI3NyYy9lbnVtL3NwZWNpYWwtZm4tbmFtZSdcbmltcG9ydCB7IFN1YmplY3RDbGFzc0Z1bmN0aW9uU3RyYXRlZ3kgfSBmcm9tICcjc3JjL3N1YmplY3Qvc3ViamVjdC1jbGFzcy1mdW5jdGlvbi1zdHJhdGVneSdcbmltcG9ydCB7IFN1YmplY3RDb25zdHJ1Y3RvclN0cmF0ZWd5IH0gZnJvbSAnI3NyYy9zdWJqZWN0L3N1YmplY3QtY29uc3RydWN0b3Itc3RyYXRlZ3knXG5pbXBvcnQgeyBTdWJqZWN0RnVuY3Rpb25TdHJhdGVneSB9IGZyb20gJyNzcmMvc3ViamVjdC9zdWJqZWN0LWZ1bmN0aW9uLXN0cmF0ZWd5J1xuaW1wb3J0IHsgU3ViamVjdEZyb21Db250cmFjdCwgU3ViamVjdFN0cmF0ZWd5IH0gZnJvbSAnI3NyYy9zdWJqZWN0L3N1YmplY3Qtc3RyYXRlZ3knXG5pbXBvcnQgeyBBbnlDb250cmFjdCwgQ29udHJhY3RUZXJtIH0gZnJvbSAnI3NyYy90eXBlcydcbmltcG9ydCB7IGZuVXRpbCB9IGZyb20gJyNzcmMvdXRpbC9mbi11dGlsJ1xuXG5leHBvcnQgY29uc3Qgc3ViamVjdFNlcnZpY2UgPSB7XG5cdHN0cmF0ZWd5RnJvbUNvbnRyYWN0RnVuY3Rpb246IChwYXJhbXM6IHsgY29udHJhY3Q6IEFueUNvbnRyYWN0OyBmbk5hbWU6IHN0cmluZzsgdGVybTogQ29udHJhY3RUZXJtIH0pOiBTdWJqZWN0U3RyYXRlZ3kgPT4ge1xuXHRcdGNvbnN0IHtcblx0XHRcdGNvbnRyYWN0OiB7IG1vZHVsZSwgc3ViamVjdE5hbWUsIGZucyB9LFxuXHRcdFx0Zm5OYW1lLFxuXHRcdFx0dGVybTogeyBjb25zdHJ1Y3RvclBhcmFtcyB9LFxuXHRcdH0gPSBwYXJhbXNcblx0XHRjb25zdCBzdWJqZWN0RnJvbUNvbnRyYWN0ID0geyBtb2R1bGUsIHN1YmplY3ROYW1lIH0gYXMgU3ViamVjdEZyb21Db250cmFjdFxuXHRcdGlmIChmblV0aWwuaXNDb25zdHJ1Y3Rvcihmbk5hbWUpKSB7XG5cdFx0XHRyZXR1cm4gbmV3IFN1YmplY3RDb25zdHJ1Y3RvclN0cmF0ZWd5KHsgc3ViamVjdEZyb21Db250cmFjdCB9KVxuXHRcdH1cblx0XHRpZiAoT2JqZWN0LmtleXMoZm5zID8/IHt9KS5pbmNsdWRlcyhTcGVjaWFsRm5OYW1lLkNPTlNUUlVDVE9SKSkge1xuXHRcdFx0aWYgKCFjb25zdHJ1Y3RvclBhcmFtcykge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgY29uc3RydWN0b3JQYXJhbXMgaW4gY29udHJhY3Q6ICR7c3ViamVjdE5hbWV9LiR7Zm5OYW1lfWApXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBuZXcgU3ViamVjdENsYXNzRnVuY3Rpb25TdHJhdGVneSh7IGNvbnN0cnVjdG9yUGFyYW1zLCBmbk5hbWUsIHN1YmplY3RGcm9tQ29udHJhY3QgfSlcblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3IFN1YmplY3RGdW5jdGlvblN0cmF0ZWd5KHsgZm5OYW1lLCBzdWJqZWN0RnJvbUNvbnRyYWN0IH0pXG5cdH0sXG59XG4iXX0=