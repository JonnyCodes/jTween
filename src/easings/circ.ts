import Utils from "../utils";
import { Crossfade } from "./other";

const Circ = {
    Start: (percent: number) => {
        return 1 - Math.sqrt(1 - Math.pow(Utils.clamp(percent), 2));
    },
    Stop: (percent: number) => {
        return Math.sqrt(1 - Math.pow(Utils.clamp(percent - 1), 2));
    },
    Step: (percent: number) => 1
}
Circ.Step = Crossfade(Circ.Start, Circ.Stop);

export { Circ };