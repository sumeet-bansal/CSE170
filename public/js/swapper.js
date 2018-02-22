'use strict';

$(document).ready(function() {
	initializePage();
})

function initializePage() {
	console.log("\n\n\n");
	$('.swap-link').click(swap);
}

function swap(e) {
	e.preventDefault();

	var sumel = $(this).closest('.container').find('.summary');
	var summary = sumel.text();

	var el = $(this).closest('.card-body');
	var item = el.find('.meal-details').html();

	var calsum = parseInt(summary.substring(summary.indexOf('with ') + 'with '.length, summary.indexOf(' cal')));
	var pricesum = parseFloat(summary.substring(summary.indexOf('$') + 1));

	var calories = parseInt(item.substring(0, item.indexOf(' ')));
	var price = parseFloat(item.substring(item.indexOf('$') + 1));

	calsum -= calories;
	pricesum -= price;

	var dietary = $('#dietary').text();
	var location = $('#location').text();
	var min = parseInt($('#lower-bound').text());
	var max = parseInt($('#upper-bound').text());

	min -= calsum;
	max -= calsum;

	var reqlink = '/submit?dietary=' + dietary + '&location=' + location + '&meals=1&min=' + min + '&max=' + max;

	$.get(reqlink, function(result) {
		result = $(result).find('.card-body');
		result.find('.meal-index').text(el.find('.meal-index').text());
		el.html(result.html());
		el.find('.swap-link').click(swap);

		item = result.find('.meal-details').html();
		calsum += parseInt(item.substring(0, item.indexOf(' ')));
		pricesum += parseFloat(item.substring(item.indexOf('$') + 1));
		summary = "<h4>Here's your custom meal plan with " + calsum +" calories at $" + pricesum.toFixed(2) +".</h4>";
		sumel.html(summary);
	});
}
