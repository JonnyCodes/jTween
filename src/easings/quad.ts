export class Quad {

    static In(): (percent: number) => number {
        return (percent: number) => {
            return Math.pow(percent, 2);
        }
    }

    static Out(): (percent: number) => number {
        return (percent: number) => {
            return percent * (2 - percent);
        }
    }

    static InOut(): (percent: number) => number {
        return (percent: number) => {
            return percent < 0.5 ? 2 * Math.pow(percent, 2) : -1 + (4 - 2 * percent) * percent;
        }
    }
}
