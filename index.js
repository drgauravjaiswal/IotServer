const express = require('express');
const app = new express();
const fs = require('fs');
const path = require('path');
const api = require('./routes/api');
const mongo = require('mongodb');
const monk = require('monk');
const db =  monk('localhost:27017/test');

const UDP_PORT = 4000;
const UDP_HOST = '192.168.0.140'; // local network
const dgram = require('dgram');
const server = dgram.createSocket('udp4');


// UDP Server
server.on('listening', function() {
	var address = server.address();
	console.log('UDP Server listening on ' + address.address + ":" + address.port);
});
server.on('message', function(message, remote) {
	//console.log(remote.address + ":" + remote.port + ' - ' + message);
	try{
		const packet_data = String(message).trim()
		var packet = packet_data.split(',');
		//console.log(packet );
		var json = {
			timestamp: packet[0],
			acc_x: packet[1],
			acc_y: packet[2],
			acc_z: packet[3],
			gyro_x:packet[4],
			gyro_y:packet[5],
			gyro_z:packet[6],
			mag_x:packet[7],
			mag_y:packet[8],
			mag_z:packet[9],
		}
		console.log(json);

		data = db.get('data');
		data.insert(json, function(err, doc){
				if (err) console.log('Error : ' + err);
		 	});
	} catch(e) {
		console.log('Error : ' + e);
		//console.log(remote.address + ":" + remote.port + ' - ' + message);
	}
});
server.bind(UDP_PORT, UDP_HOST);

app.use('/api', api);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);