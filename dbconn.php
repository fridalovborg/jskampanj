<?php var counter = $('#counter');
$.ajax('output.php').done(function(data) {
	var json = JSON.parse(data)[0].value;
	resault(json);
});

function resault(json) {
	counter.text(json);
}

function addValue() {
	counter.text(parseInt(counter.text()) + 1);

	$.ajax({
		url :'input.php'
	}).done().fail(function(xhr){
		console.log(xhr);
	});
} ?>