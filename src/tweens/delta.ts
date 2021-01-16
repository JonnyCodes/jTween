import { TweenOptions } from "./tweenOptions";
import * as Easings from "../easings";
import Utils from "../utils";
import { DefaultFormat } from "../formatters"
import { TweenProps } from "../jTween";

/**
 * Change the given objects properties by the amount in props
 */
export default class delta<T extends any> {

    protected _obj: T;
    protected _props: TweenProps<T>;
    protected _startingVals: TweenProps<T>;
    protected _formatter: (value: number) => any;

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
    private _autoDestroy: boolean;

    constructor(duration: number, obj: T, props: TweenProps<T>, options: Omit<TweenOptions, "autoStart"> = {}) {
        this._duration = duration;
        this._obj = obj;
        this._props = this._getValuesFromUsingProps(props as any, props);

        this._ease = options.ease || Easings.Linear;
        this._repeat = options.repeat || 0;
        this._onRepeat = options.onRepeat || ((num: number) => { });
        this._onRepeatScope = options.onRepeatScope || this;
        this._autoDestroy = options.autoDestroy || true;

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

    set formatter(formatter: (value: number) => any) {
        this._formatter = formatter;
    }

    public async start(): Promise<void> {
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

                    if (this._autoDestroy) {
                        this.destroy();
                    }

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
    protected _updateProps(sourceObj: T, props: TweenProps<T>, startingVals: TweenProps<T>): void {
        const propKeys = Object.keys(props)
        propKeys.forEach((key: string) => {
            const currProp: number | object = (props as any)[key];
            if (Utils.isObject(currProp)) {
                this._updateProps((sourceObj as any)[key], currProp, (startingVals as any)[key]);
            }
            else {
                (sourceObj as any)[key] = this._formatter((startingVals as any)[key] + ((currProp as number) * this.value));
            }
        });
    }

    // Recursive function gets the props in propsObj from the sourceObj and puts them in the returnObj
    protected _getValuesFromUsingProps(sourceObj: T, propsObj: TweenProps<T>, returnObj: TweenProps<T> = {}): any {
        const keys = Object.keys(propsObj);

        keys.forEach((key) => {
            if (Utils.isObject((propsObj as any)[key])) {
                (returnObj as any)[key] = {};
                return this._getValuesFromUsingProps((sourceObj as any)[key], (propsObj as any)[key], (returnObj as any)[key]);
            }
            else if (!Utils.isUndefined((sourceObj as any)[key])) {
                (returnObj as any)[key] = (sourceObj as any)[key];
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
        delete this.destroy;
        delete this._updateProps;
        delete this._getValuesFromUsingProps;
    }
}