'use strict'

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://broker.hivemq.com')

client.on('connect', () => {
	client.subscribe("Group12Test/Tweety/Post")
	client.subscribe("Group12Test/Lucibel/On")
	client.subscribe("Group12Test/Lucibel/Off")
})

client.on('message', (topic, message) => {
  switch (topic) {
    case "Group12Test/Tweety/Post":
		console.log(message+"!")
    case "Group12Test/Lucibel/On":
    	console.log(message+"!")
    default:
    	console.log('No handler for topic %s', topic)
  }
})


const SerialPort = require('serialport')
const port = new SerialPort('/dev/ttyACM0', function (err) {
  if (err) {
    return console.log('Error: ', err.message)
  }
})


// Switches the port into "flowing mode"
port.on('data', function (data) {
  console.log('Data:', data)
})

port.write('1', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message written')
})

