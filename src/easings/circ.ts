export class Circ {

    static In(percent: number): number {
        return -(Math.sqrt(1 - Math.pow(percent, 2)) - 1);
    }

    static Out(percent: number): number {
        return Math.sqrt(1 - Math.pow(percent - 1, 2));
    }

    static InOut(percent: number): number {
        return percent < 0.5 ? -0.5 * (Math.sqrt(1 - Math.pow(percent * 2, 2)) - 1) : 0.5 * (Math.sqrt(1 - Math.pow((percent * 2) - 2, 2)) + 1);
    }
}
