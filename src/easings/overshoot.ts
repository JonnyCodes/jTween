export class Overshoot {

    static In(overshoot: number = 1.65): (percent: number) => number {
        return (percent: number) => {
            return Math.pow(percent, 2) * ((overshoot + 1) * percent - overshoot);
        }
    }

    static Out(overshoot: number = 1.65): (percent: number) => number {
        return (percent: number) => {
            return Math.pow(percent - 1, 2) * ((overshoot + 1) * (percent - 1) + overshoot) + 1;
        }
    }

    static InOut(overshoot: number = 1.65): (percent: number) => number {
        return (percent: number) => {
            return ((percent *= 2) < 1 ? Math.pow(percent, 2) * ((overshoot + 1) * percent - overshoot) : (percent -= 2) * percent * ((overshoot + 1) * percent + overshoot) + 2) / 2;
        }
    }
}
