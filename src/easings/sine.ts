import Utils from "../utils";
import { Crossfade } from "./other";

export const SineStart: (percent: number) => number = (percent: number) => {
    return -Math.cos(Utils.clamp(percent) * (Math.PI / 2)) + 1;
}

export const SineStop: (percent: number) => number = (percent: number) => {
    return Math.cos((1 - Utils.clamp(percent)) * (Math.PI / 2));
}

export const SineStep: (percent: number) => number = (percent: number) => {
    return Crossfade(percent, SineStart, SineStop);
}
