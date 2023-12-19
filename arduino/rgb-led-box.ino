#include <FastLED.h>
#include <EEPROM.h>

#define LED_PIN 3
#define NUM_LEDS 16
#define BRIGHTNESS_BUTTON_PIN 7
#define RED_BUTTON_PIN 8
#define GREEN_BUTTON_PIN 9
#define BLUE_BUTTON_PIN 10

#define EEPROM_ADRESS 0

CRGB leds[NUM_LEDS];

class ColorValue {
public:
  int value;
  int dir;

  ColorValue() {
    value = 0;
    dir = 1;
  }
  void increment() {
    value = value + dir;

    if (value >= 255) {
      dir = -1;
    } else if (value <= 0) {
      dir = 1;
    }
  }
};


class LedColor {
public:
  ColorValue brightness;
  ColorValue red;
  ColorValue green;
  ColorValue blue;

  CRGB getRGB() {
    return CRGB(red.value, green.value, blue.value);
  }
};

LedColor currentColor;


void setup() {
  pinMode(BRIGHTNESS_BUTTON_PIN, INPUT_PULLUP);
  pinMode(RED_BUTTON_PIN, INPUT_PULLUP);
  pinMode(GREEN_BUTTON_PIN, INPUT_PULLUP);
  pinMode(BLUE_BUTTON_PIN, INPUT_PULLUP);

  FastLED.addLeds<WS2812, LED_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setBrightness(currentColor.brightness.value);

  EEPROM.get(EEPROM_ADRESS, currentColor);
}



void loop() {
  handleButtons();

  showLeds();

  EEPROM.put(EEPROM_ADRESS, currentColor);

  delay(10);
}

void handleButtons() {
  if (readButton(BRIGHTNESS_BUTTON_PIN)) {
    currentColor.brightness.increment();
  }
  if (readButton(RED_BUTTON_PIN)) {
    currentColor.red.increment();
  }
  if (readButton(GREEN_BUTTON_PIN)) {
    currentColor.green.increment();
  }
  if (readButton(BLUE_BUTTON_PIN)) {
    currentColor.blue.increment();
  }
}


void showLeds() {
  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = currentColor.getRGB();
  }
  FastLED.setBrightness(currentColor.brightness.value);


  FastLED.show();
}


bool readButton(int pin) {
  int sensorVal = digitalRead(pin);
  return sensorVal != HIGH;
}
