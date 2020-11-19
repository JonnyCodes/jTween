import Utils from "../utils";
import { Linear } from "./linear";
import { Crossfade, Mix } from "./other";


export const SmoothStart2: (percent: number) => number = (percent: number) => {
    return Math.pow(Utils.clamp(percent), 2);
}

export const SmoothStop2: (percent: number) => number = (percent: number) => {
    return 1 - Math.pow(1 - Utils.clamp(percent), 2);
}

const SmoothStart1_5: (percent: number) => number = (percent: number) => {
    return Mix(percent, 0.5, Linear(), SmoothStart2)
}
const SmoothStop1_5: (percent: number) => number = (percent: number) => {
    return Mix(percent, 0.5, Linear(), SmoothStop2)
}

export const SmoothStep2: (percent: number) => number = (percent: number) => {
    return Crossfade(percent, SmoothStart1_5, SmoothStop1_5);
}


export const SmoothStart3: (percent: number) => number = (percent: number) => {
    return Math.pow(Utils.clamp(percent), 3);
}

export const SmoothStop3: (percent: number) => number = (percent: number) => {
    return 1 - Math.pow(1 - Utils.clamp(percent), 3);
}

export const SmoothStep3: (percent: number) => number = (percent: number) => {
    return Crossfade(percent, SmoothStart2, SmoothStop2);
}


export const SmoothStart4: (percent: number) => number = (percent: number) => {
    return Math.pow(Utils.clamp(percent), 4);
}

export const SmoothStop4: (percent: number) => number = (percent: number) => {
    return 1 - Math.pow(1 - Utils.clamp(percent), 4);
}

export const SmoothStep4: (percent: number) => number = (percent: number) => {
    return Crossfade(percent, SmoothStart3, SmoothStop3);
}


export const SmoothStart5: (percent: number) => number = (percent: number) => {
    return Math.pow(Utils.clamp(percent), 5);
}

export const SmoothStop5: (percent: number) => number = (percent: number) => {
    return 1 - Math.pow(1 - Utils.clamp(percent), 5);
}

export const SmoothStep5: (percent: number) => number = (percent: number) => {
    return Crossfade(percent, SmoothStart4, SmoothStop4);
}