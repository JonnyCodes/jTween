export default class Easings {

    static Linear(percent: number): number {
        return percent;
    }

    static QuadIn(percent: number): number {
        return percent * percent;
    }

    static QuadOut(percent: number): number {
        return -1 * percent * (percent - 2);
    }

    static QuadInOut(percent: number): number {
        // Using the Bezier curve function for performance
        return percent * percent * (3 - 2 * percent);
    }

    static CubicIn(percent: number): number {
        return percent * percent * percent;
    }
}