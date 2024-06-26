export const typeUtil = {
    isClass: (module) => {
        return typeUtil.isObject(module) && typeUtil.isFunction(module);
    },
    isFunction: (module) => {
        return module instanceof Function;
    },
    isObject: (module) => {
        return module instanceof Object;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS11dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvdHlwZS11dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRztJQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFXLEVBQVcsRUFBRTtRQUNqQyxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNoRSxDQUFDO0lBQ0QsVUFBVSxFQUFFLENBQUMsTUFBVyxFQUFXLEVBQUU7UUFDcEMsT0FBTyxNQUFNLFlBQVksUUFBUSxDQUFBO0lBQ2xDLENBQUM7SUFDRCxRQUFRLEVBQUUsQ0FBQyxNQUFXLEVBQVcsRUFBRTtRQUNsQyxPQUFPLE1BQU0sWUFBWSxNQUFNLENBQUE7SUFDaEMsQ0FBQztDQUNELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgdHlwZVV0aWwgPSB7XG5cdGlzQ2xhc3M6IChtb2R1bGU6IGFueSk6IGJvb2xlYW4gPT4ge1xuXHRcdHJldHVybiB0eXBlVXRpbC5pc09iamVjdChtb2R1bGUpICYmIHR5cGVVdGlsLmlzRnVuY3Rpb24obW9kdWxlKVxuXHR9LFxuXHRpc0Z1bmN0aW9uOiAobW9kdWxlOiBhbnkpOiBib29sZWFuID0+IHtcblx0XHRyZXR1cm4gbW9kdWxlIGluc3RhbmNlb2YgRnVuY3Rpb25cblx0fSxcblx0aXNPYmplY3Q6IChtb2R1bGU6IGFueSk6IGJvb2xlYW4gPT4ge1xuXHRcdHJldHVybiBtb2R1bGUgaW5zdGFuY2VvZiBPYmplY3Rcblx0fSxcbn1cbiJdfQ==