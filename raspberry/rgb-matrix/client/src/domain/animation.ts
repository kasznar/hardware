import { Config } from "./device"
import { RgbPixel, pixels, setPixels } from "./graphics"


export class ColorFillAnimation {
    constructor(private config: Config) {}

    run() {
        let col = 0

        const getRandomColor = () => {
            return Math.floor(Math.random() * 255)
        }
    
        const getRandomRgb = () => {
            return new RgbPixel(getRandomColor(), getRandomColor(), getRandomColor())
        }
    
        let color = getRandomRgb()
        let prevColor = new RgbPixel(0, 0, 0)
    
        setInterval(() => {
            const length = pixels().length
            const newPixels: RgbPixel[] = new Array(length).fill(prevColor)
    
    
            for (let i = 0; i < col; i ++) {
                for (let j = 0; j < this.config.getHeight(); j++) {
                    const index = i + j * 12
                    newPixels[index] =color
                }
            }
    
    
    
            if (col < this.config.getWidth()) {
                col ++
            } else {
                col = 1
                prevColor = color
                color = getRandomRgb()
            }
    
            setPixels(newPixels)
        }, 16)
    }
}
