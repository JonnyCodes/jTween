import { Ease } from "../jTween";
import { Crossfade } from "./other";
// TODO: Don't like all tweens using Bounce.Out, should be independent


const Bounce = {
    Start: (percent: number) => 1,
    Stop: (percent: number) => {
        if (percent < (1 / 2.75)) {
            return (7.5625 * percent * percent);
        } else if (percent < (2 / 2.75)) {
            return (7.5625 * (percent -= (1.5 / 2.75)) * percent + 0.75);
        } else if (percent < (2.5/2.75)) {
            return (7.5625 * (percent -= (2.25 / 2.75)) * percent + 0.9375);
        } else {
            return (7.5625 * (percent -= (2.625 / 2.75)) * percent + 0.984375);
        }
    },
    Step: (percent: number) => 1
}
Bounce.Start = (percent: number) => {
    return 1 - Bounce.Stop(1 - percent);
};
Bounce.Step = Crossfade(Bounce.Start, Bounce.Stop);

export { Bounce };
