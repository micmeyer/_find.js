# _find.js

Simple wrapper around the (fast) native selector methods that modern browsers support. 

This library only supports basic selectors (id, class and tags).

A basic performance test can be found [here] (http://jsperf.com/find-js).

# Example

```javascript
var elements = _find().byId("foo").byClass("bar").elements();
```

# Browser support
This library uses the following native methods:

* getElementById
* [getElementsByClassName] (http://caniuse.com/getelementsbyclassname)
* getElementsByTagName

**Summary:** IE9+



