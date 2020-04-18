import TweenOptions from "./tweens/iTweenOptions";
import delta from "./tweens/delta";
import to from "./tweens/to";
import from from "./tweens/from";
import { fromTo } from "./tweens/fromTo";

export default class jTween {

    private _allTweens: Array<delta<any>>;

    constructor() {
        this._allTweens = []; // TODO: Is iterating and adding/removing from a linked list faster?
    }

    delta<T>(duration: number, targetObj: T, props: any = {}, options: TweenOptions): delta<T> {
        const newDelta = new delta(duration, targetObj, props, options);
        this._allTweens.unshift(newDelta);
        return newDelta;
    }

    to<T>(duration: number, targetObj: T, props: any = {}, options: TweenOptions) {
        const newTo = new to(duration, targetObj, props, options);
        this._allTweens.unshift(newTo);
        return newTo;
    }

    from<T>(duration: number, targetObj: T, props: any = {}, options: TweenOptions) {
        const newFrom = new from(duration, targetObj, props, options);
        this._allTweens.unshift(newFrom);
        return newFrom;
    }

    fromTo<T>(duration: number, targetObj: T, fromProps: any = {}, toProps: any = {}, options: TweenOptions) {
        const newFromTo = new fromTo(duration, targetObj, fromProps, toProps, options);
        this._allTweens.unshift(newFromTo);
        return newFromTo;
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