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
const carId = 5;

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

    if (slicedTopic[1] === carId) {
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
    }
});

router.get('/:carSeq/control', async (req, res) => {
    try {
        const topic = `test/${req.params.carSeq}/control`;
        console.log(topic);
        const {
            door,
            alram,
        } = req.body;
        const data = {"door":door,"alram":alram };
        mqttServer.publish(topic, JSON.stringify(data));
        return res.status(200).json({
            success: true
        });    
    } catch (error) {
        return res.status(400).json({
            error: error
        });   
    }
});

module.exports = router;