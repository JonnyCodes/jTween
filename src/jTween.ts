import Easings from "./easings";

/**
 * Change the given objects properties by the amount in props
 */
export default class delta<T> {

    protected _duration: number;
    protected _elapsedTime: number;
    protected _ease: (percent: number) => number;
    private _loop: number;
    private _completedLoops: number;
    private _obj: any;
    private _props: Partial<T>;
    private _startingVals: Partial<T>;
    private _started: boolean;
    private _onCompletePromise: (value?: unknown) => void;

    constructor(duration: number, obj: T, props: Partial<T> = {}, loop: number = 0, ease = Easings.Linear) {
        this._duration = duration;
        this._ease = ease;
        this._loop = loop;
        this._obj = obj;
        this._props = props; // TODO: Deep clone this

        this._completedLoops = 0;
        this._elapsedTime = 0;
        this._started = false;
        this._onCompletePromise = () => { };

        this._startingVals = this._getValuesFromUsingProps(this._obj, this._props);
    }

    get value(): number {
        return this._ease(this._elapsedTime / this._duration);
    }

    get completedLoops() {
        return this._completedLoops;
    }

    public async start() {
        return new Promise((resolve) => {
            this._started = true;
            this._onCompletePromise = resolve;
        });
    }

    public update(deltaTime: number): void {
        if (this._started) {
            this._elapsedTime += deltaTime;

            if (this._elapsedTime > this._duration) {
                if (this._loop < 0 || this._loop > 0) {
                    this._elapsedTime = this._elapsedTime % this._duration;
                    this._loop--;
                    this._completedLoops++;
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

    // Recursive function to update all the properties
    private _updateProps(sourceObj: T, props: Partial<T>, startingVals: Partial<T>) {
        const propKeys = Object.keys(props)

        propKeys.forEach((key: string) => {
            const currProp = props[key];
            if (this._isObject(currProp)) {
                this._updateProps(sourceObj[key], currProp, startingVals[key]);
            }
            else {
                sourceObj[key] = startingVals[key] + (currProp * this.value);
            }
        });
    }

    // Recursive function gets all the properties and returns them in a new object
    private _getValuesFromUsingProps(sourceObj: T, propsObj: Partial<T>, returnObj: Partial<T> = {}): Partial<T> {
        const keys = Object.keys(propsObj);

        keys.forEach((key) => {
            if (this._isObject(sourceObj[key])) {
                return this._getValuesFromUsingProps(sourceObj, propsObj, returnObj);
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