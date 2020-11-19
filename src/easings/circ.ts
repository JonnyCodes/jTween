import Utils from "../utils";
import { Crossfade, Mix } from "./other";

export const CircStart: (percent: number) => number = (percent: number) => {
    return 1 - Math.sqrt(1 - Math.pow(Utils.clamp(percent), 2));
}

export const CircStop: (percent: number) => number = (percent: number) => {
    return Math.sqrt(1 - Math.pow(Utils.clamp(percent - 1), 2));
}

export const CircStep: (percent: number) => number = (percent: number) => {
    return Crossfade(percent, CircStart, CircStop);
}
