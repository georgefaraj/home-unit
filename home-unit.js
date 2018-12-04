var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://broker.hivemq.com')

var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var port = new SerialPort("/dev/ttyACM0", {
    baudrate: 57600,
    parser: serialport.parsers.readline("\n")
});

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

port.on("open", function () {
    console.log('open');
    port.on('data', function(data) {
        console.log(data);
    });
});
