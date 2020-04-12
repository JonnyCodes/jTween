import TweenOptions from "./iTweenOptions";
import delta from "./delta";
import Utils from "../utils";

export default class from<T extends any> extends delta<T> {

    constructor(duration: number, obj: T, props: any, options: TweenOptions) {
        super(duration, obj, props, options);
    }

    public async start() {
        super.start();
        
        this._startingVals = this._getValuesFromUsingProps(this._props, this._props);
        this._props = this._getValuesFromUsingProps(this._obj, this._props);
    }

    // Recursive function to update all the properties
    protected _updateProps(sourceObj: T, props: any, startingVals: any): void {
        const propKeys = Object.keys(props)
        propKeys.forEach((key: string) => {
            const currProp: number | object = props[key];
            if (Utils.isObject(currProp)) {
                this._updateProps(sourceObj[key], currProp, startingVals[key]);
            }
            else {
                sourceObj[key] = startingVals[key] + (((currProp as number) - startingVals[key]) * this.value);
            }
        });
    }
}