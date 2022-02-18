
// link-to-count-data-set @ npm, a link-to count data set.

var linkToCountDataset = {
	data: null,		//map 'from' to 'toItem' {count, to:{to->1}, fromData:{fromData->1}}

	fromDataCallback: null,		//function(fromData,item)

	init: function (fromDataCallback) {
		this.data = {};
		this.fromDataCallback = fromDataCallback;
	},

	//return toItem
	add: function (from, to, fromData) {
		var item = this.data[from];
		if (!item) item = this.data[from] = { count: 0, to: {}, fromData: {} };

		var newFromData;
		if (typeof fromData !== "undefined" && !(fromData in item.fromData)) {
			item.fromData[fromData] = 1;
			newFromData = true;
		}

		if (!item.to[to]) {
			item.to[to] = 1;
			item.count++;
			if (this.fromDataCallback) {
				for (var i in item.fromData) { this.fromDataCallback(i, item); }
			}
		}
		else if (newFromData && this.fromDataCallback) {
			this.fromDataCallback(fromData, item);
		}

		return item;
	},

}

//module

exports["class"] = function (fromDataCallback) {
	var o = Object.create(linkToCountDataset);
	o.init(fromDataCallback);
	return o;
}
