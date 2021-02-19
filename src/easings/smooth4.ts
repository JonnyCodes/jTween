import Utils from "../utils";
import { Crossfade } from "./other";

const Smooth4 = {
    Start: (percent: number) => {
        return Math.pow(Utils.clamp(percent), 4);
    },
    Stop: (percent: number) => {
        return 1 - Math.pow(1 - Utils.clamp(percent), 4);
    },
    Step: (percent: number) => 1
}
Smooth4.Step = Crossfade(Smooth4.Start, Smooth4.Stop);

export { Smooth4 };