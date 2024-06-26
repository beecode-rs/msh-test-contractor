import { expect } from 'vitest';
export class ContractExpectFunctionResultEqualStrategy {
    _termResult;
    _termReturnFnParams;
    constructor(params) {
        const { term } = params;
        this._termResult = term.result;
        this._termReturnFnParams = term.returnFnParams;
    }
    async test(fn) {
        const result = fn()(...this._termReturnFnParams);
        expect(await result).toEqual(this._termResult);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3QtZXhwZWN0LWZ1bmN0aW9uLXJlc3VsdC1lcXVhbC1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cmFjdC9leHBlY3QvY29udHJhY3QtZXhwZWN0LWZ1bmN0aW9uLXJlc3VsdC1lcXVhbC1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBSy9CLE1BQU0sT0FBTyx5Q0FBeUM7SUFDbEMsV0FBVyxDQUFLO0lBQ2hCLG1CQUFtQixDQUFLO0lBRTNDLFlBQVksTUFBOEI7UUFDekMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7UUFDOUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUE7SUFDL0MsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBYTtRQUN2QixNQUFNLE1BQU0sR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1FBQ2hELE1BQU0sQ0FBQyxNQUFNLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDL0MsQ0FBQztDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhwZWN0IH0gZnJvbSAndml0ZXN0J1xuXG5pbXBvcnQgeyBDb250cmFjdEV4cGVjdFN0cmF0ZWd5IH0gZnJvbSAnI3NyYy9jb250cmFjdC9leHBlY3QvY29udHJhY3QtZXhwZWN0LXNlcnZpY2UnXG5pbXBvcnQgeyBDb250cmFjdFRlcm0gfSBmcm9tICcjc3JjL3R5cGVzJ1xuXG5leHBvcnQgY2xhc3MgQ29udHJhY3RFeHBlY3RGdW5jdGlvblJlc3VsdEVxdWFsU3RyYXRlZ3kgaW1wbGVtZW50cyBDb250cmFjdEV4cGVjdFN0cmF0ZWd5IHtcblx0cHJvdGVjdGVkIHJlYWRvbmx5IF90ZXJtUmVzdWx0OiBhbnlcblx0cHJvdGVjdGVkIHJlYWRvbmx5IF90ZXJtUmV0dXJuRm5QYXJhbXM6IGFueVxuXG5cdGNvbnN0cnVjdG9yKHBhcmFtczogeyB0ZXJtOiBDb250cmFjdFRlcm0gfSkge1xuXHRcdGNvbnN0IHsgdGVybSB9ID0gcGFyYW1zXG5cdFx0dGhpcy5fdGVybVJlc3VsdCA9IHRlcm0ucmVzdWx0XG5cdFx0dGhpcy5fdGVybVJldHVybkZuUGFyYW1zID0gdGVybS5yZXR1cm5GblBhcmFtc1xuXHR9XG5cblx0YXN5bmMgdGVzdChmbjogKCkgPT4gYW55KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gZm4oKSguLi50aGlzLl90ZXJtUmV0dXJuRm5QYXJhbXMpXG5cdFx0ZXhwZWN0KGF3YWl0IHJlc3VsdCkudG9FcXVhbCh0aGlzLl90ZXJtUmVzdWx0KVxuXHR9XG59XG4iXX0=