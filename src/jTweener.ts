import Easings from "./easings";
import delta, { TweenOptions } from "./jTween";

export default class jTweener {

    private _allTweens: Array<delta<any>>;

    // TODO: Can any of this work be offloaded to a webworker?
    constructor() {
        this._allTweens = [];
    }

    delta<T>(duration: number, targetObj: T, props: any = {}, options: TweenOptions): delta<T> {
        const newDelta = new delta(duration, targetObj, props, options);
        this._allTweens.push(newDelta);
        return newDelta;
    }

    update(timeDelta: number) {
        this._allTweens.forEach(tween => {
            tween.update(timeDelta);
        });
    }
}