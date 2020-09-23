export default class Utils {

    static isObject(obj: any): obj is Object {
        return Object.getPrototypeOf(obj) === Object.getPrototypeOf({});
    }

    static isUndefined(obj: any): obj is undefined {
        return typeof obj === typeof undefined;
    }

}