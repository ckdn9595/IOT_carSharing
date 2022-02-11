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

mqttServer.on("message", (topic, message) => {
    console.log("received message: ");
    console.log(topic, message.toString());
});

module.exports = router;