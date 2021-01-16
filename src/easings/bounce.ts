import { Ease } from "../jTween";
import { Crossfade } from "./other";
// TODO: Don't like all tweens using Bounce.Out, should be independent

export const BounceStart: Ease = (percent: number) => {
    return 1 - BounceStop(1 - percent);
}

export const BounceStop: Ease = (percent: number) => {
    if (percent < (1 / 2.75)) {
        return (7.5625 * percent * percent);
    } else if (percent < (2 / 2.75)) {
        return (7.5625 * (percent -= (1.5 / 2.75)) * percent + 0.75);
    } else if (percent < (2.5/2.75)) {
        return (7.5625 * (percent -= (2.25 / 2.75)) * percent + 0.9375);
    } else {
        return (7.5625 * (percent -= (2.625 / 2.75)) * percent + 0.984375);
    }
}

export const BounceStep: Ease = Crossfade(BounceStart, BounceStop);
