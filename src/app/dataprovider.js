define(['q','q-xhr','knockout','dataLoader','mapping'], function(q,Q,ko,dl,map) {

	/*
		The dataprovider (dp) houses the main application logic and the interface for which prepared data is served to widgets

	*/


	function grabUrlEncodedVariables(){
		var o = {};
		var s = location.search.split('?');
		for (var i = 1; i < s.length; i++) {
			var a = s[i].split('&');
			for (var j = 0; j < a.length; j++) {
				var v = a[j].split('=');
				o[v[0]] = v[1];
			};
		};
		return o;
	}

	function Dataprovider() {
	  	var self = this;

	  	// variables and functions starting "self." are externally accessible
	  	self.huddleProjectId = '';
	  	
	  	// grabUrlEncodedVariables() needs to run before the url can change.
	  	self.urlEncodedVariables = grabUrlEncodedVariables();
	  	self.resourceUrl = typeof self.urlEncodedVariables.resource_url !== 'undefined' ? self.urlEncodedVariables.resource_url : '';
	  	

	  	// The following are examples of observable variables look up knockoutjs.org for more information
	  	// self.variable1 = ko.observable()
	  	// self.variable2 = ko.observableArray([])


	  	// The following is an example of how the dataprovider (dp) can be broken into smaller modules
	  	// In the example the dl module handles the reading in of data files

	  	/*dl.GET(path)
	  	.then(function(resp){
	  		var data = map.fromJS(resp.data)
	  		self.data(data);
	  	})*/
	}

	return new Dataprovider();
});
