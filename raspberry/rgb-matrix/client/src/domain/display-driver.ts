import { RgbPixel } from "./graphics";

const createDisplayMap = () => {
    const singleDisplayMap = [
        [0, 1, 2, 3,],
        [7, 6, 5, 4,],
        [8, 9, 10, 11,],
        [15, 14, 13, 12],
    ]
    
    const combinedMap: number[][] = [[], [], [], []];
    
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 4; i++) {
        const row = singleDisplayMap[i];
        const shifted = row.map((item) => item + 16 * j);
    
        combinedMap[i].push(...shifted);
      }
    }

    return combinedMap.flat()
}



const displaymap = createDisplayMap()

export class DisplayDriver {
    static mapToDisplay(pixels: RgbPixel[]) {
        const result: RgbPixel[] = new Array(pixels.length).fill(new RgbPixel(0, 0, 0))


        for (let i = 0; i < pixels.length; i++) {
            const index = displaymap[i]
            result[index] = pixels[i]
        }
    
        return result
    }
}