export class Sine {

    static In(): (percent: number) => number {
        return (percent: number) => {
            return -1 * Math.cos(percent * (Math.PI / 2)) + 1;
        }
    }

    static Out(): (percent: number) => number {
        return (percent: number) => {
            return Math.cos(percent * (Math.PI / 2));
        }
    }

    static InOut(): (percent: number) => number {
        return (percent: number) => {
            return -0.5 * (Math.cos(Math.PI * percent) - 1);
        }
    }
}
