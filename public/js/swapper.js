'use strict';

$(document).ready(function() {
	initializePage();
})

function initializePage() {
	console.log("\n\n\n");
	$('.card-body').click(swap);
}

function swap(e) {
	e.preventDefault();
	var el = $(this);
	var calories = el.find('.meal-details').html();
	calories = parseInt(calories.substring(0, calories.indexOf(' ')));
	var reqlink = '/submit?dietary=&location=&meals=1&min=' + (calories-100) + '&max=' + (calories+100);
	$.get(reqlink, function(result) {
		result = $(result).find('.card-body').html();
		el.html(result);
	});
}
