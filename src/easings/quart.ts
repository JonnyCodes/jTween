export class Quart {

    static In(): (percent: number) => number {
        return (percent: number) => {
            return Math.pow(percent, 4);
        }
    }

    static Out(): (percent: number) => number {
        return (percent: number) => {
            return 1 - Math.pow(percent - 1, 4);
        }
    }

    static InOut(): (percent: number) => number {
        return (percent: number) => {
            return percent < 0.5 ? 8 * Math.pow(percent, 4) : 1 - 8 * Math.pow(percent - 1, 4);
        }
    }
}
