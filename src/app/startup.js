define(['jquery', 'knockout', './router', 'dataprovider', 'bootstrap', 'knockout-projections'], function($, ko, router, dp) {

  // !!! ALL ko.components.register() line that are commented out will not be compiled in the dist/ !!!
  
  // Components can be packaged as AMD modules, such as the following:
  ko.components.register('nav-bar', { require: 'components/nav-bar/nav-bar' });
  ko.components.register('home-page', { require: 'components/home-page/home' });

  // [Scaffolded page registrations will be inserted here. To retain this feature, don't remove this comment.]

  ko.components.register('cadviewer', { require: 'standard_components/cadviewer/cadviewer' });

  ko.components.register('scatter-plot', { require: 'standard_components/scatter-plot/scatter-plot' });

  ko.components.register('datatable', { require: 'standard_components/datatable/datatable' });

  ko.components.register('engrid-simple', { require: 'standard_components/engrid-simple/engrid-simple' });

  // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

  // Make global
  window.dp = dp;
  window.router = router;

  // Start the application
  ko.applyBindings({ route: router.currentRoute, routes: router.routes });
});
