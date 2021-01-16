import { Ease } from "../jTween";
import Utils from "../utils";

export const Mix = (blend: number, easeA: Ease, easeB: Ease): Ease => {
    return (percent: number) => {
        return (1 - blend) * easeA(Utils.clamp(percent)) + blend * easeB(Utils.clamp(percent));
    }
}

export const Crossfade = (easeA: Ease, easeB: Ease): Ease => {
    return (percent: number) => {
        return (1 - percent) * easeA(Utils.clamp(percent)) + percent * easeB(Utils.clamp(percent));
    }
}