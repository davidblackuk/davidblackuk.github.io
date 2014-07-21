

$(function(){

	$("#demo").cDash({
		type: "thermometer",
		theme: "paper",
		value: {value: 50},
		orientation: "E"
	});

	window.setInterval(function(){

		$("#demo").data('dbDashboard').value(Math.random()*100);

	}, 1500)

});