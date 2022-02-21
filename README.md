# link-to-count-data-set
a link-to count data set

# Install
```
npm install link-to-count-data-set
```

# Usage & Api
```javascript
var link_to_count_data_set = require("link-to-count-data-set");

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

done(!(
	JSON.stringify(ds.data) === JSON.stringify(expect) &&

	log.join(",") === "a1,1,a1,2,a2,2"
));

```
