
//global variable, for html page, refer tpsvr @ npm.
link_to_count_data_set = require("../link-to-count-data-set.js");

module.exports = {

	"link_to_count_data_set": function (done) {

		var log = [];

		//.class( [fromDataCallback(fromData, item)] )
		var ds = new link_to_count_data_set.class(
			function (fromData, item) { log.push(fromData, item.count); }
		);

		//add(from, to [, fromData] )
		ds.add("a", "b", "a1");
		ds.add("a", "c", "a1");
		ds.add("a", "c", "a2");

		//toItem: { from, count, to:{to->1}, fromData:{fromData->1} }
		var expect = {
			"a": {
				from: "a",
				count: 2,
				to: { "b": 1, "c": 1 },
				fromData: { "a1": 1, "a2": 1 },
			}
		};

		//console.log(JSON.stringify(ds.data));
		//console.log(JSON.stringify(expect));
		//console.log(log.join(","));
		//console.log("a1,1,a1,2,a2,2");

		done(!(
			JSON.stringify(ds.data) === JSON.stringify(expect) &&

			log.join(",") === "a1,1,a1,2,a2,2"
		));
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('link_to_count_data_set', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(5000); } });
