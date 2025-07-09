#include <Arduino.h>
#include <WebSocketsClient.h>
#include <private.h>

WebSocketsClient webSocketClient;

void setupWebSocket()
{
	webSocketClient.begin(WEBSOCKET_HOST, WEBSOCKET_PORT, "/ws");
	webSocketClient.onEvent([](WStype_t type, uint8_t *payload, size_t length)
													{
        if (type == WStype_CONNECTED) {
            Serial.println("WebSocket connected!");
        } else if (type == WStype_DISCONNECTED) {
            Serial.println("WebSocket disconnected!");
        } });
	webSocketClient.setReconnectInterval(5000);
}

void webSocketLoop()
{
	webSocketClient.loop();
}

void sendWebSocketMessage(const String &message)
{
	webSocketClient.sendTXT(message.c_str());
}
