import TweenOptions from "./iTweenOptions";
import * as Easings from "../easings";
import Utils from "../utils";
import { DefaultFormat } from "../formatters"

/**
 * Change the given objects properties by the amount in props
 */
export default class delta<T extends any> {

    protected _obj: T;
    protected _props: any;
    protected _startingVals: any;

    private _duration: number;
    private _elapsedTime: number;
    private _ease: (percent: number) => number;
    private _repeat: number;
    private _numRepeats: number;
    private _started: boolean;
    private _destroyed: boolean;
    private _onCompletePromise: () => void;
    private _onRepeat: (repeatNum: number) => void;
    private _onRepeatScope: any;
    private _formatter: (value: number) => any;

    constructor(duration: number, obj: T, props: any, options: TweenOptions) {
        this._duration = duration;
        this._obj = obj;
        this._props = this._getValuesFromUsingProps(props, props);

        this._ease = options.ease || Easings.Linear();
        this._repeat = options.repeat || 0;
        this._onRepeat = options.onRepeat || ((num: number) => { });
        this._onRepeatScope = options.onRepeatScope || this;

        this._numRepeats = 0;
        this._elapsedTime = 0;
        this._started = false;
        this._startingVals = {};
        this._destroyed = false;
        this._onCompletePromise = () => { };

        this._formatter = DefaultFormat.default;
    }

    get value(): number {
        return this._ease(this._elapsedTime / this._duration);
    }

    get completedLoops(): number {
        return this._numRepeats;
    }

    get destroyed(): boolean {
        return this._destroyed;
    }

    set format(formatter: (value: number) => any) {
        this._formatter = formatter;
    }

    public async start() {
        this._startingVals = this._getValuesFromUsingProps(this._obj, this._props);

        return new Promise((resolve) => {
            this._started = true;
            this._onCompletePromise = resolve;
        });
    }

    public update(deltaTime: number): void {
        if (this._started) {
            this._elapsedTime += deltaTime;

            if (this._elapsedTime > this._duration) {
                if (this._repeat < 0 || this._repeat > 0) {
                    this._elapsedTime = this._elapsedTime % this._duration;
                    this._repeat--;
                    this._numRepeats++;
                    this._onRepeat.call(this._onRepeatScope, this._numRepeats)
                }
                else {
                    this._elapsedTime = this._duration;
                    this._started = false;
                    this._onCompletePromise();
                }
            }

            this._updateProps(this._obj, this._props, this._startingVals);
        }

        if (this._destroyed) {
            this._destroy();
        }
    }

    public destroy(): void {
        this._destroyed = true;
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
                sourceObj[key] = this._formatter(startingVals[key] + ((currProp as number) * this.value));
            }
        });
    }

    // Recursive function gets the props in propsObj from the sourceObj and puts them in the returnObj
    protected _getValuesFromUsingProps(sourceObj: T, propsObj: any, returnObj: any = {}): any {
        const keys = Object.keys(propsObj);

        keys.forEach((key) => {
            if (Utils.isObject(propsObj[key])) {
                returnObj[key] = {};
                return this._getValuesFromUsingProps(sourceObj[key], (propsObj[key] as object), returnObj[key]);
            }
            else if (typeof sourceObj[key] !== "undefined") {
                returnObj[key] = sourceObj[key];
            }
        });

        return returnObj;
    }

    protected _destroy(): void {
        delete this._duration;
        delete this._ease;
        delete this._repeat;
        delete this._obj;
        delete this._props;

        delete this._numRepeats;
        delete this._elapsedTime;
        delete this._started;
        delete this._startingVals;
        delete this._destroyed;
        delete this._onCompletePromise;
        delete this._onRepeat;
        delete this._onRepeatScope;

        delete this.start;
        delete this.update;
        delete this._updateProps;
        delete this._getValuesFromUsingProps;
    }
}