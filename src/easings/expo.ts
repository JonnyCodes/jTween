import { Ease } from "../jTween";
import Utils from "../utils";

const Expo = {
    Start: (percent: number) => Math.pow(2, 10 * (Utils.clamp(percent) - 1)) - 0.001,
    Stop: (percent: number) => -Math.pow(2, -10 * Utils.clamp(percent)) + 1.001,
    Step: (percent: number) => {
        const clamped = Utils.clamp(percent);
        if (clamped < 0.5) {
            return 0.515 * Math.pow(2, 10 * (clamped - 0.5)) - 0.016;
        } else {
            return 0.515 * (-Math.pow(2, -10 * (clamped - 0.5))) + 1.016;
        }
    }
}

export { Expo };