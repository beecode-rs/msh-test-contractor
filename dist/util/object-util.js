export const objectUtil = {
    stringifyOrNullUndefined: (param) => {
        if (param == null) {
            return param;
        }
        return JSON.stringify(param, Object.keys(param).sort());
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9vYmplY3QtdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUc7SUFDekIsd0JBQXdCLEVBQUUsQ0FBQyxLQUFVLEVBQU8sRUFBRTtRQUM3QyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNuQixPQUFPLEtBQUssQ0FBQTtRQUNiLENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0NBQ0QsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBvYmplY3RVdGlsID0ge1xuXHRzdHJpbmdpZnlPck51bGxVbmRlZmluZWQ6IChwYXJhbTogYW55KTogYW55ID0+IHtcblx0XHRpZiAocGFyYW0gPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIHBhcmFtXG5cdFx0fVxuXG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHBhcmFtLCBPYmplY3Qua2V5cyhwYXJhbSkuc29ydCgpKVxuXHR9LFxufVxuIl19