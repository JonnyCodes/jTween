export class Quint {

    static In(percent: number): number {
        return Math.pow(percent, 5);
    }

    static Out(percent: number): number {
        return Math.pow(percent - 1, 5) + 1;
    }

    static InOut(percent: number): number {
        return percent < 0.5 ? 16 * Math.pow(percent, 5) : (percent - 1) * Math.pow(2 * percent - 2, 4) + 1;
    }
}
