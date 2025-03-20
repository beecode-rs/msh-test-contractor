export const objectUtil = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stringifyOrNullUndefined: (param) => {
        if (param == null) {
            return param;
        }
        return JSON.stringify(param, Object.keys(param).sort());
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9vYmplY3QtdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUc7SUFDekIsOERBQThEO0lBQzlELHdCQUF3QixFQUFFLENBQUMsS0FBVSxFQUFPLEVBQUU7UUFDN0MsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFLENBQUM7WUFDbkIsT0FBTyxLQUFLLENBQUE7UUFDYixDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7SUFDeEQsQ0FBQztDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgb2JqZWN0VXRpbCA9IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0c3RyaW5naWZ5T3JOdWxsVW5kZWZpbmVkOiAocGFyYW06IGFueSk6IGFueSA9PiB7XG5cdFx0aWYgKHBhcmFtID09IG51bGwpIHtcblx0XHRcdHJldHVybiBwYXJhbVxuXHRcdH1cblxuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeShwYXJhbSwgT2JqZWN0LmtleXMocGFyYW0pLnNvcnQoKSlcblx0fSxcbn1cbiJdfQ==