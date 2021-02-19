import { Ease } from "../jTween";
import { Crossfade } from "./other";

const Overshoot = {
    Start: (percent: number) => {
        const pow2 = Math.pow(percent, 2);
        return 2.70158 * pow2 * percent - 1.70158 * pow2;
    },
    Stop: (percent: number) => {
        return 2.70158 * (Math.pow(percent - 1, 3)) + (1.70158 * Math.pow(percent - 1, 2)) + 1;
    },
    Step: (percent: number) => 1
}
Overshoot.Step = Crossfade(Overshoot.Start, Overshoot.Stop);

export { Overshoot };