import Utils from "../utils";

export const Mix = (percent: number, blend: number, easeA: (percent: number) => number, easeB: (percent: number) => number) => {
    return (1 - blend) * easeA(Utils.clamp(percent)) + blend * easeB(Utils.clamp(percent));
}

export const Crossfade = (percent: number, easeA: (percent: number) => number, easeB: (percent: number) => number) => {
    return Mix(percent, Utils.clamp(percent), easeA, easeB);
}