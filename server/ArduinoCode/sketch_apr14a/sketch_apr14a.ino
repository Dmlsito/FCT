int fsrAnalogPin = 0; // Sensor is connected to analog 0 // 
int LEDpin = 9;      // connect Red LED to pin 9
int fsrReading;      // the analog reading from the sensor resistor divider
int LEDbrightness;
bool pressureApplied = false; // flag to keep track of whether pressure is applied or not
 
void setup(void) {
  Serial.begin(9600);   // We'll send debugging information via the Serial monitor
  pinMode(LEDpin, OUTPUT);
}
 
void loop(void) {
  fsrReading = analogRead(fsrAnalogPin);
  Serial.println(fsrReading);

  if (fsrReading > 1000
  ) { // adjust this threshold value to match the sensitivity of your sensor
    pressureApplied = true;
  } else {
    pressureApplied = false;
  }
 
  // we'll need to change the range from the analog reading (0-1023) down to the range
  // used by analogWrite (0-255) with map!
  LEDbrightness = map(fsrReading, 0, 1023, 0, 255);

  if (pressureApplied) {
    // turn on the LED with full brightness
    digitalWrite(LEDpin, HIGH);
  } else {
    // turn off the LED
    digitalWrite(LEDpin, LOW);
  }
 
  delay(1000);
}
