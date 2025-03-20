import { expect } from 'vitest';
import { objectUtil } from '#src/util/object-util';
export class ContractExpectAnyEqualStrategy {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _termResult;
    constructor(params) {
        const { term } = params;
        this._termResult = term.result;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async test(fn) {
        const result = await fn();
        expect(objectUtil.stringifyOrNullUndefined(result)).toEqual(objectUtil.stringifyOrNullUndefined(this._termResult));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3QtZXhwZWN0LWFueS1lcXVhbC1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cmFjdC9leHBlY3QvY29udHJhY3QtZXhwZWN0LWFueS1lcXVhbC1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBSS9CLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTtBQUVsRCxNQUFNLE9BQU8sOEJBQThCO0lBQzFDLDhEQUE4RDtJQUMzQyxXQUFXLENBQUs7SUFFbkMsWUFBWSxNQUE4QjtRQUN6QyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUMvQixDQUFDO0lBRUQsOERBQThEO0lBQzlELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBYTtRQUN2QixNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsRUFBRSxDQUFBO1FBQ3pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO0lBQ25ILENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4cGVjdCB9IGZyb20gJ3ZpdGVzdCdcblxuaW1wb3J0IHsgdHlwZSBDb250cmFjdEV4cGVjdFN0cmF0ZWd5IH0gZnJvbSAnI3NyYy9jb250cmFjdC9leHBlY3QvY29udHJhY3QtZXhwZWN0LXNlcnZpY2UnXG5pbXBvcnQgeyB0eXBlIENvbnRyYWN0VGVybSB9IGZyb20gJyNzcmMvdHlwZXMvaW5kZXgnXG5pbXBvcnQgeyBvYmplY3RVdGlsIH0gZnJvbSAnI3NyYy91dGlsL29iamVjdC11dGlsJ1xuXG5leHBvcnQgY2xhc3MgQ29udHJhY3RFeHBlY3RBbnlFcXVhbFN0cmF0ZWd5IGltcGxlbWVudHMgQ29udHJhY3RFeHBlY3RTdHJhdGVneSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5cdHByb3RlY3RlZCByZWFkb25seSBfdGVybVJlc3VsdDogYW55XG5cblx0Y29uc3RydWN0b3IocGFyYW1zOiB7IHRlcm06IENvbnRyYWN0VGVybSB9KSB7XG5cdFx0Y29uc3QgeyB0ZXJtIH0gPSBwYXJhbXNcblx0XHR0aGlzLl90ZXJtUmVzdWx0ID0gdGVybS5yZXN1bHRcblx0fVxuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5cdGFzeW5jIHRlc3QoZm46ICgpID0+IGFueSk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZuKClcblx0XHRleHBlY3Qob2JqZWN0VXRpbC5zdHJpbmdpZnlPck51bGxVbmRlZmluZWQocmVzdWx0KSkudG9FcXVhbChvYmplY3RVdGlsLnN0cmluZ2lmeU9yTnVsbFVuZGVmaW5lZCh0aGlzLl90ZXJtUmVzdWx0KSlcblx0fVxufVxuIl19