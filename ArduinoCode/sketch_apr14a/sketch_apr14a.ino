//Consts

int fsrAnalogPin = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600)
  }

void loop() {
  // put your main code here, to run repeatedly:
  Serial.print('Data: ')
  //Leemos la info de lo que esta conectado en el pin A0
  Serial.print(analogRead(A0))

}
