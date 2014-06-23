# _find.js

Simple wrapper around the (fast) native selector methods that modern browsers support. 

This library only supports basic selectors (id, class and tags).

A basic performance test can be found [here] (http://jsperf.com/find-js).

# Example

```javascript
// Single result (@see #element() at the end)
var element = _find().byId("foo").element();

// Multiple result (@see #elements() at the end)
var elements = _find().byId("foo").byClass("bar").elements();

// Re-use context
var context = _find().byId("foo").element();
var search1 = _find(context).byClass("a").elements();
var search2 = _find(context).byClass("b").elements();
```

# Supported selectors

```
<div id="a">
  <div class="c1 c2"></div>
  <div class="c2 c3 c4"></div>
  <div class="c3 c4"></div>
  <span id="z"></span>
</div>
<div id="b">
  <div class="c1 c2"></div>
  <div class="c2 c3 c4"></div>
  <div class="c3 c4"></div>
</div>
```

| Basic operations                     | Result                                            |
| ------------------------------------ | ------------------------------------------------- |
|  _find().byId("a")                   | div#a                                             |
|  _find().byId("a", "b")              | div#a, div#b                                      |
|  _find().byClass("c1")               | div.c1.c2, div.c1.c2                              |
|  _find().byClass("c3 c4")            | div.c2.c3.c4, div.c3.c4, div.c2.c3.c4, div.c3.c4  |
|  _find().byTag("span")               | span#z                                            |
|  _find().byTagWithClass("div", "c1") | div.c1                                            |

# Browser support
This library uses the following native methods:

* getElementById
* [getElementsByClassName] (http://caniuse.com/getelementsbyclassname)
* getElementsByTagName

**Summary:** IE9+



