import time
import board
import neopixel
import json



import asyncio
from websockets.server import serve

led_number = 48
pixels1 = neopixel.NeoPixel(board.D18, led_number, brightness=0.1, auto_write=False,)





def display_pixels(messsage):
   data = json.loads(messsage)

   i = 0

   for pixel in data["pixels"]:
    pixels1[i] = (pixel["r"], pixel["g"], pixel["b"])
    i = i + 1   
  
   pixels1.show()


async def display(websocket):
    async for message in websocket:
        display_pixels(message)
        await websocket.send(message)

async def main():
    async with serve(display, "0.0.0.0", 80):
        await asyncio.Future()  # run forever

asyncio.run(main())