import { expect } from 'vitest';
export class ContractExpectThrowErrorStrategy {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _termResult;
    constructor(params) {
        const { term } = params;
        this._termResult = term.result;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/require-await
    async test(fn) {
        expect(() => fn()).toThrow(this._termResult.message);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3QtZXhwZWN0LXRocm93LWVycm9yLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyYWN0L2V4cGVjdC9jb250cmFjdC1leHBlY3QtdGhyb3ctZXJyb3Itc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUsvQixNQUFNLE9BQU8sZ0NBQWdDO0lBQzVDLDhEQUE4RDtJQUMzQyxXQUFXLENBQUs7SUFFbkMsWUFBWSxNQUE4QjtRQUN6QyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUMvQixDQUFDO0lBRUQsZ0dBQWdHO0lBQ2hHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBYTtRQUN2QixNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleHBlY3QgfSBmcm9tICd2aXRlc3QnXG5cbmltcG9ydCB7IHR5cGUgQ29udHJhY3RFeHBlY3RTdHJhdGVneSB9IGZyb20gJyNzcmMvY29udHJhY3QvZXhwZWN0L2NvbnRyYWN0LWV4cGVjdC1zZXJ2aWNlJ1xuaW1wb3J0IHsgdHlwZSBDb250cmFjdFRlcm0gfSBmcm9tICcjc3JjL3R5cGVzL2luZGV4J1xuXG5leHBvcnQgY2xhc3MgQ29udHJhY3RFeHBlY3RUaHJvd0Vycm9yU3RyYXRlZ3kgaW1wbGVtZW50cyBDb250cmFjdEV4cGVjdFN0cmF0ZWd5IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0cHJvdGVjdGVkIHJlYWRvbmx5IF90ZXJtUmVzdWx0OiBhbnlcblxuXHRjb25zdHJ1Y3RvcihwYXJhbXM6IHsgdGVybTogQ29udHJhY3RUZXJtIH0pIHtcblx0XHRjb25zdCB7IHRlcm0gfSA9IHBhcmFtc1xuXHRcdHRoaXMuX3Rlcm1SZXN1bHQgPSB0ZXJtLnJlc3VsdFxuXHR9XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9yZXF1aXJlLWF3YWl0XG5cdGFzeW5jIHRlc3QoZm46ICgpID0+IGFueSk6IFByb21pc2U8dm9pZD4ge1xuXHRcdGV4cGVjdCgoKSA9PiBmbigpKS50b1Rocm93KHRoaXMuX3Rlcm1SZXN1bHQubWVzc2FnZSlcblx0fVxufVxuIl19