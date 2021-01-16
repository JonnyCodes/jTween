import { TweenProps } from "../jTween";
import from from "./from";
import { TweenOptions } from "./tweenOptions";

export default class fromTo<T extends any, K extends TweenProps<T>> extends from<T> {
    
    private _toProps: any;

    constructor(duration: number, obj: T, fromProps: K, toProps: K, options: TweenOptions = {}) {
        super(duration, obj, fromProps, options);

        this._toProps = this._getValuesFromUsingProps(toProps as any, toProps);
    }

    public async start() {
        super.start();

        this._props = this._getValuesFromUsingProps(this._obj, this._toProps);
    }

    protected _destroy(): void {
        super.destroy();

        delete this._toProps;
    }
}