#include <FastLED.h>
#include <EEPROM.h>

#define LED_PIN 11
#define NUM_LEDS 100

CRGB leds[NUM_LEDS];



void setup() {
  FastLED.addLeds<WS2812, LED_PIN, GRB>(leds, NUM_LEDS);
}



void loop() {
  showLeds();

  delay(10);
}



void showLeds() {
  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] =  CRGB(50, 0, 20);
  }
  // FastLED.setBrightness(currentColor.brightness.value);


  FastLED.show();
}

