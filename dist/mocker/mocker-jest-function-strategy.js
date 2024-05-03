import { vi } from 'vitest';
export class MockerJestFunctionStrategy {
    _contract;
    _spy;
    constructor(_contract) {
        this._contract = _contract;
    }
    mockRestore() {
        if (this._spy) {
            this._spy.mockRestore();
        }
    }
    contractSpy() {
        const { module, subjectName } = this._contract;
        this._spy = vi.spyOn(module, subjectName);
        return this._spy;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja2VyLWplc3QtZnVuY3Rpb24tc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9ja2VyL21vY2tlci1qZXN0LWZ1bmN0aW9uLXN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFLM0IsTUFBTSxPQUFPLDBCQUEwQjtJQUdoQjtJQUZaLElBQUksQ0FBd0I7SUFFdEMsWUFBc0IsU0FBc0I7UUFBdEIsY0FBUyxHQUFULFNBQVMsQ0FBYTtJQUFHLENBQUM7SUFFaEQsV0FBVztRQUNWLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUN4QixDQUFDO0lBQ0YsQ0FBQztJQUVELFdBQVc7UUFDVixNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7UUFDOUMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUV6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDakIsQ0FBQztDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdmkgfSBmcm9tICd2aXRlc3QnXG5cbmltcG9ydCB7IE1vY2tlclN0cmF0ZWd5IH0gZnJvbSAnI3NyYy9tb2NrZXIvbW9ja2VyLXN0cmF0ZWd5J1xuaW1wb3J0IHsgQW55Q29udHJhY3QgfSBmcm9tICcjc3JjL3R5cGVzJ1xuXG5leHBvcnQgY2xhc3MgTW9ja2VySmVzdEZ1bmN0aW9uU3RyYXRlZ3kgaW1wbGVtZW50cyBNb2NrZXJTdHJhdGVneTx2aS5TcGllZEZ1bmN0aW9uPGFueT4+IHtcblx0cHJvdGVjdGVkIF9zcHk/OiB2aS5TcGllZEZ1bmN0aW9uPGFueT5cblxuXHRjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2NvbnRyYWN0OiBBbnlDb250cmFjdCkge31cblxuXHRtb2NrUmVzdG9yZSgpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fc3B5KSB7XG5cdFx0XHR0aGlzLl9zcHkubW9ja1Jlc3RvcmUoKVxuXHRcdH1cblx0fVxuXG5cdGNvbnRyYWN0U3B5KCk6IHZpLlNwaWVkRnVuY3Rpb248YW55PiB7XG5cdFx0Y29uc3QgeyBtb2R1bGUsIHN1YmplY3ROYW1lIH0gPSB0aGlzLl9jb250cmFjdFxuXHRcdHRoaXMuX3NweSA9IHZpLnNweU9uKG1vZHVsZSwgc3ViamVjdE5hbWUpXG5cblx0XHRyZXR1cm4gdGhpcy5fc3B5XG5cdH1cbn1cbiJdfQ==