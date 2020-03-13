import delta, { TweenOptions } from "./jTween";

export default class jTweener {

    private _allTweens: Array<delta<any>>;

    // TODO: Can any of this work be offloaded to a webworker?
    constructor() {
        this._allTweens = []; // TODO: Is iterating and removing from a linked list faster?
    }

    delta<T>(duration: number, targetObj: T, props: any = {}, options: TweenOptions): delta<T> {
        const newDelta = new delta(duration, targetObj, props, options);
        this._allTweens.unshift(newDelta);
        return newDelta;
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