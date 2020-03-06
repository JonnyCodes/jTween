import Easings from "./easings";

export interface TweenOptions {
    repeat: number,
    ease: (percent: number) => number
}

/**
 * Change the given objects properties by the amount in props
 */
export default class delta<T extends any> {

    protected _duration: number;
    protected _elapsedTime: number;
    protected _ease: (percent: number) => number;
    private _repeat: number;
    private _completedLoops: number;
    private _obj: T;
    private _props: any;
    private _startingVals: any;
    private _started: boolean;
    private _onCompletePromise: (value?: unknown) => void;

    constructor(duration: number, obj: T, props: any, options: TweenOptions) {
        this._duration = duration;
        this._ease = options.ease || Easings.Linear;
        this._repeat = options.repeat || 0;
        this._obj = obj;
        this._props = props; // TODO: Deep clone this

        this._completedLoops = 0;
        this._elapsedTime = 0;
        this._started = false;
        this._startingVals = {};
        this._onCompletePromise = () => { };

    }

    get value(): number {
        return this._ease(this._elapsedTime / this._duration);
    }

    get completedLoops(): number {
        return this._completedLoops;
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
                    this._completedLoops++;
                    this._updateProps(this._obj, this._startingVals, this._startingVals);
                    // TODO: onLoop callback
                }
                else {
                    this._elapsedTime = this._duration;
                    this._started = false;
                    this._onCompletePromise();
                }
            }

            this._updateProps(this._obj, this._props, this._startingVals);
        }
    }

    public destroy(): void {
        delete this._duration;
        delete this._ease;
        delete this._repeat;
        delete this._obj;
        delete this._props; // TODO: Deep clone this

        delete this._completedLoops;
        delete this._elapsedTime;
        delete this._started;
        delete this._startingVals;
        delete this._onCompletePromise;
    }

    // Recursive function to update all the properties
    private _updateProps(sourceObj: T, props: any, startingVals: any): void {
        const propKeys = Object.keys(props)
        propKeys.forEach((key: string) => {
            const currProp: number | object = props[key];
            if (this._isObject(currProp)) {
                this._updateProps(sourceObj[key], currProp, startingVals[key]);
            }
            else {
                sourceObj[key] = startingVals[key] + ((currProp as number) * this.value);
            }
        });
    }

    // Recursive function gets the props in propsObj from the sourceObj and puts them in the returnObj
    private _getValuesFromUsingProps(sourceObj: T, propsObj: any, returnObj: any = {}): any {
        const keys = Object.keys(propsObj);

        keys.forEach((key) => {
            if (this._isObject(propsObj[key])) {
                returnObj[key] = {};
                return this._getValuesFromUsingProps(sourceObj[key], propsObj[key], returnObj[key]);
            }
            else if (typeof sourceObj[key] !== "undefined") {
                returnObj[key] = sourceObj[key];
            }
        });

        return returnObj;
    }

    private _isObject(obj: any) {
        return Object.getPrototypeOf(obj) === Object.getPrototypeOf({});
    }
}