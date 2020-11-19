import Utils from "../utils";
import { Crossfade } from "./other";

export const ExpoStart: (percent: number) => number = (percent: number) => {
    return Math.pow(2, 10 * (Utils.clamp(percent) - 1));
}

export const ExpoStop: (percent: number) => number = (percent: number) => {
    return -Math.pow(2, -10 * Utils.clamp(percent)) + 1;
}

export const ExpoStep: (percent: number) => number = (percent: number) => {
    return Crossfade(percent, ExpoStop, ExpoStart);
}