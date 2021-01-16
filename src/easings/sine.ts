import { Ease } from "../jTween";
import Utils from "../utils";
import { Crossfade } from "./other";

export const SineStart: Ease = (percent: number) => {
    return -Math.cos(Utils.clamp(percent) * (Math.PI / 2)) + 1;
}

export const SineStop: Ease = (percent: number) => {
    return Math.cos((1 - Utils.clamp(percent)) * (Math.PI / 2));
}

export const SineStep: Ease = Crossfade(SineStart, SineStop);
