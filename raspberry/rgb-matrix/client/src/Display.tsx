import { For, createEffect, createSignal } from "solid-js"




const config = {
    width: 12,
    height: 4
}

class RgbPixel {
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

const length = config.width * config.height
const initialPixels: RgbPixel[] = new Array(length).fill(new RgbPixel(0, 0, 0))

const [pixels, setPixels] = createSignal(initialPixels)
const [socket, setSocket] = createSignal<WebSocket | null>(null)
// const [send, setSend] = createSignal<(message: string) => void>(() => {})

const rgbToRequest = (item: RgbPixel) => ({ r: item.getRed(), g: item.getGreen(), b: item.getBlue() })



const displayMap = [
    [0, 1, 2, 3,],
    [7, 6, 5, 4,],
    [8, 9, 10, 11,],
    [15, 14, 13, 12],
]

const combinedMap: number[][] = [[], [], [], []];

for (let j = 0; j < 3; j++) {
  for (let i = 0; i < 4; i++) {
    const row = displayMap[i];
    const shifted = row.map((item) => item + 16 * j);

    combinedMap[i].push(...shifted);
  }
}

const flatCombinedMap = combinedMap.flat()


const createMessage = () => {
    const displayAdjustedPixels = mapToDisplay(pixels())
    const pixelsMessage = displayAdjustedPixels.map(rgbToRequest)

    console.log(pixelsMessage)

    return JSON.stringify({ pixels: pixelsMessage })

}

const mapToDisplay = (pixels: RgbPixel[]) => {
    const result: RgbPixel[] = new Array(length).fill(new RgbPixel(0, 0, 0))


    for (let i = 0; i < length; i++) {
        const index = flatCombinedMap[i]
        result[index] = pixels[i]
    }

    return result
}



createEffect(() => {

    const message = createMessage()

    socket()?.send(message);

    console.log(pixels());
});

function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


export const Pixel = ({ pixel, index }: { pixel: RgbPixel, index: number }) => {

    const color = `rgb(${pixel.getRed()}, ${pixel.getGreen()}, ${pixel.getBlue()})`

    const background = `background: ${color}`

    const id = `pixel${index}`

    const handleInput = (value: string) => {
        const rgb = hexToRgb(value)

        if (rgb === null) {
            return
        }

        const newValue = new RgbPixel(rgb.r, rgb.g, rgb.b)

        setPixels(prevPixels => {
            const newPixels = [...prevPixels]
            newPixels[index] = newValue

            return newPixels
        })
    }


    return (<label class="pixel" style={background} for={id}>
        {index}
        <input onInput={(e) => handleInput(e.currentTarget.value)} type="color" id={id} name="pixel_color" value={color} class="color-input" />
    </label>)
}


export const PixelGrid = ({ pixels }: { pixels: RgbPixel[] }) => {

    return (<div class="display" style={`grid-template-columns: repeat(${config.width}, 1fr)`}>
        <For each={pixels}>{(pixel, i) =>
            <Pixel pixel={pixel} index={i()} />
        }</For>
    </div>)
}



const animate = () => {
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
        const newPixels: RgbPixel[] = new Array(length).fill(prevColor)


        for (let i = 0; i < col; i ++) {
            for (let j = 0; j < config.height; j++) {
                const index = i + j * 12
                newPixels[index] =color
            }
        }



        if (col < config.width) {
            col ++
        } else {
            col = 1
            prevColor = color
            color = getRandomRgb()
        }


        // const newPixels: RgbPixel[] = new Array(length).fill(new RgbPixel(col++, 0, 0))
        setPixels(newPixels)
        // col ++
    }, 16)

}


export const Display = () => {


    console.log('runnin')
    // Create WebSocket connection.
    const socket = new WebSocket("ws://raspberry");

    setSocket(socket)

    // Connection opened

    socket.addEventListener("open", (event) => {
        const message = createMessage()

        socket.send(message);
    });

    animate()



    return (<div class="display" style={`grid-template-columns: repeat(${config.width}, 1fr)`}>
        <For each={pixels()}>{(pixel, i) =>
            <Pixel pixel={pixel} index={i()} />
        }</For>
    </div>)
}