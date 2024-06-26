export const contractorService = {
    testDescription: (params) => {
        const { fnName } = params;
        return `${fnName} [contract]`;
    },
    testName: (params) => {
        const { term: { params: termParams, result }, } = params;
        return `input: ${JSON.stringify(termParams)}   output: ${JSON.stringify(result)}`;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3Rvci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyYWN0L2NvbnRyYWN0b3Itc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRztJQUNoQyxlQUFlLEVBQUUsQ0FBQyxNQUEwQixFQUFVLEVBQUU7UUFDdkQsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQTtRQUV6QixPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUE7SUFDOUIsQ0FBQztJQUNELFFBQVEsRUFBRSxDQUFDLE1BQThCLEVBQVUsRUFBRTtRQUNwRCxNQUFNLEVBQ0wsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FDcEMsR0FBRyxNQUFNLENBQUE7UUFFVixPQUFPLFVBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7SUFDbEYsQ0FBQztDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250cmFjdFRlcm0gfSBmcm9tICcjc3JjL3R5cGVzJ1xuXG5leHBvcnQgY29uc3QgY29udHJhY3RvclNlcnZpY2UgPSB7XG5cdHRlc3REZXNjcmlwdGlvbjogKHBhcmFtczogeyBmbk5hbWU6IHN0cmluZyB9KTogc3RyaW5nID0+IHtcblx0XHRjb25zdCB7IGZuTmFtZSB9ID0gcGFyYW1zXG5cblx0XHRyZXR1cm4gYCR7Zm5OYW1lfSBbY29udHJhY3RdYFxuXHR9LFxuXHR0ZXN0TmFtZTogKHBhcmFtczogeyB0ZXJtOiBDb250cmFjdFRlcm0gfSk6IHN0cmluZyA9PiB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0dGVybTogeyBwYXJhbXM6IHRlcm1QYXJhbXMsIHJlc3VsdCB9LFxuXHRcdH0gPSBwYXJhbXNcblxuXHRcdHJldHVybiBgaW5wdXQ6ICR7SlNPTi5zdHJpbmdpZnkodGVybVBhcmFtcyl9ICAgb3V0cHV0OiAke0pTT04uc3RyaW5naWZ5KHJlc3VsdCl9YFxuXHR9LFxufVxuIl19