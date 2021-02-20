// Linear
export { Linear } from "./easings/linear";

// Smooth eases
export { Smooth2 } from "./easings/smooth2";
export { Smooth3 } from "./easings/smooth3";
export { Smooth4 } from "./easings/smooth4";
export { Smooth5 } from "./easings/smooth5";
export { SmoothN } from "./easings/smoothN";

// Sine
export { Sine } from "./easings/sine";

// Overshoot
export { Overshoot } from "./easings/overshoot";

// Expo
export { Expo } from "./easings/expo";

// Elastic
export { Elastic } from "./easings/elastic";

// Circ
export { Circ } from "./easings/circ";

// Bounce
export { Bounce } from "./easings/bounce";

// Other
export { Mix, Crossfade } from "./easings/other";

// Types
export { Ease } from "./jTween";

// Uninstantiated Tween
import jTween from "./jTween";
export { jTween };

export default new jTween();