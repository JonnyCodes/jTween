export class Elastic {

    //Note: 2 * Math.PI = 6.283185307179586

    static In(amplitude: number = 0.1, period: number = 0.333): (percent: number) => number {
        return (percent: number) => {
            if (percent === 0) {
                return 0;
            }
    
            if (percent === 1) {
                return 1;
            }
    
            return -(Math.pow(2, 10 * (percent -= 1)) * Math.sin((percent - amplitude) * 6.283185307179586 / period));
        } 
    }

    static Out(amplitude: number = 0.1, period: number = 0.333): (percent: number) => number {
        return (percent: number) => {
            if (percent === 0) {
                return 0;
            }
    
            if (percent === 1) {
                return 1;
            }
    
            return Math.pow(2, -10 * percent) * Math.sin((percent - amplitude) * 6.283185307179586 / period) + 1;
        }
    }

    static InOut(amplitude: number = 0.1, period: number = 0.475): (percent: number) => number {
        return (percent: number) => {
            if (percent === 0) {
                return 0;
            }
    
            if ((percent *= 2) === 2) {
                return 1;
            }
    
            if (percent < 1) {
                return -0.5 * (Math.pow(2, 10 * (percent -= 1)) * Math.sin((percent - amplitude) * 6.283185307179586 / period));
            }
            return Math.pow(2, -10 * (percent -= 1)) * Math.sin((percent - amplitude) * 6.283185307179586 / period) * 0.5 + 1;
        }
    }
}