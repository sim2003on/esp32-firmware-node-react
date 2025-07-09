#ifndef WEBSOCKET_HANDLER_H
#define WEBSOCKET_HANDLER_H

void setupWebSocket();
void webSocketLoop();
void sendWebSocketMessage(const String &message);

#endif
