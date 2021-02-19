import Utils from "../utils";

const Sine = {
    Start: (percent: number) => -Math.cos(Utils.clamp(percent) * (Math.PI * 0.5)) + 1,
    Stop: (percent: number) => Math.sin((Utils.clamp(percent)) * (Math.PI * 0.5)),
    Step: (percent: number) => -0.5 * (Math.cos(Math.PI * percent) - 1),
}

export { Sine };