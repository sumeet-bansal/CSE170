function checkLoginState() {
	FB.getLoginStatus(function(response) {
		return res.redirect('/');
	});
}