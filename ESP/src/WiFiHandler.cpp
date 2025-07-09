#include <Arduino.h>
#include <WiFi.h>
#include <private.h>

void connectToWiFi()
{
	Serial.print("Connecting to WiFi...");
	WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
	while (WiFi.status() != WL_CONNECTED)
	{
		delay(500);
		Serial.print(".");
	}
	Serial.println("\nWiFi connected!");
}
