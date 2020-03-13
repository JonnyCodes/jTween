export class Expo {

    static In(percent: number): number {
        return (percent === 0) ? 0 : Math.pow(2, 10 * (percent - 1));
    }

    static Out(percent: number): number {
        return (percent === 1) ? 1 : -Math.pow(2, -10 * percent) + 1;
    }

    static InOut(percent: number): number {
        if (percent === 0) {
            return 0;
        }

        if (percent === 1) {
            return 1;
        }

        return percent < 0.5 ? 0.5 * Math.pow(2, 10 * ((percent * 2) - 1)) : 0.5 * (-Math.pow(2, -10 * ((percent * 2) - 1)) + 2);
    }
}
