# _find.js

Simple wrapper around the (fast) native selector methods that modern browsers support. 

This library only supports basic selectors (id, class and tags).

A basic performance test can be found [here] (http://jsperf.com/find-js).

# Example

```javascript
var elements = _find().byId("foo").byClass("bar").elements();
```

# Supported selectors

```
<div id="a">
  <div class="c1 c2"></div>
  <div class="c2 c3 c4"></div>
  <div class="c3 c4"></div>
</div>
<div id="b">
  <div class="c1 c2"></div>
  <div class="c2 c3 c4"></div>
  <div class="c3 c4"></div>
</div>
```

| Operation          | Result        |
| ------------------ | ------------- |
| _find().byId("a")  | div#a         |
| Content Cell       | Content Cell  |

# Browser support
This library uses the following native methods:

* getElementById
* [getElementsByClassName] (http://caniuse.com/getelementsbyclassname)
* getElementsByTagName

**Summary:** IE9+



