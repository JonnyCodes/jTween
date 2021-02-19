import Utils from "../utils";
import { Crossfade } from "./other";

const Smooth2 = {
    Start: (percent: number) => {
        return Math.pow(Utils.clamp(percent), 2);
    },
    Stop: (percent: number) => {
        return 1 - Math.pow(1 - Utils.clamp(percent), 2);
    },
    Step: (percent: number) => 1
}
Smooth2.Step = Crossfade(Smooth2.Start, Smooth2.Stop);

export { Smooth2 };