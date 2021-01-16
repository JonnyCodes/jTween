import { Ease } from "../jTween";
import Utils from "../utils";
import { Crossfade } from "./other";

export const CircStart: Ease = (percent: number) => {
    return 1 - Math.sqrt(1 - Math.pow(Utils.clamp(percent), 2));
}

export const CircStop: Ease = (percent: number) => {
    return Math.sqrt(1 - Math.pow(Utils.clamp(percent - 1), 2));
}

export const CircStep: Ease = Crossfade(CircStart, CircStop);
