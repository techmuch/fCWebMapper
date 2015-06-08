// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "knockout":             "bower_modules/knockout/dist/knockout",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "text":                 "bower_modules/requirejs-text/text",
        "davclient":            "bower_modules/davclient/bin/davclient",
        "huddle":               "bower_modules/huddlejs/api",
        "dataLoader":           "app/dataLoader",
        "dataprovider":         "app/dataprovider",
        "q":                    "bower_modules/q/q",
        "q-xhr":                "bower_modules/q-xhr/q-xhr",
        "d3":                   "bower_modules/d3/d3",
        "mapping":              "bower_modules/bower-knockout-mapping/knockout.mapping",
        "lodash": 				"bower_modules/lodash/lodash"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] }
    }
};
