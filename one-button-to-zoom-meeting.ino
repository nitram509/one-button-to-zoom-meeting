/*
   Copyright (c) 2016 Martin W. Kirst

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License. 
 */

#include "DigiKeyboard.h"

const int buttonPin = PB2;
const int ledPin = PB1;
const long BUTTON_ACTIVE_INTERVAL_MILLIS = 3000;

unsigned long previousMillis = 0;
bool isButtonActive = false;


void ledOn() {
  digitalWrite(ledPin, LOW);
}

void ledOff() {
  digitalWrite(ledPin, HIGH);
}

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
  ledOff();
}

void loop() {
 
  // this is generally not necessary but with some older systems it seems to
  // prevent missing the first character after a delay:
  DigiKeyboard.sendKeyStroke(0);
  
  unsigned long currentMillis = millis();
  if (isButtonActive) {
    if (currentMillis - previousMillis >= BUTTON_ACTIVE_INTERVAL_MILLIS) {
      ledOff();
      isButtonActive = false;
    }    
  } else {
    previousMillis = currentMillis;
    if (HIGH == digitalRead(buttonPin)) {
      isButtonActive = true;
      DigiKeyboard.sendKeyStroke(KEY_F10, MOD_CONTROL_LEFT | MOD_SHIFT_LEFT);
      ledOn();
    }
  }
  
  // It's better to use DigiKeyboard.delay() over the regular Arduino delay()
  // if doing keyboard stuff because it keeps talking to the computer to make
  // sure the computer knows the keyboard is alive and connected
  DigiKeyboard.delay(100);
}

