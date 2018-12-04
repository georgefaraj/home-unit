mqtt = require('mqtt')
client = mqtt.connect('mqtt://iot.eclipse.org')


client.on('connect', () => {
	client.subscribe("Group12Test/hi")
	client.subscribe("Group12Test/bye")
})

client.on('message', (topic, message) => {
  switch (topic) {
    case "Group12Test/hi":
		console.log(message+"!")
    case "Group12Test/bye":
    	console.log(message+"!!!")
  }
  console.log('No handler for topic %s', topic)
})

