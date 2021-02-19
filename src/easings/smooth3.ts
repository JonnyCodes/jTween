import Utils from "../utils";
import { Crossfade } from "./other";

const Smooth3 = {
    Start: (percent: number) => {
        return Math.pow(Utils.clamp(percent), 3);
    },
    Stop: (percent: number) => {
        return 1 - Math.pow(1 - Utils.clamp(percent), 3);
    },
    Step: (percent: number) => 1
}
Smooth3.Step = Crossfade(Smooth3.Start, Smooth3.Stop);

export { Smooth3 };