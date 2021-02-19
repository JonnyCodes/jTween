import Utils from "../utils";

const Circ = {
    Start: (percent: number) => 1 - Math.sqrt(1 - Math.pow(Utils.clamp(percent), 2)),
    Stop: (percent: number) => Math.sqrt(1 - Math.pow(Utils.clamp(percent) - 1, 2)),
    Step: (percent: number) => {
        const clamped = Utils.clamp(percent);
        if (clamped < 0.5) {
            return 0.5 * (1 - Math.sqrt(1 - Math.pow(clamped * 2, 2)));
        } else {
            return 0.5 * Math.sqrt(1 - Math.pow(clamped * 2 - 2, 2)) + 0.5;
        }
    }
}

export { Circ };