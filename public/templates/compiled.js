define(
	[
		'handlebars',
		'text!templates/homepage.html'
	],
	function(
		Handlebars,
		HomepageTpl
	) {
		return {
			HomepageTemplate: Handlebars.compile(HomepageTpl)
		};
	}
);