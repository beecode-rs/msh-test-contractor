import deepEqual from 'fast-deep-equal/es6';
import { JestSpyFunctionStrategy } from '#src/jest-spy/jest-spy-function-strategy';
export class JestSpyClassFunctionStrategy {
    _terms;
    _mockClassParams;
    _name;
    constructor(params) {
        const { terms, mockClassParams, name } = params;
        this._terms = terms;
        this._mockClassParams = mockClassParams;
        this._name = name;
    }
    mockImplementationFactory() {
        return (...mockParams) => {
            const termByConstructorParams = this._terms.filter((term) => deepEqual(term.constructorParams, this._mockClassParams));
            const jestSpy = new JestSpyFunctionStrategy({ name: this._name, terms: termByConstructorParams });
            return jestSpy.mockImplementationFactory()(...mockParams);
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamVzdC1zcHktY2xhc3MtZnVuY3Rpb24tc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvamVzdC1zcHkvamVzdC1zcHktY2xhc3MtZnVuY3Rpb24tc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLE1BQU0scUJBQXFCLENBQUE7QUFFM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMENBQTBDLENBQUE7QUFJbEYsTUFBTSxPQUFPLDRCQUE0QjtJQUNyQixNQUFNLENBQWdCO0lBQ3RCLGdCQUFnQixDQUFPO0lBQ3ZCLEtBQUssQ0FBUTtJQUVoQyxZQUFZLE1BQXVFO1FBQ2xGLE1BQU0sRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUNuQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO0lBQ2xCLENBQUM7SUFFRCx5QkFBeUI7UUFDeEIsT0FBTyxDQUFDLEdBQUcsVUFBaUIsRUFBTyxFQUFFO1lBQ3BDLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQTtZQUV0SCxNQUFNLE9BQU8sR0FBRyxJQUFJLHVCQUF1QixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQTtZQUVqRyxPQUFPLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUE7UUFDMUQsQ0FBQyxDQUFBO0lBQ0YsQ0FBQztDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRlZXBFcXVhbCBmcm9tICdmYXN0LWRlZXAtZXF1YWwvZXM2J1xuXG5pbXBvcnQgeyBKZXN0U3B5RnVuY3Rpb25TdHJhdGVneSB9IGZyb20gJyNzcmMvamVzdC1zcHkvamVzdC1zcHktZnVuY3Rpb24tc3RyYXRlZ3knXG5pbXBvcnQgeyBKZXN0U3B5U3RyYXRlZ3kgfSBmcm9tICcjc3JjL2plc3Qtc3B5L2plc3Qtc3B5LXN0cmF0ZWd5J1xuaW1wb3J0IHsgQ29udHJhY3RUZXJtIH0gZnJvbSAnI3NyYy90eXBlcydcblxuZXhwb3J0IGNsYXNzIEplc3RTcHlDbGFzc0Z1bmN0aW9uU3RyYXRlZ3kgaW1wbGVtZW50cyBKZXN0U3B5U3RyYXRlZ3kge1xuXHRwcm90ZWN0ZWQgcmVhZG9ubHkgX3Rlcm1zOiBDb250cmFjdFRlcm1bXVxuXHRwcm90ZWN0ZWQgcmVhZG9ubHkgX21vY2tDbGFzc1BhcmFtczogYW55W11cblx0cHJvdGVjdGVkIHJlYWRvbmx5IF9uYW1lOiBzdHJpbmdcblxuXHRjb25zdHJ1Y3RvcihwYXJhbXM6IHsgdGVybXM6IENvbnRyYWN0VGVybVtdOyBtb2NrQ2xhc3NQYXJhbXM6IGFueVtdOyBuYW1lOiBzdHJpbmcgfSkge1xuXHRcdGNvbnN0IHsgdGVybXMsIG1vY2tDbGFzc1BhcmFtcywgbmFtZSB9ID0gcGFyYW1zXG5cdFx0dGhpcy5fdGVybXMgPSB0ZXJtc1xuXHRcdHRoaXMuX21vY2tDbGFzc1BhcmFtcyA9IG1vY2tDbGFzc1BhcmFtc1xuXHRcdHRoaXMuX25hbWUgPSBuYW1lXG5cdH1cblxuXHRtb2NrSW1wbGVtZW50YXRpb25GYWN0b3J5KCk6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55IHtcblx0XHRyZXR1cm4gKC4uLm1vY2tQYXJhbXM6IGFueVtdKTogYW55ID0+IHtcblx0XHRcdGNvbnN0IHRlcm1CeUNvbnN0cnVjdG9yUGFyYW1zID0gdGhpcy5fdGVybXMuZmlsdGVyKCh0ZXJtKSA9PiBkZWVwRXF1YWwodGVybS5jb25zdHJ1Y3RvclBhcmFtcywgdGhpcy5fbW9ja0NsYXNzUGFyYW1zKSlcblxuXHRcdFx0Y29uc3QgamVzdFNweSA9IG5ldyBKZXN0U3B5RnVuY3Rpb25TdHJhdGVneSh7IG5hbWU6IHRoaXMuX25hbWUsIHRlcm1zOiB0ZXJtQnlDb25zdHJ1Y3RvclBhcmFtcyB9KVxuXG5cdFx0XHRyZXR1cm4gamVzdFNweS5tb2NrSW1wbGVtZW50YXRpb25GYWN0b3J5KCkoLi4ubW9ja1BhcmFtcylcblx0XHR9XG5cdH1cbn1cbiJdfQ==