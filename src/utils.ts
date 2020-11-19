export default class Utils {

    static isObject(obj: any): obj is Object {
        return Object.getPrototypeOf(obj) === Object.getPrototypeOf({});
    }

    static isUndefined(obj: any): obj is undefined {
        return typeof obj === typeof undefined;
    }

    static clamp(value: number, min: number = 0, max: number = 1): number {
        return Math.min(Math.max(value, min), max);
    }

}