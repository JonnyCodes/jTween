import { Ease } from "../jTween";

export type TweenOptions = {
    repeat?: number;
    ease?: Ease;
    onRepeat?: (repeatNum: number) => void;
    onRepeatScope?: any;
    onUpdate?: (percentComplete: number) => void;
    onUpdateScope?: any;
    autoDestroy?: boolean;
}