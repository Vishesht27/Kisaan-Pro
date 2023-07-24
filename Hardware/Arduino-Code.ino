#include "DHT.h"
#include<MQ135.h>
#include<SoftwareSerial.h>
#include<ArduinoJson.h>


#define DHTTYPE DHT11
#define LED 2 
#define SSID YOUR_WIFI_SSID
#define PASSPHRASE YOUR_WIFI_PASSPHRASE
MQ135 gasSensor = MQ135(A0);

uint8_t DHTPin = 2;


DHT dht(DHTPin,DHTTYPE);

float moisture_percentage;
float Temperature;
float Humidity;
float rzero;
float ppm;
float rainValue;



void setup() {
  Serial.begin(9600);
  dht.begin();
  
}

void loop() {

  digitalWrite(LED, LOW); 
  delay(1000); 
  
  Serial.print("The Current PPM is ");
  ppm=gasSensor.getPPM();
  Serial.println(ppm);
  if(ppm <=500 ){
    Serial.println("The PPM are on nominal Level");
  }
  if(ppm >=800 ){
    Serial.println("The PPM are on high Level");
  }
  delay(1000);
 
  
  rainValue= 1024-analogRead(1);
  //Serial.println(rainValue);
  float rainpercentage = ((rainValue)/1024)*100;
  Serial.print("The precipitation Rate is  ");

  Serial.print(rainpercentage);
  Serial.println("%");
  Temperature = dht.readTemperature();
  Humidity=dht.readHumidity();

  Serial.print("The Current Temperature is ");
  Serial.println(Temperature);
  delay(2000);
  Serial.print("The Current Humidity is ");
  Serial.println(Humidity);

  moisture_percentage =( 100.00 - ( (analogRead(A2)/1023.00) * 100.00 ) ) ;
  //Serial.println(analogRead(A2));
  Serial.println("Soil Moisture = ");
  Serial.print(moisture_percentage);
  Serial.print("The Moisture is dropping...Starting the irrigation Pump");
  Serial.println("%");
  
  digitalWrite(LED, HIGH); 
  delay(1000); 

  const size_t capacity = JSON_ARRAY_SIZE(3) + JSON_OBJECT_SIZE(3) + JSON_OBJECT_SIZE(6);
  DynamicJsonBuffer jsonBuffer(capacity);
  
  JsonObject& root = jsonBuffer.createObject();
  root["id"] = "Sensor1";
  root["ttime"] = 1351824120;
  
  root["moisture"] = moisture_percentage;
  root["temperature"] = Temperature;
  root["humidity"] = Humidity;
  root["co2"] = ppm;
  root["rainsensor"] = rainpercentage;
  root["n"] = 232;
  root["p"] = 124;
  root["k"] = 252;
  char JSONmessageBuffer[400];
  root.prettyPrintTo(JSONmessageBuffer,sizeof(JSONmessageBuffer));
  Serial.println(JSONmessageBuffer);

  Serial.println("--------------------------------------------------------------");
  Serial.println("The New data is being Fetched... Please wait...");
  delay(5000);
  
}
