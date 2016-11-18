$(document).ready(function() {
	$('.parent').append('<div class="child"><p class="child__text">Static</p></div>');
	$('.parent__button').click(function() {
		$('.child').addClass('changed').html('<p class="child__text">Active</p>');
	});
});