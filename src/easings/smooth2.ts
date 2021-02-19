import Utils from "../utils";

const Smooth2 = {
    Start: (percent: number) => Math.pow(Utils.clamp(percent), 2),
    Stop: (percent: number) => 1 - Math.pow(1 - Utils.clamp(percent), 2),
    Step: (percent: number) => percent < 0.5 ? Math.pow(Utils.clamp(percent), 2) * 2 : 1 - Math.pow(1 - Utils.clamp(percent), 2) * 2,
}

export { Smooth2 };