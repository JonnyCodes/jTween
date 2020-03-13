export class Elastic {

    //Note: 2 * Math.PI = 6.283185307179586

    static In(percent: number): number {
        if (percent === 0) {
            return 0;
        }

        if (percent === 1) {
            return 1;
        }

        return -(Math.pow(2, 10 * (percent -= 1)) * Math.sin((percent - 0.1) * 6.283185307179586 / 0.333));
    }

    static Out(percent: number): number {
        if (percent === 0) {
            return 0;
        }

        if (percent === 1) {
            return 1;
        }

        return Math.pow(2, -10 * percent) * Math.sin((percent - 0.1) * 6.283185307179586 / 0.333) + 1;
    }

    // TODO: Don't like doubling percent, change the formula to do without
    static InOut(percent: number): number {
        if (percent === 0) {
            return 0;
        }

        if ((percent *= 2) === 2) {
            return 1;
        }

        if (percent < 1) {
            return -0.5 * (Math.pow(2, 10 * (percent -= 1)) * Math.sin((percent - 0.1) * 6.283185307179586 / 0.475));
        }
        return Math.pow(2, -10 * (percent -= 1)) * Math.sin((percent - 0.1) * 6.283185307179586 / 0.475) * 0.5 + 1;
    }
}