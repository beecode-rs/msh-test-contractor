export class MockVitestStrategy {
    _mock;
    _restoreMockFn;
    constructor(_mock) {
        this._mock = _mock;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mock(mockParams = {}) {
        const { params } = mockParams;
        this._restoreMockFn = [];
        if (this._mock) {
            this._restoreMockFn = this._mock({ params });
        }
    }
    restore() {
        if (this._restoreMockFn) {
            this._restoreMockFn.forEach((rf) => {
                rf();
            });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay12aXRlc3Qtc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJhY3QtbW9jay9tb2NrLXZpdGVzdC1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLE9BQU8sa0JBQWtCO0lBR0M7SUFGckIsY0FBYyxDQUF3QjtJQUVoRCxZQUErQixLQUFvQjtRQUFwQixVQUFLLEdBQUwsS0FBSyxDQUFlO0lBQUcsQ0FBQztJQUV2RCw4REFBOEQ7SUFDOUQsSUFBSSxDQUFDLGFBQWlDLEVBQUU7UUFDdkMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLFVBQVUsQ0FBQTtRQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQTtRQUN4QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQzdDLENBQUM7SUFDRixDQUFDO0lBRUQsT0FBTztRQUNOLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7Z0JBQ2xDLEVBQUUsRUFBRSxDQUFBO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDSCxDQUFDO0lBQ0YsQ0FBQztDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdHlwZSBNb2NrU3RyYXRlZ3kgfSBmcm9tICcjc3JjL2NvbnRyYWN0LW1vY2svbW9jay1zdHJhdGVneSdcbmltcG9ydCB7IHR5cGUgQ29udHJhY3RNb2NrLCB0eXBlIENvbnRyYWN0TW9ja1JldmVydEZucyB9IGZyb20gJyNzcmMvdHlwZXMvaW5kZXgnXG5cbmV4cG9ydCBjbGFzcyBNb2NrVml0ZXN0U3RyYXRlZ3kgaW1wbGVtZW50cyBNb2NrU3RyYXRlZ3kge1xuXHRwcm90ZWN0ZWQgX3Jlc3RvcmVNb2NrRm4/OiBDb250cmFjdE1vY2tSZXZlcnRGbnNcblxuXHRjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgX21vY2s/OiBDb250cmFjdE1vY2spIHt9XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0bW9jayhtb2NrUGFyYW1zOiB7IHBhcmFtcz86IGFueVtdIH0gPSB7fSk6IHZvaWQge1xuXHRcdGNvbnN0IHsgcGFyYW1zIH0gPSBtb2NrUGFyYW1zXG5cdFx0dGhpcy5fcmVzdG9yZU1vY2tGbiA9IFtdXG5cdFx0aWYgKHRoaXMuX21vY2spIHtcblx0XHRcdHRoaXMuX3Jlc3RvcmVNb2NrRm4gPSB0aGlzLl9tb2NrKHsgcGFyYW1zIH0pXG5cdFx0fVxuXHR9XG5cblx0cmVzdG9yZSgpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fcmVzdG9yZU1vY2tGbikge1xuXHRcdFx0dGhpcy5fcmVzdG9yZU1vY2tGbi5mb3JFYWNoKChyZikgPT4ge1xuXHRcdFx0XHRyZigpXG5cdFx0XHR9KVxuXHRcdH1cblx0fVxufVxuIl19