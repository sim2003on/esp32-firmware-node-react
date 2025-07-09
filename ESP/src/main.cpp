#include <Arduino.h>
#include "WiFiHandler.h"
#include "WebSocketHandler.h"
#include "DHTHandler.h"

#define DHTPIN 4
#define INTERNAL_LED 2

unsigned long previousMillis = 0;
unsigned long ledOnMillis = 0;

const long interval = 2000;
const long ledDuration = 500;

void setup()
{
  Serial.begin(115200);
  pinMode(INTERNAL_LED, OUTPUT);

  connectToWiFi();
  setupWebSocket();
  setupDHT(DHTPIN);
}

void loop()
{
  webSocketLoop();
  unsigned long now = millis();

  if (digitalRead(INTERNAL_LED) == HIGH && (now - ledOnMillis >= ledDuration))
  {
    digitalWrite(INTERNAL_LED, LOW);
  }

  if (now - previousMillis >= interval)
  {
    previousMillis = now;
    digitalWrite(INTERNAL_LED, HIGH);
    ledOnMillis = now;

    float h = readHumidity();
    float t = readTemperature();

    if (isnan(h) || isnan(t))
    {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }

    Serial.printf("Humidity: %.2f %%\tTemperature: %.2f °C\n", h, t);

    String jsonPayload = "{\"temperature\": " + String(t) + ", \"humidity\": " + String(h) + "}";
    sendWebSocketMessage(jsonPayload);
  }
}
