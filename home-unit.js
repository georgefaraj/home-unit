'use strict'

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://broker.hivemq.com')
var QUETZA = 0
var SAN = 0
var LUCIBEL = 1
var GRITO = 0

client.on('connect', () => {
  console.log("MQTT Connected")
})

if(QUETZA == 1){
  const exec = require('child_process').exec;
  var yourscript = exec('python Quetza.py',(error, stdout, stderr) => {
    console.log("STDOUT="+`${stdout}`);
    console.log(`${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
}

if(SAN == 1){
  const exec = require('child_process').exec;
  var yourscript = exec('./San.sh',(error, stdout, stderr) => {
    console.log("STDOUT="+`${stdout}`);
    console.log(`${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  }); 
}


client.on('connect', () => {
	console.log("MQTT Connected")
})


var lightON = null
var lightOFF = null

client.on('message', (topic, message) => {
  switch (topic) {
    case "Nanika/USERNAME/Raspberry/Lucibel/on":
		  console.log(message+"!")
      lightON()
    case "Nanika/USERNAME/Raspberry/Lucibel/off":
      console.log(message+"!")
      lightOFF()
    case "Group12Test/Lucibel/On":
    	console.log(message+"!")
    default:
    	console.log('No handler for topic %s', topic)
  }
})

if(LUCIBEL == 1){
  //https://medium.com/@machadogj/arduino-and-node-js-via-serial-port-bcf9691fab6a
  const SerialPort = require('serialport');
  const Readline = require('@serialport/parser-readline');
  const port = new SerialPort('/dev/ttyACM0', { baudRate: 57600 });
  const parser = port.pipe(new Readline({ delimiter: '\n' }));
  // Read the port data
  port.on("open", () => {
    console.log('Serial Port Open');  
  });
  /*
  parser.on('data', data =>{
    client.publish("Nanika/USERNAME/Raspberry/Grito/state",data)
    console.log("Published "+data.toString())
  });
  */
}

/*

if(GRITO == 1){
  //https://medium.com/@machadogj/arduino-and-node-js-via-serial-port-bcf9691fab6a
  const SerialPort2 = require('serialport');
  const Readline2 = require('@serialport/parser-readline');
  const port2 = new SerialPort2('/dev/ttyACM1', { baudRate: 57600 });
  const parser2 = port.pipe(new Readline({ delimiter: '\n' }));
  lightOFF = function (){
    port.write('1\n');
    port.write('1\n');
    port.write('1\n');
    port.write('1\n');
  }
  lightON = function (){
    port.write('2\n');  
    port.write('2\n');  
    port.write('2\n');  
    port.write('2\n');  
  }
  // Read the port data
  port2.on("open", () => {
    console.log('Serial Port Open'); 
  });
  parser2.on('data', data =>{
    //client.publish("Nanika/USERNAME/Raspberry/Grito/state",data)
    //console.log("Published "+data.toString())
    console.log()
  });
}
*/
