import { TweenOptions } from "./tweenOptions";
import delta from "./delta";
import Utils from "../utils";
import { TweenProps } from "../jTween";

export default class to<T extends any> extends delta<T> {

    constructor(duration: number, obj: T, props: TweenProps<T>, options: TweenOptions = {}) {
        super(duration, obj, props, options);
    }

    // Recursive function to update all the properties
    protected _updateProps(sourceObj: T, props: TweenProps<T>, startingVals: TweenProps<T>): void {
        const propKeys = Object.keys(props)
        propKeys.forEach((key: string) => {
            const currProp: number | object = (props as any)[key];
            if (Utils.isObject(currProp)) {
                this._updateProps((sourceObj as any)[key], currProp, (startingVals as any)[key]);
            }
            else {
                (sourceObj as any)[key] = this._formatter((startingVals as any)[key] + ((currProp - (startingVals as any)[key]) * this.value));
            }
        });
    }
}