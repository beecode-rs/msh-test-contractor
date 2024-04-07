export class SubjectClassFunctionStrategy {
    _module;
    _subjectName;
    _constructorParams;
    _fnName;
    constructor(params) {
        const { subjectFromContract: { module, subjectName }, constructorParams, fnName, } = params;
        this._module = module;
        if (!subjectName) {
            throw new Error('Subject name must be specified for class functions strategy');
        }
        this._subjectName = subjectName;
        this._constructorParams = constructorParams;
        this._fnName = fnName;
    }
    exec(term) {
        const obj = new (this.fn())(...this._constructorParams);
        if (this._isGetter()) {
            return obj[this._fnName];
        }
        return obj[this._fnName](...term.params);
    }
    fn() {
        return this._module[this._subjectName];
    }
    _isGetter() {
        return !!Object.getOwnPropertyDescriptor(this._module[this._subjectName].prototype, this._fnName)?.get;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViamVjdC1jbGFzcy1mdW5jdGlvbi1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdWJqZWN0L3N1YmplY3QtY2xhc3MtZnVuY3Rpb24tc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxPQUFPLDRCQUE0QjtJQUNyQixPQUFPLENBQUs7SUFDWixZQUFZLENBQVE7SUFDcEIsa0JBQWtCLENBQU87SUFDekIsT0FBTyxDQUFRO0lBRWxDLFlBQVksTUFBOEY7UUFDekcsTUFBTSxFQUNMLG1CQUFtQixFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUM1QyxpQkFBaUIsRUFDakIsTUFBTSxHQUNOLEdBQUcsTUFBTSxDQUFBO1FBQ1YsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7UUFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkRBQTZELENBQUMsQ0FBQTtRQUMvRSxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUE7UUFDL0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixDQUFBO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBO0lBQ3RCLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBa0I7UUFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDdkQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztZQUN0QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDekIsQ0FBQztRQUVELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBRUQsRUFBRTtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUVTLFNBQVM7UUFDbEIsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFBO0lBQ3ZHLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3RGcm9tQ29udHJhY3QsIFN1YmplY3RTdHJhdGVneSB9IGZyb20gJyNzcmMvc3ViamVjdC9zdWJqZWN0LXN0cmF0ZWd5J1xuaW1wb3J0IHsgQ29udHJhY3RUZXJtIH0gZnJvbSAnI3NyYy90eXBlcydcblxuZXhwb3J0IGNsYXNzIFN1YmplY3RDbGFzc0Z1bmN0aW9uU3RyYXRlZ3kgaW1wbGVtZW50cyBTdWJqZWN0U3RyYXRlZ3kge1xuXHRwcm90ZWN0ZWQgcmVhZG9ubHkgX21vZHVsZTogYW55XG5cdHByb3RlY3RlZCByZWFkb25seSBfc3ViamVjdE5hbWU6IHN0cmluZ1xuXHRwcm90ZWN0ZWQgcmVhZG9ubHkgX2NvbnN0cnVjdG9yUGFyYW1zOiBhbnlbXVxuXHRwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZuTmFtZTogc3RyaW5nXG5cblx0Y29uc3RydWN0b3IocGFyYW1zOiB7IHN1YmplY3RGcm9tQ29udHJhY3Q6IFN1YmplY3RGcm9tQ29udHJhY3Q7IGNvbnN0cnVjdG9yUGFyYW1zOiBhbnlbXTsgZm5OYW1lOiBzdHJpbmcgfSkge1xuXHRcdGNvbnN0IHtcblx0XHRcdHN1YmplY3RGcm9tQ29udHJhY3Q6IHsgbW9kdWxlLCBzdWJqZWN0TmFtZSB9LFxuXHRcdFx0Y29uc3RydWN0b3JQYXJhbXMsXG5cdFx0XHRmbk5hbWUsXG5cdFx0fSA9IHBhcmFtc1xuXHRcdHRoaXMuX21vZHVsZSA9IG1vZHVsZVxuXHRcdGlmICghc3ViamVjdE5hbWUpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignU3ViamVjdCBuYW1lIG11c3QgYmUgc3BlY2lmaWVkIGZvciBjbGFzcyBmdW5jdGlvbnMgc3RyYXRlZ3knKVxuXHRcdH1cblx0XHR0aGlzLl9zdWJqZWN0TmFtZSA9IHN1YmplY3ROYW1lXG5cdFx0dGhpcy5fY29uc3RydWN0b3JQYXJhbXMgPSBjb25zdHJ1Y3RvclBhcmFtc1xuXHRcdHRoaXMuX2ZuTmFtZSA9IGZuTmFtZVxuXHR9XG5cblx0ZXhlYyh0ZXJtOiBDb250cmFjdFRlcm0pOiBhbnkge1xuXHRcdGNvbnN0IG9iaiA9IG5ldyAodGhpcy5mbigpKSguLi50aGlzLl9jb25zdHJ1Y3RvclBhcmFtcylcblx0XHRpZiAodGhpcy5faXNHZXR0ZXIoKSkge1xuXHRcdFx0cmV0dXJuIG9ialt0aGlzLl9mbk5hbWVdXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9ialt0aGlzLl9mbk5hbWVdKC4uLnRlcm0ucGFyYW1zKVxuXHR9XG5cblx0Zm4oKTogYW55IHtcblx0XHRyZXR1cm4gdGhpcy5fbW9kdWxlW3RoaXMuX3N1YmplY3ROYW1lXVxuXHR9XG5cblx0cHJvdGVjdGVkIF9pc0dldHRlcigpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gISFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMuX21vZHVsZVt0aGlzLl9zdWJqZWN0TmFtZV0ucHJvdG90eXBlLCB0aGlzLl9mbk5hbWUpPy5nZXRcblx0fVxufVxuIl19