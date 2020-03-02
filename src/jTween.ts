import Easings from "./easings";

interface NumberProp {
    [label: string]: number;
}

/**
 * Change the given objects properties by the amount in props
 */
export default class delta {

    protected _duration: number;
    protected _elapsedTime: number;
    protected _ease: (percent: number) => number;
    private _loop: number;
    private _obj: any;
    private _props: NumberProp;
    private _propPaths: Array<string>;
    private _startingVals: NumberProp;
    private _started: boolean;
    private _onCompletePromise: (value?: unknown) => void;

    constructor(duration: number, obj: any, props: NumberProp = {}, loop: number = 0, ease = Easings.Linear) {
        this._duration = duration;
        this._ease = ease;
        this._loop = loop;
        this._obj = obj;
        this._props = props;
        this._propPaths = [];
        this._startingVals = {};
        this._elapsedTime = 0;
        this._started = false;
        this._onCompletePromise = () => { };

        // Turns the props object into dot seperated paths
        this._genPropPaths(this._propPaths, props);

        this._propPaths.forEach((path) => {
            this._startingVals[path] = path.split('.').reduce((obj: any, key: string) => obj[key], this._obj);
        });
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

    private _updateProps() {
        this._propPaths.forEach((path) => {
            const splitPath = path.split(".");
            const basePathArr = splitPath.slice(0, splitPath.length - 1);
            const finalPath = splitPath[splitPath.length - 1];

            // TODO: This is very ugly, clean it up!! Is there a better way than dot seperated paths?
            basePathArr.reduce((obj: any, key: string) => obj[key], this._obj)[finalPath] = this._startingVals[path] + (basePathArr.reduce((prop: any, key: string) => prop[key], this._props)[finalPath] * this.value);
        });
    }

    private _genPropPaths(arr: Array<string>, obj: any, path = "") {
        const keys = Object.keys(obj);

        keys.forEach((key) => {
            const currPath = path + (path.length ? `.${key}` : key);
            if (Object.getPrototypeOf(obj[key]) === Object.getPrototypeOf({})) {
                this._genPropPaths(arr, obj[key], `${currPath}`);
            }
            else {
                arr.push(currPath);
            }
        });
    }
}