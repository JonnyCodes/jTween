import Easings from "./easings";
import delta from "./jTween";

export default class jTweener {

    private _allTweens: Array<delta>;

    // TODO: Can any of this work be offloaded to a webworker?
    constructor() {
        this._allTweens = [];
    }

    delta(duration: number, obj: any, props: any = {}, loop = 0, ease = Easings.Linear): delta {
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