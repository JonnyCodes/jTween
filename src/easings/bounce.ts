export class Bounce {

    // TODO: Any way to customize this, like Elastic and Overshoot

    static In(percent: number): number {
        return 1 - Bounce.Out(1 - percent);
    }

    static Out(percent: number) : number {
        if (percent < (1 / 2.75)) {
			return (7.5625 * percent * percent);
		} else if (percent < (2 / 2.75)) {
			return (7.5625 * (percent -= (1.5 / 2.75)) * percent + 0.75);
		} else if (percent < (2.5/2.75)) {
			return (7.5625 * (percent -= (2.25 / 2.75)) * percent + 0.9375);
		} else {
			return (7.5625 * (percent -= (2.625 / 2.75)) * percent + 0.984375);
		}
    }

    static InOut(percent: number): number {
        return ((percent *= 2) <= 1 ? 1 - Bounce.Out(1 - percent) : Bounce.Out(percent - 1) + 1) / 2;
    }
}