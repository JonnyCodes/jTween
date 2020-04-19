export class Cubic {

    static In(): (percent: number) => number {
        return (percent: number) => {
            return Math.pow(percent, 3);
        }
    }

    static Out(): (percent: number) => number {
        return (percent: number) => {
            return Math.pow(percent - 1, 3) + 1;
        }
    }

    static InOut(): (percent: number) => number {
        return (percent: number) => {
            return percent < 0.5 ? 4 * Math.pow(percent, 3) : (percent - 1) * Math.pow(2 * percent - 2, 2) + 1;
        }
    }
}
