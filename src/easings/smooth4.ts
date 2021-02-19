import Utils from "../utils";

const Smooth4 = {
    Start: (percent: number) => Math.pow(Utils.clamp(percent), 4),
    Stop: (percent: number) => 1 - Math.pow(1 - Utils.clamp(percent), 4),
    Step: (percent: number) => percent < 0.5 ? Math.pow(Utils.clamp(percent), 4) * 8 : 1 - Math.pow(1 - Utils.clamp(percent), 4) * 8,
}

export { Smooth4 };