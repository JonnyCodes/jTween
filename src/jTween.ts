import Easings from "./easings";

/**
 * Change the given objects properties by the amount in props
 */
export default class delta<T> {

    protected _duration: number;
    protected _elapsedTime: number;
    protected _ease: (percent: number) => number;
    private _loop: number;
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
        this._props = props;
        this._startingVals = {};
        this._elapsedTime = 0;
        this._started = false;
        this._onCompletePromise = () => { };

        this._startingVals = this._getValuesFromUsingProps(this._obj, this._props);
    }

    get value(): number {
        return this._ease(this._elapsedTime / this._duration);
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
                    // TODO: onLoop callback
                }
                else {
                    this._elapsedTime = this._duration;
                    this._started = false;
                    this._onCompletePromise();
                }
            }

            this._updateProps();
        }
    }

    // TODO: REFACTOR!!!!
    private _updateProps() {
        this._propPaths.forEach((path: string) => {
            const splitPath = path.split(".");
            const basePathArr = splitPath.slice(0, splitPath.length - 1);
            const finalPath = splitPath[splitPath.length - 1];

            // TODO: This is very ugly, clean it up!! Is there a better way than dot seperated paths?
            basePathArr.reduce((obj: any, key: string) => obj[key], this._obj)[finalPath] = this._startingVals[path] + (basePathArr.reduce((prop: any, key: string) => prop[key], this._props)[finalPath] * this.value);
        });
    }

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