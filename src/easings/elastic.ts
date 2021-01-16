import { Crossfade } from "./other";

//Note: 2 * Math.PI = 6.283185307179586
export const ElasticStart: (percent: number) => number = (percent: number) => {
    return -Math.pow(2, 10 * percent - 10) * Math.sin((percent * 10 - 10.75) * (6.283185307179586 / 3));
}

export const ElasticStop: (percent: number) => number = (percent: number) => {
    return Math.pow(2, -10 * percent) * Math.sin((percent * 10 - 0.75) * (6.283185307179586 / 3)) + 1;
}

export const ElasticStep: (percent: number) => number = (percent: number) => {
    return Crossfade(percent, ElasticStart, ElasticStop);
}