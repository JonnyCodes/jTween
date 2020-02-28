import Easings from "./easings";

export module jTween {

    interface NumberProp {
        [label: string]: number;
    }

    class BaseTween {
        protected _duration: number;
        protected _elapsedTime: number;
        protected _ease: (percent: number) => number;

        constructor(duration: number, ease = Easings.Linear) {
            this._duration = duration;
            this._elapsedTime = 0;
            this._ease = ease;
        }

        public update(deltaTime: number): void {
            this._elapsedTime += deltaTime;
        }

        protected get value(): number {
            return this._ease(this._elapsedTime / this._duration);
        }
    }

    /**
     * Change the given objects properties by the amount in props
     */
    export class delta extends BaseTween {

        private _obj: any;
        private _props: NumberProp;
        private _propKeys: Array<string>;
        private _startingVals: NumberProp;

        constructor(duration: number, obj: any, props: NumberProp = {}, ease = Easings.Linear) {
            super(duration, ease);

            this._obj = obj;
            this._props = props;
            this._propKeys = Object.keys(props);
            this._startingVals = {};

            this._propKeys.forEach((key) => {
                this._startingVals[key] = this._obj[key];
            });
        }

        // TODO: Missing the last update!!
        public update(deltaTime: number): void {
            super.update(deltaTime);

            if (this._elapsedTime > this._duration) {
                this._elapsedTime = this._duration;
            }

            this.updateProps();
        }

        private updateProps() {
            this._propKeys.forEach((key) => {
                this._obj[key] = this._startingVals[key] + (this._props[key] * this.value);
            });
        }
    }
}