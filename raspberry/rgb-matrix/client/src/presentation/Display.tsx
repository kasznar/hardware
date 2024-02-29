import { For, createEffect, createRoot } from "solid-js"
import { Config } from "../domain/device"
import { pixels } from "../domain/graphics"
import { Connection } from "../domain/connection"
import { ColorFillAnimation } from "../domain/animation"
import { Pixel } from "./Pixel"


const config = new Config(12, 4)
const connection = new Connection()
const animation = new ColorFillAnimation(config)


export const Display = () => {
    connection.init(pixels())
    
    // GOOD CODE?
    animation.run()

    createEffect(() => {
        connection.send(pixels())
    });

    return (<div class="display" style={`grid-template-columns: repeat(${config.getWidth()}, 1fr)`}>
        <For each={pixels()}>{(pixel, i) =>
            <Pixel pixel={pixel} index={i()} />
        }</For>
    </div>)
}

// /home/admin/projects/matrix/rgb-websocket.py