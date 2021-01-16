import { Ease } from "../jTween";
import Utils from "../utils";
import { Crossfade } from "./other";

export const ExpoStart: Ease = (percent: number) => {
    return Math.pow(2, 10 * (Utils.clamp(percent) - 1));
}

export const ExpoStop: Ease = (percent: number) => {
    return -Math.pow(2, -10 * Utils.clamp(percent)) + 1;
}

export const ExpoStep: Ease = Crossfade(ExpoStop, ExpoStart);