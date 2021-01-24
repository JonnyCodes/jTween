import { TweenOptions } from "./tweens/tweenOptions";
import delta from "./tweens/delta";
import to from "./tweens/to";
import from from "./tweens/from";
import fromTo from "./tweens/fromTo";
import { DefaultFormat } from "./formats/defaultFormat";

type PickProperties<T, P> = Pick<T, { [K in keyof T]: T[K] extends P ? K : never }[keyof T]>;
type TweenProps<T> = {
    [P in keyof PickProperties<T, number | object>]?: TweenProps<T[P]>;
};

export type Ease = (percent: number) => number;

export default class jTween {

    private _allTweens: Array<delta<any>>;
    private _defaultFormatter: (value: number) => any;

    constructor() {
        this._allTweens = []; // TODO: Is iterating and adding/removing from a linked list faster?
        this._defaultFormatter = DefaultFormat.default;
    }

    set defaultFormatter(formatter: (value: number) => any) {
        this._defaultFormatter = formatter;
    }

    delta<T>(duration: number, targetObj: T, props: TweenProps<T>, options: TweenOptions = {}) {
        const newDelta = new delta(duration, targetObj, props, options);
        newDelta.formatter = this._defaultFormatter;
        this._allTweens.unshift(newDelta);

        return newDelta.start();
    }

    to<T>(duration: number, targetObj: T, props: TweenProps<T>, options: TweenOptions = {}) {
        const newTo = new to(duration, targetObj, props, options);
        newTo.formatter = this._defaultFormatter;
        this._allTweens.unshift(newTo);
        
        return newTo.start();
    }

    from<T>(duration: number, targetObj: T, props: TweenProps<T>, options: TweenOptions = {}) {
        const newFrom = new from(duration, targetObj, props, options);
        newFrom.formatter = this._defaultFormatter;
        this._allTweens.unshift(newFrom);

        return newFrom.start();
    }

    fromTo<T, K extends TweenProps<T>>(duration: number, targetObj: T, fromProps: K, toProps: K, options: TweenOptions = {}) {
        const newFromTo = new fromTo(duration, targetObj, fromProps, toProps, options);
        newFromTo.formatter = this._defaultFormatter;
        this._allTweens.unshift(newFromTo);
        
        return newFromTo.start();
    }

    wait(duration: number) {
        const newWait = new delta(duration, {}, {});
        newWait.formatter = this._defaultFormatter;
        this._allTweens.unshift(newWait);
        return newWait.start();
    }

    update(timeDelta: number) {
        for (let i = this._allTweens.length - 1; i >= 0; i--) {
            const tween = this._allTweens[i];
            tween.update(timeDelta);

            // Remove destroyed tweens
            if (tween.destroyed) {
                this._allTweens.splice(i, 1);
            }
        }
    }
}