define(['q-xhr'], function(Q) {

	function Data() {
	  	var self = this;
	  	self.path = null;
	  	self.data = null;

	  	self.success = function(){}
		self.failure = function(){}

	  	self.GET = function(url){
			return Q.xhr.get(url)
			.then(function (resp) {
			    self.data = resp.data;
			    typeof self.success === 'function' ? self.success(resp) : null;
			    return resp;
			}, function (resp) {
			    typeof self.failure === 'function' ? self.failure(resp) : null;
			});
		}	
	}

	return new Data();

});
