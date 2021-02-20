const Overshoot = {
    Start: (power: number = 1.7) => (percent: number) => {
        const pow2 = Math.pow(percent, 2);
        return (power + 1) * (pow2 * percent) - (power * pow2);
    },
    Stop: (power: number = 1.7) => (percent: number) => (power + 1) * (Math.pow(percent - 1, 3)) + (power * Math.pow(percent - 1, 2)) + 1,
    Step: (power: number = 1.7) => (percent: number) => {
        const adjustedPower = power * 1.5;
        
        if (percent < 0.5) {
            const adjustedPercent = percent * 2;
            return 0.5 * (Math.pow(adjustedPercent, 2) * ((adjustedPower + 1) * adjustedPercent - adjustedPower));
        } else {
            const adjustedPercent = (percent * 2) - 2;
            return 0.5 * (Math.pow(adjustedPercent, 2) * ((adjustedPower + 1) * adjustedPercent + adjustedPower) + 2);
        }
    }
}

export { Overshoot };