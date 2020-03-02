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
    private _propKeys: Array<string>;
    private _startingVals: NumberProp;
    private _started: boolean;
    private _onCompletePromise: (value?: unknown) => void;

    constructor(duration: number, obj: any, props: NumberProp = {}, loop: number = 0, ease = Easings.Linear) {
        this._duration = duration;
        this._ease = ease;
        this._loop = loop;
        this._obj = obj;
        this._props = props;
        this._propKeys = Object.keys(props);
        this._startingVals = {};
        this._elapsedTime = 0;
        this._started = false;
        this._onCompletePromise = () => { };

        this._propKeys.forEach((key) => {
            this._startingVals[key] = this._obj[key];
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
        this._propKeys.forEach((key) => {
            this._obj[key] = this._startingVals[key] + (this._props[key] * this.value);
        });
    }
}