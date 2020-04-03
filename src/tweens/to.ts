import TweenOptions from "./iTweenOptions";
import delta from "./delta";

export default class to<T extends any> extends delta<T> {

    constructor(duration: number, obj: T, props: any, options: TweenOptions) {
        super(duration, obj, props, options);
    }

    // Recursive function to update all the properties
    protected _updateProps(sourceObj: T, props: any, startingVals: any): void {
        const propKeys = Object.keys(props)
        propKeys.forEach((key: string) => {
            const currProp: number | object = props[key];
            if (this._isObject(currProp)) {
                this._updateProps(sourceObj[key], currProp, startingVals[key]);
            }
            else {
                sourceObj[key] = startingVals[key] + (((currProp as number) - startingVals[key]) * this.value);
            }
        });
    }
}