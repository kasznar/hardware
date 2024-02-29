import { createSignal } from "solid-js"


export function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export class RgbPixel {
    constructor(private red: number, private green: number, private blue: number) { }

    getRed(): number {
        return this.red
    }

    getGreen(): number {
        return this.green
    }

    getBlue(): number {
        return this.blue
    }
}

const initialPixels: RgbPixel[] = new Array(48).fill(new RgbPixel(255, 0, 0))
export const [pixels, setPixels] = createSignal(initialPixels)