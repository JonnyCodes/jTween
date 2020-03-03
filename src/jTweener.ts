import Easings from "./easings";
import delta from "./jTween";

export default class jTweener {

    private _allTweens: Array<delta<any>>;

    // TODO: Can any of this work be offloaded to a webworker?
    constructor() {
        this._allTweens = [];
    }

    delta<T>(duration: number, obj: T, props: Partial<T> = {}, loop = 0, ease = Easings.Linear): delta<T> {
        const newDelta = new delta(duration, obj, props, loop, ease);
        this._allTweens.push(newDelta);
        return newDelta;
    }

    update(timeDelta: number) {
        this._allTweens.forEach(tween => {
            tween.update(timeDelta);
        });
    }
}