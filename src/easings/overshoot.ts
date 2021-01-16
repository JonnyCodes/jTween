import { Crossfade } from "./other";

export const OvershootStart: (percent: number) => number = (percent: number) => {
    return 2.70158 * percent * percent * percent - 1.70158 * percent * percent;
}

// TODO: BROKEN
export const OvershootStop: (percent: number) => number = (percent: number) => {
    return 3.70158 * Math.pow(percent - 1, 3) + 1.70158 * Math.pow(percent - 1, 2);
}

// TODO: BROKEN
export const OvershootStep: (percent: number) => number = (percent: number) => {
    return Crossfade(percent, OvershootStart, OvershootStop);
}
