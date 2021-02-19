import Utils from "../utils";
import { Crossfade } from "./other";

const Sine = {
    Start: (percent: number) => {
        return -Math.cos(Utils.clamp(percent) * (Math.PI / 2)) + 1;
    },
    Stop: (percent: number) => {
        return Math.cos((1 - Utils.clamp(percent)) * (Math.PI / 2));
    },
    Step: (percent: number) => 1
}
Sine.Step = Crossfade(Sine.Start, Sine.Stop);

export { Sine };