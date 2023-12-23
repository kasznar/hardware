import time
import board
import neopixel

led_number = 48

pixels1 = neopixel.NeoPixel(board.D18, led_number, brightness=1)

x=0

# pixels1.fill((0, 220, 0))

# pixels1[10] = (0, 20, 255)

#Sleep for three seconds, You should now have all LEDs showing light with the first node
#Showing a different colour
time.sleep(4)

#Little Light slider script, will produce a nice loading bar effect that goes all the way up a small Strip
#and then all the way back
#This was created using a While Loop taking advantage of that arbitrary variable to determine
#which LED Node we will target/index with a different colour

delay = 0.07

#Below will loop until variable x has a value of 35
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



# time.sleep(4)

#Complete the script by returning all the LED to off
pixels1.fill((255, 255, 255))