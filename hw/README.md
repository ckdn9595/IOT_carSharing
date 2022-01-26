# HW code

# MQTT Client

- Eclipse Paho™ MQTT Python Client를 사용하여 구현.

| ![rp2_pinout.png](../public/rp2_pinout.png) |
| ------ |
| 출처: *https://docs.microsoft.com/ko-kr/windows/iot-core/learn-about-hardware/pinmappings/pinmappingsrpi* |

- GPIO 23과 GND를 각각 Tact Switch에 연결.

- Raspberry Pi에서 아래의 순으로 실행.
    1. `pip3 install paho-mqtt`
    2. `python3 paho-mqtt.py`

# MQTT Broker

- Eclipse Mosquitto™를 사용하여 구현.
- `mosquitto_sub -t "토픽" -u "계정" -P "비밀번호"` 로 간단하게 localhost의 MQTT Broker에 접속하여, 지정된 "토픽"을 subscribe하여 MQTT publisher의 동작 확인 가능.
