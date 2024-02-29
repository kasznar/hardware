import { createSignal } from "solid-js"
import { RgbPixel } from "./graphics"
import { DisplayDriver } from "./display-driver"

export const [socket, setSocket] = createSignal<WebSocket | null>(null)

const rgbToRequest = (item: RgbPixel) => ({ r: item.getRed(), g: item.getGreen(), b: item.getBlue() })


export const createMessage = (pixels: RgbPixel[]) => {
    const displayAdjustedPixels = DisplayDriver.mapToDisplay(pixels)
    const pixelsMessage = displayAdjustedPixels.map(rgbToRequest)

    return JSON.stringify({ pixels: pixelsMessage })

}

export class Connection {
    init(initialPixels: RgbPixel[]) {
        const socketRef = new WebSocket("ws://raspberry");

        setSocket(socketRef)
    
        socketRef.addEventListener("open", (event) => {
            const message = createMessage(initialPixels)
    
            socketRef.send(message);
        });
    
    }

    send(pixels: RgbPixel[]) {
        const message = createMessage(pixels)
        socket()?.send(message);
    }
}