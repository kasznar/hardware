import time
import board
import neopixel
import json



import asyncio
from websockets.server import serve

led_number = 48
pixels1 = neopixel.NeoPixel(board.D18, led_number, brightness=0.1)


delay = 0.07

def run_animation():
  for x in range(led_number):
    pixels1[x] = (255, 100, 0)
    time.sleep(delay)

  for x in range(led_number):
    pixels1[x] = (100, 255, 0)
    time.sleep(delay)

  for x in range(led_number):
    pixels1[x] = (0, 100, 255)
    time.sleep(delay)

  for x in range(led_number):
    pixels1[x] = (0, 0, 0)
    time.sleep(delay)


def display_pixels(messsage):
   data = json.loads(messsage)

   i = 0

   for pixel in data["pixels"]:
    pixels1[i] = (pixel["r"], pixel["g"], pixel["b"])
    i = i + 1
    print(pixel)
   
   print(type(messsage))
   print(messsage)
   



async def display(websocket):
    async for message in websocket:
        display_pixels(message)
        await websocket.send(message)

async def main():
    async with serve(display, "0.0.0.0", 80):
        await asyncio.Future()  # run forever

asyncio.run(main())