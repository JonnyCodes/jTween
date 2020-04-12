export default class Utils {

    static isObject(obj: any): boolean {
        return Object.getPrototypeOf(obj) === Object.getPrototypeOf({});
    }

}