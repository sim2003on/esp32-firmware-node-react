#include <Arduino.h>
#include <DHT.h>

DHT dhtSensor(0, DHT22);

void setupDHT(int pin)
{
	dhtSensor = DHT(pin, DHT22);
	dhtSensor.begin();
}

float readTemperature()
{
	return dhtSensor.readTemperature();
}

float readHumidity()
{
	return dhtSensor.readHumidity();
}
