
// TODO: Break this up into different files?

export default class Easings {

    static Linear(percent: number): number {
        return percent;
    }

    static QuadIn(percent: number): number {
        return Math.pow(percent, 2);
    }

    static QuadOut(percent: number): number {
        return percent * (2 - percent);
    }

    static QuadInOut(percent: number): number {
        return percent < 0.5 ? 2 * Math.pow(percent, 2) : -1 + (4 - 2 * percent) * percent;
    }

    static CubicIn(percent: number): number {
        return Math.pow(percent, 3);
    }

    static CubicOut(percent: number): number {
        return Math.pow(percent - 1, 3) + 1;
    }

    static CubicInOut(percent: number): number {
        return percent < 0.5 ? 4 * Math.pow(percent, 3) : (percent - 1) * Math.pow(2 * percent - 2, 2) + 1;
    }

    static QuartIn(percent: number): number {
        return Math.pow(percent, 4);
    }

    static QuartOut(percent: number): number {
        return 1 - Math.pow(percent - 1, 4);
    }

    static QuartInOut(percent: number): number {
        return percent < 0.5 ? 8 * Math.pow(percent, 4) : 1 - 8 * Math.pow(percent - 1, 4);
    }

    static QuintIn(percent: number): number {
        return Math.pow(percent, 5);
    }

    static QuintOut(percent: number): number {
        return Math.pow(percent - 1, 5) + 1;
    }

    static QuintInOut(percent: number): number {
        return percent < 0.5 ? 16 * Math.pow(percent, 5) : (percent - 1) * Math.pow(2 * percent - 2, 4) + 1;
    }

    static SineIn(percent: number): number {
        return -1 * Math.cos(percent * (Math.PI / 2)) + 1;
    }

    static SineOut(percent: number): number {
        return Math.cos(percent * (Math.PI / 2));
    }

    static SineInOut(percent: number): number {
        return -0.5 * (Math.cos(Math.PI * percent) - 1);
    }

    static ExpoIn(percent: number): number {
        return (percent === 0) ? 0 : Math.pow(2, 10 * (percent - 1));
    }

    static ExpoOut(percent: number): number {
        return (percent === 1) ? 1 : -Math.pow(2, -10 * percent) + 1;
    }
}