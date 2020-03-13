export class Overshoot {

    static In(percent: number): number {
        return Math.pow(percent, 2) * (2.5 * percent - 1.5);
    }

    static Out(percent: number): number {
        return Math.pow(percent - 1, 2) * (2.5 * (percent - 1) + 1.5) + 1;
    }
}
