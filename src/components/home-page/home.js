define(["knockout", "text!./home.html", "mapping"], function(ko, homeTemplate, map) {

  function HomeViewModel(route) {
    this.layout = map.fromJS({
    	layout: 'a=/b',
    	showConfiguration: true,
    	b: {
    		html: 'network',
    		widget: '',
    		params: ''
    	}
    });
  }
    
  return { viewModel: HomeViewModel, template: homeTemplate };

});
