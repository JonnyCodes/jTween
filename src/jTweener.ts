import Easings from "./easings";
import { jTween } from "./jTween";

export default class jTweener {

    private _allTweens: Array<jTween.delta>;

    constructor() {
        this._allTweens = [];
    }

    async delta(duration: number, obj: any, props: any = {}, ease = Easings.Linear) {
        const newDelta = new jTween.delta(duration, obj, props, ease);
        this._allTweens.push(newDelta);
        return newDelta;
    }

    update(timeDelta: number) {
        this._allTweens.forEach(tween => {
            tween.update(timeDelta);
        });
    }
}