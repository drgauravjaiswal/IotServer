$(document).ready(function() {

	// Update in fixed intervals
	setInterval(function() {
	
	console.log('Reading data...');
	var tableContent = '<tr> <td>TimeStamp </td><td>Acc_X</td><td>Acc_Y</td><td>Acc_Z</td><td>Gyro_X</td><td>Gyro_Y</td><td>Gyro_Z</td></tr>';
	
	$.getJSON('/api/data?elements=15', function(data) {
		$.each(data, function() {
			tableContent += '<tr>';
	    	tableContent += '<td>' + this.timestamp + '</td>';
	    	tableContent += '<td>' + this.acc_x + '</td>';
			tableContent += '<td>' + this.acc_y + '</td>';
			tableContent += '<td>' + this.acc_z + '</td>';
			tableContent += '<td>' + this.gyro_x + '</td>';
			tableContent += '<td>' + this.gyro_y + '</td>';
			tableContent += '<td>' + this.gyro_z + '</td>';
	    	tableContent += '</tr>';
		});

		$('.json-table').html(tableContent);
	});
	}, 1000);
});