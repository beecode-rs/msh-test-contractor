import { jest } from '@jest/globals';
import { objectUtil } from '../util/object-util.js';
export class JestSpyFunctionStrategy {
    _terms;
    _name;
    constructor(params) {
        const { terms, name } = params;
        this._terms = terms;
        this._name = name;
    }
    mockImplementationFactory() {
        const fakeImplementation = (...mockParams) => {
            const foundTerm = this._terms.find((term) => objectUtil.stringifyOrNullUndefined(term.params) === objectUtil.stringifyOrNullUndefined(mockParams));
            if (!foundTerm) {
                throw new Error(`Unknown contract ${this._name} for params ${JSON.stringify(mockParams)}`);
            }
            return foundTerm.result;
        };
        return jest.fn().mockImplementation(fakeImplementation);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamVzdC1zcHktZnVuY3Rpb24tc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvamVzdC1zcHkvamVzdC1zcHktZnVuY3Rpb24tc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQTtBQUlwQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUE7QUFFbEQsTUFBTSxPQUFPLHVCQUF1QjtJQUNoQixNQUFNLENBQWdCO0lBQ3RCLEtBQUssQ0FBUTtJQUVoQyxZQUFZLE1BQStDO1FBQzFELE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO0lBQ2xCLENBQUM7SUFFRCx5QkFBeUI7UUFDeEIsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEdBQUcsVUFBaUIsRUFBTyxFQUFFO1lBQ3hELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNqQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxVQUFVLENBQUMsd0JBQXdCLENBQUMsVUFBVSxDQUFDLENBQzlHLENBQUE7WUFDRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLElBQUksQ0FBQyxLQUFLLGVBQWUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDM0YsQ0FBQztZQUVELE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQTtRQUN4QixDQUFDLENBQUE7UUFFRCxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQ3hELENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGplc3QgfSBmcm9tICdAamVzdC9nbG9iYWxzJ1xuXG5pbXBvcnQgeyBKZXN0U3B5U3RyYXRlZ3kgfSBmcm9tICcjc3JjL2plc3Qtc3B5L2plc3Qtc3B5LXN0cmF0ZWd5J1xuaW1wb3J0IHsgQ29udHJhY3RUZXJtIH0gZnJvbSAnI3NyYy90eXBlcydcbmltcG9ydCB7IG9iamVjdFV0aWwgfSBmcm9tICcjc3JjL3V0aWwvb2JqZWN0LXV0aWwnXG5cbmV4cG9ydCBjbGFzcyBKZXN0U3B5RnVuY3Rpb25TdHJhdGVneSBpbXBsZW1lbnRzIEplc3RTcHlTdHJhdGVneSB7XG5cdHByb3RlY3RlZCByZWFkb25seSBfdGVybXM6IENvbnRyYWN0VGVybVtdXG5cdHByb3RlY3RlZCByZWFkb25seSBfbmFtZTogc3RyaW5nXG5cblx0Y29uc3RydWN0b3IocGFyYW1zOiB7IHRlcm1zOiBDb250cmFjdFRlcm1bXTsgbmFtZTogc3RyaW5nIH0pIHtcblx0XHRjb25zdCB7IHRlcm1zLCBuYW1lIH0gPSBwYXJhbXNcblx0XHR0aGlzLl90ZXJtcyA9IHRlcm1zXG5cdFx0dGhpcy5fbmFtZSA9IG5hbWVcblx0fVxuXG5cdG1vY2tJbXBsZW1lbnRhdGlvbkZhY3RvcnkoKTogamVzdC5Nb2NrPGFueT4ge1xuXHRcdGNvbnN0IGZha2VJbXBsZW1lbnRhdGlvbiA9ICguLi5tb2NrUGFyYW1zOiBhbnlbXSk6IGFueSA9PiB7XG5cdFx0XHRjb25zdCBmb3VuZFRlcm0gPSB0aGlzLl90ZXJtcy5maW5kKFxuXHRcdFx0XHQodGVybSkgPT4gb2JqZWN0VXRpbC5zdHJpbmdpZnlPck51bGxVbmRlZmluZWQodGVybS5wYXJhbXMpID09PSBvYmplY3RVdGlsLnN0cmluZ2lmeU9yTnVsbFVuZGVmaW5lZChtb2NrUGFyYW1zKVxuXHRcdFx0KVxuXHRcdFx0aWYgKCFmb3VuZFRlcm0pIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGNvbnRyYWN0ICR7dGhpcy5fbmFtZX0gZm9yIHBhcmFtcyAke0pTT04uc3RyaW5naWZ5KG1vY2tQYXJhbXMpfWApXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmb3VuZFRlcm0ucmVzdWx0XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGplc3QuZm4oKS5tb2NrSW1wbGVtZW50YXRpb24oZmFrZUltcGxlbWVudGF0aW9uKVxuXHR9XG59XG4iXX0=