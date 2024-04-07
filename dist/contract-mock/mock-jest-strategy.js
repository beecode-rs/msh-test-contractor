export class MockJestStrategy {
    _mock;
    _restoreMockFn;
    constructor(_mock) {
        this._mock = _mock;
    }
    mock(mockParams = {}) {
        const { params } = mockParams;
        this._restoreMockFn = this._mock ? this._mock({ params }) : [];
    }
    restore() {
        if (this._restoreMockFn) {
            this._restoreMockFn.forEach((rf) => rf());
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1qZXN0LXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyYWN0LW1vY2svbW9jay1qZXN0LXN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sT0FBTyxnQkFBZ0I7SUFHRztJQUZyQixjQUFjLENBQXdCO0lBRWhELFlBQStCLEtBQW9CO1FBQXBCLFVBQUssR0FBTCxLQUFLLENBQWU7SUFBRyxDQUFDO0lBRXZELElBQUksQ0FBQyxhQUFpQyxFQUFFO1FBQ3ZDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxVQUFVLENBQUE7UUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO0lBQy9ELENBQUM7SUFFRCxPQUFPO1FBQ04sSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDMUMsQ0FBQztJQUNGLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vY2tTdHJhdGVneSB9IGZyb20gJyNzcmMvY29udHJhY3QtbW9jay9tb2NrLXN0cmF0ZWd5J1xuaW1wb3J0IHsgQ29udHJhY3RNb2NrLCBDb250cmFjdE1vY2tSZXZlcnRGbnMgfSBmcm9tICcjc3JjL3R5cGVzJ1xuXG5leHBvcnQgY2xhc3MgTW9ja0plc3RTdHJhdGVneSBpbXBsZW1lbnRzIE1vY2tTdHJhdGVneSB7XG5cdHByb3RlY3RlZCBfcmVzdG9yZU1vY2tGbj86IENvbnRyYWN0TW9ja1JldmVydEZuc1xuXG5cdGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBfbW9jaz86IENvbnRyYWN0TW9jaykge31cblxuXHRtb2NrKG1vY2tQYXJhbXM6IHsgcGFyYW1zPzogYW55W10gfSA9IHt9KTogdm9pZCB7XG5cdFx0Y29uc3QgeyBwYXJhbXMgfSA9IG1vY2tQYXJhbXNcblx0XHR0aGlzLl9yZXN0b3JlTW9ja0ZuID0gdGhpcy5fbW9jayA/IHRoaXMuX21vY2soeyBwYXJhbXMgfSkgOiBbXVxuXHR9XG5cblx0cmVzdG9yZSgpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fcmVzdG9yZU1vY2tGbikge1xuXHRcdFx0dGhpcy5fcmVzdG9yZU1vY2tGbi5mb3JFYWNoKChyZikgPT4gcmYoKSlcblx0XHR9XG5cdH1cbn1cbiJdfQ==