import { Ease } from "../jTween";
import Utils from "../utils";
import { Crossfade } from "./other";

const Expo = {
    Start: (percent: number) => {
        return Math.pow(2, 10 * (Utils.clamp(percent) - 1));
    },
    Stop: (percent: number) => {
        return -Math.pow(2, -10 * Utils.clamp(percent)) + 1;
    },
    Step: (percent: number) => 1
}
Expo.Step = Crossfade(Expo.Stop, Expo.Start);

export { Expo };