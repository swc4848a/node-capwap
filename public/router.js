define(
	[
		'backbone', 'app'
	],
	function(Backbone, app) {
		var Router = Backbone.Router.extend({
			routes: {
				"": "showIndex",
				"*other": "defaultRouter",
			},
			showIndex: function() {
				app.navigateTo("");
			},
			defaultRouter: function(other) {
				app.navigateTo("other");
			}
		});
		return Router;
	}
);