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


const createMessage = () => {
    const thing = pixels().map(item => ({r: item.getRed(), g: item.getGreen(), b: item.getBlue()}))

        console.log(thing)

        return JSON.stringify({pixels: thing})

}

const mapToDisplay = (pixels: RgbPixel[]) => {
    let counter = 0
    const result: RgbPixel[] = new Array(length).fill(new RgbPixel(0, 0, 0))

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const index = j + i * 12
            result[counter] = pixels[index]
            counter++
        }        
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





    return (<div class="display" style={`grid-template-columns: repeat(${config.width}, 1fr)`}>
        <For each={pixels()}>{(pixel, i) =>
            <Pixel pixel={pixel} index={i()} />
        }</For>
    </div>)
}