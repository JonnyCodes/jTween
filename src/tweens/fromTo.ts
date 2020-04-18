import from from "./from";
import TweenOptions from "./iTweenOptions";

export class fromTo<T extends any> extends from<T> {
    
    private _toProps: any;

    constructor(duration: number, obj: T, fromProps: any, toProps: any, options: TweenOptions) {
        super(duration, obj, fromProps, options);

        this._toProps = this._getValuesFromUsingProps(toProps, toProps);
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