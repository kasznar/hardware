import time
import board
import neopixel



import asyncio
from websockets.server import serve

led_number = 48
pixels1 = neopixel.NeoPixel(board.D18, led_number, brightness=0.1)


delay = 0.07

def run_animation():
  for x in range(led_number):
    pixels1[x] = (255, 0, 0)
    time.sleep(delay)

  for x in range(led_number):
    pixels1[x] = (0, 255, 0)
    time.sleep(delay)

  for x in range(led_number):
    pixels1[x] = (0, 0, 255)
    time.sleep(delay)

  for x in range(led_number):
    pixels1[x] = (0, 0, 0)
    time.sleep(delay)



async def display(websocket):
    async for message in websocket:
        run_animation()
        await websocket.send(message)

async def main():
    async with serve(display, "0.0.0.0", 80):
        await asyncio.Future()  # run forever

asyncio.run(main())