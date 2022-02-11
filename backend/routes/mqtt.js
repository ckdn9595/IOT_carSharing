const e = require('express');
const express = require('express');
const db = require('../models/index')
const fs = require('fs');
const mqttListener = require('mqtt');
const router = express.Router();

const options = {
    host: 'i6a104.p.ssafy.io',
    port: 1883,
    protocol: "mqtt",
    username: 'server',
    paaaword: 'a104server',
    reconnectPeriod: 1000,
};

const mqttServer = mqttListener.connect(options);
const topic = 'test/#';

mqttServer.on("connect", () => {
    console.log("mqtt connected");
    mqttServer.subscribe(topic, () => {
        console.log("subscribe to topic: " + topic);
    });
});

mqttServer.on("message", async (topic, message) => {
    console.log("received message: ");
    console.log(topic, message.toString());

    let slicedTopic = topic.split('/');
    let data = JSON.parse(message.toString());

    console.log("parse data: ");
    console.log(data);

    const findCar = await db.tb_car.findOne({where: {car_seq: slicedTopic[1]}});
    console.log(findCar);
    if(findCar) {
        // mosquitto_pub -h i6a104.p.ssafy.io -p 1883 -u client -P a104client -t test/5/location -m "{\"lat\":\"37.50133697705762\", \"lng\":\"127.03945943618835\"}"
        if(slicedTopic[2] == 'location') {
            db.tb_car.update({
                car_dy: data.lat,
                car_dx: data.lng
            }, {
                where: {
                    car_seq: slicedTopic[1]
                }
            });
        // } else if(slicedTopic[2] == 'status') { // mosquitto_pub -h i6a104.p.ssafy.io -p 1883 -u client -P a104client -t test/5/status -m "{\"lat\":\"37.50133697705762\", \"lng\":\"127.03945943618835\"}"
        //     db.tb_car.update({
        //         car_status: data.status
        //     }, {
        //         where: {
        //             car_seq: slicedTopic[1]
        //         }
        //     });
        }
    }
});

module.exports = router;