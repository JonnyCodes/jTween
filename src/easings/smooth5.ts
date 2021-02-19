import Utils from "../utils";
import { Crossfade } from "./other";

const Smooth5 = {
    Start: (percent: number) => {
        return Math.pow(Utils.clamp(percent), 5);
    },
    Stop: (percent: number) => {
        return 1 - Math.pow(1 - Utils.clamp(percent), 5);
    },
    Step: (percent: number) => 1
}

Smooth5.Step = Crossfade(Smooth5.Start, Smooth5.Stop);

export { Smooth5 };