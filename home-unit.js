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

/*
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

port.on('readable', function () {
  console.log('Data:', port.read())
})

*/

/*
const SerialPort = require('serialport')
const Readline = SerialPort.parsers.Readline
const port = new SerialPort('/dev/ttyACM0')
const parser = new Readline()
port.pipe(parser)
parser.on('data', console.log)
port.write('1\n')
// ROBOT ONLINE


port.on('readable', function () {
  console.log('Data:!', port.read())
})

// Switches the port into "flowing mode"
port.on('data', function (data) {
  console.log('Data:', data)
})

*/
//https://medium.com/@machadogj/arduino-and-node-js-via-serial-port-bcf9691fab6a
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyACM0', { baudRate: 57600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
// Read the port data
port.on("open", () => {
  console.log('serial port open');
	port.write('1\n');
	port.write('2\n');
	
});
parser.on('data', data =>{
  console.log('got word from arduino:', data);
	port.write('2\n');
	if(data == " TODO TWEET GEN"){
		 console.log('YAS');
	}
});


