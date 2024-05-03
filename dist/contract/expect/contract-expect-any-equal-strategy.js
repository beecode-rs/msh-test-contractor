import { expect } from 'vitest';
import { objectUtil } from '#src/util/object-util';
export class ContractExpectAnyEqualStrategy {
    _termResult;
    constructor(params) {
        const { term } = params;
        this._termResult = term.result;
    }
    async test(fn) {
        const result = await fn();
        expect(objectUtil.stringifyOrNullUndefined(result)).toEqual(objectUtil.stringifyOrNullUndefined(this._termResult));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3QtZXhwZWN0LWFueS1lcXVhbC1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cmFjdC9leHBlY3QvY29udHJhY3QtZXhwZWN0LWFueS1lcXVhbC1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBSS9CLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTtBQUVsRCxNQUFNLE9BQU8sOEJBQThCO0lBQ3ZCLFdBQVcsQ0FBSztJQUVuQyxZQUFZLE1BQThCO1FBQ3pDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBQy9CLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQWE7UUFDdkIsTUFBTSxNQUFNLEdBQUcsTUFBTSxFQUFFLEVBQUUsQ0FBQTtRQUN6QixNQUFNLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtJQUNuSCxDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBlY3QgfSBmcm9tICd2aXRlc3QnXG5cbmltcG9ydCB7IENvbnRyYWN0RXhwZWN0U3RyYXRlZ3kgfSBmcm9tICcjc3JjL2NvbnRyYWN0L2V4cGVjdC9jb250cmFjdC1leHBlY3Qtc2VydmljZSdcbmltcG9ydCB7IENvbnRyYWN0VGVybSB9IGZyb20gJyNzcmMvdHlwZXMnXG5pbXBvcnQgeyBvYmplY3RVdGlsIH0gZnJvbSAnI3NyYy91dGlsL29iamVjdC11dGlsJ1xuXG5leHBvcnQgY2xhc3MgQ29udHJhY3RFeHBlY3RBbnlFcXVhbFN0cmF0ZWd5IGltcGxlbWVudHMgQ29udHJhY3RFeHBlY3RTdHJhdGVneSB7XG5cdHByb3RlY3RlZCByZWFkb25seSBfdGVybVJlc3VsdDogYW55XG5cblx0Y29uc3RydWN0b3IocGFyYW1zOiB7IHRlcm06IENvbnRyYWN0VGVybSB9KSB7XG5cdFx0Y29uc3QgeyB0ZXJtIH0gPSBwYXJhbXNcblx0XHR0aGlzLl90ZXJtUmVzdWx0ID0gdGVybS5yZXN1bHRcblx0fVxuXG5cdGFzeW5jIHRlc3QoZm46ICgpID0+IGFueSk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZuKClcblx0XHRleHBlY3Qob2JqZWN0VXRpbC5zdHJpbmdpZnlPck51bGxVbmRlZmluZWQocmVzdWx0KSkudG9FcXVhbChvYmplY3RVdGlsLnN0cmluZ2lmeU9yTnVsbFVuZGVmaW5lZCh0aGlzLl90ZXJtUmVzdWx0KSlcblx0fVxufVxuIl19