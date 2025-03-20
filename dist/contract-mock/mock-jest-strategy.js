export class MockJestStrategy {
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
            this._restoreMockFn.forEach((rf) => rf());
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1qZXN0LXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyYWN0LW1vY2svbW9jay1qZXN0LXN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sT0FBTyxnQkFBZ0I7SUFHRztJQUZyQixjQUFjLENBQXdCO0lBRWhELFlBQStCLEtBQW9CO1FBQXBCLFVBQUssR0FBTCxLQUFLLENBQWU7SUFBRyxDQUFDO0lBRXZELDhEQUE4RDtJQUM5RCxJQUFJLENBQUMsYUFBaUMsRUFBRTtRQUN2QyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsVUFBVSxDQUFBO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFBO1FBQ3hCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7UUFDN0MsQ0FBQztJQUNGLENBQUM7SUFFRCxPQUFPO1FBQ04sSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDMUMsQ0FBQztJQUNGLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHR5cGUgTW9ja1N0cmF0ZWd5IH0gZnJvbSAnI3NyYy9jb250cmFjdC1tb2NrL21vY2stc3RyYXRlZ3knXG5pbXBvcnQgeyB0eXBlIENvbnRyYWN0TW9jaywgdHlwZSBDb250cmFjdE1vY2tSZXZlcnRGbnMgfSBmcm9tICcjc3JjL3R5cGVzL2luZGV4J1xuXG5leHBvcnQgY2xhc3MgTW9ja0plc3RTdHJhdGVneSBpbXBsZW1lbnRzIE1vY2tTdHJhdGVneSB7XG5cdHByb3RlY3RlZCBfcmVzdG9yZU1vY2tGbj86IENvbnRyYWN0TW9ja1JldmVydEZuc1xuXG5cdGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBfbW9jaz86IENvbnRyYWN0TW9jaykge31cblxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRtb2NrKG1vY2tQYXJhbXM6IHsgcGFyYW1zPzogYW55W10gfSA9IHt9KTogdm9pZCB7XG5cdFx0Y29uc3QgeyBwYXJhbXMgfSA9IG1vY2tQYXJhbXNcblx0XHR0aGlzLl9yZXN0b3JlTW9ja0ZuID0gW11cblx0XHRpZiAodGhpcy5fbW9jaykge1xuXHRcdFx0dGhpcy5fcmVzdG9yZU1vY2tGbiA9IHRoaXMuX21vY2soeyBwYXJhbXMgfSlcblx0XHR9XG5cdH1cblxuXHRyZXN0b3JlKCk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9yZXN0b3JlTW9ja0ZuKSB7XG5cdFx0XHR0aGlzLl9yZXN0b3JlTW9ja0ZuLmZvckVhY2goKHJmKSA9PiByZigpKVxuXHRcdH1cblx0fVxufVxuIl19