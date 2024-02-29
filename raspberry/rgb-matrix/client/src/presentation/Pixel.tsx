import { Component } from "solid-js"
import { RgbPixel, hexToRgb, setPixels } from "../domain/graphics"

type PixelComponent = Component< {
    pixel: RgbPixel, index: number
}>

export const Pixel: PixelComponent = ({ pixel, index }) => {
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