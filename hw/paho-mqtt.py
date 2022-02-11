from pprint import isreadable
from time import sleep
import paho.mqtt.client as mqtt
import random
import RPi.GPIO as GPIO
import json

GPIO.setmode(GPIO.BCM)
GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# 초기 설정 값
tempCount = 0
topic = "test/5/location"
subTopic = "test/5/#"
clientName = "ChaKeyJoBa01"

# Mocking을 위해 필요한 임시 Data들
curDrivenDistance = 0
curDoorStatus = False
locationPreset= {
    "{\"latitude\":\"37.47\",\"longitude\":\"127.0\"}",
    "{\"latitude\":\"37.47\",\"longitude\":\"127.0\"}",
    "{\"latitude\":\"37.47\",\"longitude\":\"127.0\"}",
    "{\"latitude\":\"37.47\",\"longitude\":\"127.0\"}",
    "{\"latitude\":\"37.47\",\"longitude\":\"127.0\"}"
}
isReported = False


# mqtt broker서버와 연결되면 paho/test를 subscribe
def onConnect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe(topic)

# message를 받으면 표시
def onMessage(client, userdata, msg):
    print(msg.topic)
    print(msg.payload)

# message를 publish할 때 실행
def onPublish(client, userdata, mid):
    print("Published to " + topic)

# client가 어떤 topic에 subscribe하면 실행
def onSubscribe(client, userdata, mid, grated_qos):
    print("Subscribed to " + topic)

# GPIO rising edge가 감지하면 실행
def risingEdge(channel):
    global tempCount
    print("Rising edge Detacted! tempCount: ", tempCount)
    tempCount += 1
    publishMessage = json.dumps({"tempCount":tempCount})
    client.publish(topic, publishMessage, 0)


# mqtt client를 지정된 이름으로 생성
client = mqtt.Client(clientName)

# client callback 함수지정
client.on_connect = onConnect
client.on_message = onMessage
client.on_subscribe = onSubscribe

# mosquitto username & password
client.username_pw_set(username="client", password="a104client")

# client 접속
client.connect("i6a104.p.ssafy.io", 1883, 60)
client.loop_start()

# GPIO핀에 Rising Edge가 감지될 때 callback함수 실행
GPIO.add_event_detect(23, GPIO.RISING, callback=risingEdge, bouncetime=100)

# 계속 sleep하다가 Ctrl+C로 종료시키면 GPIO.cleanup() 실행
while True:
    try:
        sleep(5)
        if(curDoorStatus):
            isReported = False
            curDrivenDistance += random.random()
            # publishMessage = json.dumps({"drivenDistance":curDrivenDistance})
            client.publish(topic, publishMessage, 0)
        elif (not isReported):
            isReported = True
            publishMessage = locationPreset[random.randint(0,4)]
            client.publish(topic, publishMessage, 0)
    except KeyboardInterrupt:
        print("\nBye!")
        client.loop_stop()
        GPIO.cleanup()
        break

