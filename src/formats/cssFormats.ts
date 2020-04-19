export class CSSFormats {

    static string(value: number): string {
        return value.toString();
    }

    static percent(value: number): string {
        return value + "%";
    }

    static pixels(value: number): string {
        return value + "px";
    }
}