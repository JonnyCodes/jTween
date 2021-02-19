import Utils from "../utils";

const Smooth3 = {
    Start: (percent: number) => Math.pow(Utils.clamp(percent), 3),
    Stop: (percent: number) => 1 - Math.pow(1 - Utils.clamp(percent), 3),
    Step: (percent: number) => percent < 0.5 ? Math.pow(Utils.clamp(percent), 3) * 4 : 1 - Math.pow(1 - Utils.clamp(percent), 3) * 4,
}

export { Smooth3 };