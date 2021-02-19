import Utils from "../utils";

const Smooth5 = {
    Start: (percent: number) => Math.pow(Utils.clamp(percent), 5),
    Stop: (percent: number) => 1 - Math.pow(1 - Utils.clamp(percent), 5),
    Step: (percent: number) => percent < 0.5 ? Math.pow(Utils.clamp(percent), 5) * 16 : 1 - Math.pow(1 - Utils.clamp(percent), 5) * 16,
}

export { Smooth5 };