import Utils from "../utils";

const SmoothN = {
    Start: (n: number) => (percent: number) => Math.pow(Utils.clamp(percent), n),
    Stop: (n: number) => (percent: number) => 1 - Math.pow(1 - Utils.clamp(percent), n),
    Step: (n: number) => (percent: number) =>  {
        const clamped = Utils.clamp(percent);
        const powMultiplier = Math.pow(2, n - 1);
        return percent < 0.5 ? Math.pow(clamped, n) * powMultiplier : 1 - Math.pow(1 - clamped, n) * powMultiplier;
    },
}

export { SmoothN };