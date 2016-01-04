/*
 * 
 */

#include "DigiKeyboard.h"

const int buttonPin = PB2;
const int ledPin = PB1;
int buttonState = LOW; 
char letter = 'a';

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  // this is generally not necessary but with some older systems it seems to
  // prevent missing the first character after a delay:
  DigiKeyboard.sendKeyStroke(0);
  
  buttonState = digitalRead(buttonPin);
  if (HIGH == buttonState) {
    DigiKeyboard.println(letter);
    digitalWrite(ledPin, LOW);
  } else {
    digitalWrite(ledPin, HIGH);
  }
  
  // It's better to use DigiKeyboard.delay() over the regular Arduino delay()
  // if doing keyboard stuff because it keeps talking to the computer to make
  // sure the computer knows the keyboard is alive and connected
  DigiKeyboard.delay(50);
}

