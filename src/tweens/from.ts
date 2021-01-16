import { TweenOptions } from "./tweenOptions";
import delta from "./delta";
import Utils from "../utils";
import { TweenProps } from "../jTween";

export default class from<T extends any> extends delta<T> {

    constructor(duration: number, obj: T, props: TweenProps<T>, options: TweenOptions = {}) {
        super(duration, obj, props, options);
    }

    public async start() {
        super.start();
        
        this._startingVals = this._getValuesFromUsingProps(this._props as any, this._props);
        this._props = this._getValuesFromUsingProps(this._obj, this._props);
    }

    // Recursive function to update all the properties
    protected _updateProps(sourceObj: T, props: TweenProps<T>, startingVals: TweenProps<T>): void {
        const propKeys = Object.keys(props)
        propKeys.forEach((key: string) => {
            const currProp: number | object = (props as any)[key];
            if (Utils.isObject(currProp)) {
                this._updateProps((sourceObj as any)[key], currProp as any, (startingVals as any)[key]);
            }
            else {
                (sourceObj as any)[key] = this._formatter((startingVals as any)[key] + ((currProp - (startingVals as any)[key]) * this.value));
            }
        });
    }
}