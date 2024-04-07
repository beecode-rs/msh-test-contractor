import { expect } from '@jest/globals';
import { objectUtil } from '../../util/object-util.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3QtZXhwZWN0LWFueS1lcXVhbC1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cmFjdC9leHBlY3QvY29udHJhY3QtZXhwZWN0LWFueS1lcXVhbC1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBSXRDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQTtBQUVsRCxNQUFNLE9BQU8sOEJBQThCO0lBQ3ZCLFdBQVcsQ0FBSztJQUVuQyxZQUFZLE1BQThCO1FBQ3pDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUE7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBQy9CLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQWE7UUFDdkIsTUFBTSxNQUFNLEdBQUcsTUFBTSxFQUFFLEVBQUUsQ0FBQTtRQUN6QixNQUFNLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtJQUNuSCxDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBlY3QgfSBmcm9tICdAamVzdC9nbG9iYWxzJ1xuXG5pbXBvcnQgeyBDb250cmFjdEV4cGVjdFN0cmF0ZWd5IH0gZnJvbSAnI3NyYy9jb250cmFjdC9leHBlY3QvY29udHJhY3QtZXhwZWN0LXNlcnZpY2UnXG5pbXBvcnQgeyBDb250cmFjdFRlcm0gfSBmcm9tICcjc3JjL3R5cGVzJ1xuaW1wb3J0IHsgb2JqZWN0VXRpbCB9IGZyb20gJyNzcmMvdXRpbC9vYmplY3QtdXRpbCdcblxuZXhwb3J0IGNsYXNzIENvbnRyYWN0RXhwZWN0QW55RXF1YWxTdHJhdGVneSBpbXBsZW1lbnRzIENvbnRyYWN0RXhwZWN0U3RyYXRlZ3kge1xuXHRwcm90ZWN0ZWQgcmVhZG9ubHkgX3Rlcm1SZXN1bHQ6IGFueVxuXG5cdGNvbnN0cnVjdG9yKHBhcmFtczogeyB0ZXJtOiBDb250cmFjdFRlcm0gfSkge1xuXHRcdGNvbnN0IHsgdGVybSB9ID0gcGFyYW1zXG5cdFx0dGhpcy5fdGVybVJlc3VsdCA9IHRlcm0ucmVzdWx0XG5cdH1cblxuXHRhc3luYyB0ZXN0KGZuOiAoKSA9PiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCBmbigpXG5cdFx0ZXhwZWN0KG9iamVjdFV0aWwuc3RyaW5naWZ5T3JOdWxsVW5kZWZpbmVkKHJlc3VsdCkpLnRvRXF1YWwob2JqZWN0VXRpbC5zdHJpbmdpZnlPck51bGxVbmRlZmluZWQodGhpcy5fdGVybVJlc3VsdCkpXG5cdH1cbn1cbiJdfQ==