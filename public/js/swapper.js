'use strict';

$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$('.swap-link').click(swap);
}

function swap(e) {
	e.preventDefault();

	var sumel = $(this).closest('.container').find('.summary');
	var summary = sumel.text();

	var el = $(this).closest('.card-body');
	var item = el.find('.meal-details');

	var calsum = parseInt(summary.substring(summary.indexOf('with ') + 'with '.length, summary.indexOf(' cal')));
	var pricesum = parseFloat(summary.substring(summary.indexOf('$') + 1));

	var calories = parseInt(item.find('#item-cal').text().substring(0, item.find('#item-cal').text().indexOf(' ')));
	var price = parseFloat(item.find('#item-dd').text().substring(1));

	calsum -= calories;
	pricesum -= price;

	var dietary = $('#dietary').text();
	var location = $('#location').text().split(',');
	var locparam = '';
	for (var i = 0; i < location.length; i++) {
		locparam += '&location=' + location[i];
	}
	var min = parseInt($('#lower-bound').text());
	var max = parseInt($('#upper-bound').text());

	min -= calsum;
	max -= calsum;

	var reqlink = '/submit?dietary=' + dietary + locparam + '&meals=1&min=' + min + '&max=' + max;

	$.get(reqlink, function(result) {
		result = $(result).find('.card-body');
		result.find('.meal-index').text(el.find('.meal-index').text());
		el.html(result.html());
		el.find('.swap-link').click(swap);

		item = result.find('.meal-details');
		if (item.html() == null) {
			alert("No similar item could be found.");
		} else {
			calsum += parseInt(item.find('#item-cal').text().substring(0, item.find('#item-cal').text().indexOf(' ')));
			pricesum += parseFloat(item.find('#item-dd').text().substring(1));
			summary = "<h4>Here's your custom meal plan with " + calsum +" calories at $" + pricesum.toFixed(2) +".</h4>";
			sumel.html(summary);
		}
	});
}
