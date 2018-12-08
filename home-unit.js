'use strict'

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://broker.hivemq.com')
var LED3      = 0
var SWITCH    = 1
var RESISTOR  = 1
var TWEETIFY  = 0

client.on('connect', () => {
  console.log("MQTT Connected")
})

if(TWEETIFY == 1){
  const exec = require('child_process').exec;
  var yourscript = exec('./tweetify.sh',(error, stdout, stderr) => {
    console.log("STDOUT TWEET="+`${stdout}`);
    console.log(`${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
}

if(LED3 == 1){
  const exec = require('child_process').exec;
  var yourscript = exec('./LED3.sh',(error, stdout, stderr) => {
    console.log("STDOUT LED3="+`${stdout}`);
    console.log(`${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  }); 
}


var lightON = null
var lightOFF = null

client.on('message', (topic, message) => {
  switch (topic) {
    case "Server/USERNAME/Raspberry/Switch/on":
      console.log(message+"!")
      lightON()
      break;
    case "Server/USERNAME/Raspberry/Switch/off":
      console.log(message+"!")
      lightOFF()
      break;
    case "Server/USERNAME/Double/on":
      console.log(message+"!!")
      lightON()
      break;
    case "Server/USERNAME/Double/off":
      console.log(message+"!!")
      lightOFF()
      break;
    default:
      console.log('No handler for topic %s', topic)
  }
})

if(SWITCH == 1){
  //https://medium.com/@machadogj/arduino-and-node-js-via-serial-port-bcf9691fab6a
  const SerialPort = require('serialport');
  const Readline = require('@serialport/parser-readline');
  const port = new SerialPort('/dev/ttyACM0', { baudRate: 57600 });
  const parser = port.pipe(new Readline({ delimiter: '\n' }));
  // Read the port data
  port.on("open", () => {
    console.log('Serial Port Open');  
  });
  lightOFF = function (){
    console.log('HERE OFF');
    port.write('1\n');
    port.write('1\n');
    port.write('1\n');
    port.write('1\n');
  }
  lightON = function (){
    console.log('HERE ON');
    port.write('2\n');  
    port.write('2\n');  
    port.write('2\n');  
    port.write('2\n');  
  }
  client.subscribe("Server/USERNAME/Raspberry/Switch/on");
  client.subscribe("Server/USERNAME/Raspberry/Switch/off");
  client.subscribe("Server/USERNAME/Double/on");
  client.subscribe("Server/USERNAME/Double/off");
}

var resistorData = "Dummy"
if(RESISTOR == 1){
  //https://medium.com/@machadogj/arduino-and-node-js-via-serial-port-bcf9691fab6a
  const SerialPort2 = require('serialport');
  const Readline2 = require('@serialport/parser-readline');
  const port2 = new SerialPort2('/dev/ttyACM1', { baudRate: 57600 });
  const parser2 = port2.pipe(new Readline2({ delimiter: '\n' }));
  // Read the port data
  port2.on("open", () => {
    console.log('Serial Port 2 Open'); 
  });
  parser2.on('data', data =>{
    client.publish("Server/USERNAME/Raspberry/Resistor/state",data)
  });
}
