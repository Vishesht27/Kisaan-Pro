
#include<WiFiClientSecure.h>
#include <ArduinoJson.h>
#include "DHT.h"
#include<ESP8266WiFi.h>
#include<ESP8266HTTPClient.h>
#include<MQ135.h>

#define DHTTYPE DHT11
#define LED 2 
#define MOISTURE_THRESHOLD 55;


WiFiClient client;



const int analogPin = A0;
const int rain_sensor_pin = D5;
uint8_t DHTPin = D5;
MQ135 gasSensor = MQ135(analogPin);

const char* ssid="OnePlus 9R";//"Cyber_Disease";// "OnePlus 9R";//"Mayuresh's pixel";//"DESKTOP-L81TCU9 7856";//"OnePlus 9R";//"Mayuresh's pixel";//"OnePlus 9R"; //"Cyber_Disease";
const char* password = "12345678";//"Cyber@Mit$";//"12345678";//"12345678";//"nahidetja";//"12345678"; //"Cyber@Mit$";

const char* server = "http://localhost";//"192.168.248.8";//"http://localhost";
const int port = 5000;
const char* resource = "/api/cloud_transmission";
char jsonOutput[128];

const unsigned long HTTP_TIMEOUT = 10000;
const size_t MAX_CONTENT_SIZE = 512;

float moisture_percentage;
float Temperature;
float Humidity;
float rzero;
float ppm;
int rainValue;

DHT dht(DHTPin,DHTTYPE);

void setup()
{
  // PinMode
  pinMode(LED, OUTPUT); 
  pinMode(D5,INPUT);// Temp
  pinMode(D6,OUTPUT);// 
  pinMode(D7,OUTPUT);
  pinMode(D8,OUTPUT);
  Serial.begin(9600); // Connection for Soil Moisture
  delay(700);
  
  dht.begin();
  Serial.println(ssid);

  WiFi.begin(ssid,password);

  while(WiFi.status()!=WL_CONNECTED){
    delay(1000);
    Serial.print("....");
  }
  Serial.println("Wifi Connected");
  Serial.println(WiFi.localIP());

}

void readCo2(){
  digitalWrite(D5,HIGH);
  digitalWrite(D6,LOW);
  digitalWrite(D7,LOW);
  delay(100);
  rzero = gasSensor.getRZero();
  Serial.println("rzero");
  Serial.println(rzero);
  delay(500);
  ppm = gasSensor.getPPM();
  Serial.println("ppm");
  Serial.println(ppm);
}

void readMoisture(){
  digitalWrite(D5,LOW);
  digitalWrite(D6,HIGH);
  digitalWrite(D7,LOW);
  
  moisture_percentage =( 100.00 - ( (analogRead(A0)/1023.00) * 100.00 ) ) ;
  Serial.println(analogRead(A0));
  Serial.print("Soil Moisture = ");
  Serial.println(moisture_percentage);
}
void readRainDrop(){
  digitalWrite(D5,LOW);
  digitalWrite(D6,LOW);
  digitalWrite(D7,HIGH);
  delay(100);
  
  rainValue =(analogRead(A0));
  Serial.println("rainValue");
  Serial.println(rainValue);
}


void loop()
{

  
  

//  // Raindrop Sensor 
//
////  int rainAnalogVal =(1024-analogRead(rain_sensor_pin));
//  rainDigitalVal = digitalRead(rain_sensor_pin);
//  
//  if(rainDigitalVal ==1){
//   Serial.println("Rain Happening"); 
//  }
//  else{
//    Serial.println("Rain Not Happening"); 
//  }
//    
//  
//  // Soil Moisture 
//  
//
//  moisture_percentage = (100.00-((analogRead(moisture_sensor_pin)/1023.00)*100.00)) ;
//  Serial.print("Soil Moisture = ");
//  Serial.println(moisture_percentage);
//  
//
  // Humidity Sensor
  

  Temperature = dht.readTemperature();
  Humidity=dht.readHumidity();

  Serial.println("Temperature");
  Serial.println(Temperature);
  delay(2000);
  Serial.println("Humidity");
  Serial.println(Humidity);
  
  
// CO2 Sensor

  //rzero = gasSensor.getRZero();
  //Serial.println("rzero");
  //Serial.println(rzero);
  //delay(200);
  //ppm = gasSensor.getPPM();
    //Serial.println("ppm");

  //Serial.println("41");

  readCo2();
  delay(500);
  readMoisture();
  delay(300);
  readRainDrop();
  delay(300);


  digitalWrite(LED, HIGH); 
  delay(1000); 
// Sending data to the API Endpoint 

  const size_t capacity = JSON_ARRAY_SIZE(3) + JSON_OBJECT_SIZE(3) + JSON_OBJECT_SIZE(6);
  DynamicJsonBuffer jsonBuffer(capacity);
  
  JsonObject& root = jsonBuffer.createObject();
  root["id"] = "Sensor1";
  root["ttime"] = 1351824120;
  
  root["moisture"] = 192.2;
  root["temperature"] = 23.4;
  root["humidity"] = 23;
  root["co2"] = 400;
  root["rainsensor"] = 233;
  root["n"] = 233;
  root["p"] = 233;
  root["k"] = 233;
  char JSONmessageBuffer[400];
  root.prettyPrintTo(JSONmessageBuffer,sizeof(JSONmessageBuffer));
  Serial.println(JSONmessageBuffer);
  
  //root.printTo(Serial);


  HTTPClient http;

  http.begin(client,"http://api.openweathermap.org");
  http.addHeader("Content-Type","application/json");

  int httpCode= http.POST(JSONmessageBuffer);
  String payload = http.getString();

  Serial.println(httpCode);
  Serial.println(payload);
  
}
