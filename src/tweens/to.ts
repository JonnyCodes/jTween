import { TweenOptions } from "./tweenOptions";
import delta from "./delta";
import Utils from "../utils";

export default class to<T extends any> extends delta<T> {

    constructor(duration: number, obj: T, props: any, options: TweenOptions) {
        super(duration, obj, props, options);
    }

    // Recursive function to update all the properties
    protected _updateProps(sourceObj: T, props: any, startingVals: any): void {
        const propKeys = Object.keys(props)
        propKeys.forEach((key: string) => {
            const currProp: number | object = props[key];
            if (Utils.isObject(currProp)) {
                this._updateProps((sourceObj as any)[key], currProp, startingVals[key]);
            }
            else {
                (sourceObj as any)[key] = this._formatter(startingVals[key] + ((currProp - startingVals[key]) * this.value));
            }
        });
    }
}