export default interface TweenOptions {
    repeat?: number,
    ease?: (percent: number) => number,
    onRepeat?: (repeatNum: number) => void,
    onRepeatScope?: any
}