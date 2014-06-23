/* global QUnit, jQuery, _find */
/* jshint strict:false */

QUnit.module("Basic tests");

QUnit.test("_find.byId with existing id", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div id='foo'></div>");

    assert.ok(_find().byId("foo").element() !== null);
});

QUnit.test("_find.byId with missing id", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div id='foo'></div>");

    assert.ok(_find().byId("bar").element() === null);
});

QUnit.test("_find.byId (2) with existing id", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div id='a'>tagA</div><div id='b'>tagB</div><div id='c'>tagC</div>");

    var elements = _find().byId("a", "c").elements();
    assert.ok(elements.length === 2);
    assert.ok(elements[0].innerHTML === "tagA");
    assert.ok(elements[1].innerHTML === "tagC");
});

QUnit.test("_find.byId (2) with only one existing id", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div id='a'>tagA</div><div id='b'>tagB</div><div id='c'>tagC</div>");

    var elements = _find().byId("b", "z").elements();
    assert.ok(elements.length === 1);
    assert.ok(elements[0].innerHTML === "tagB");
});

QUnit.test("_find.byClass with existing class", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div class='foo'></div>");

    assert.ok(_find().byClass("foo").element() !== null);
});

QUnit.test("_find.byClass with missing class", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div class='foo'></div>");

    assert.ok(_find().byClass("bar").element() === null);
});

QUnit.test("_find.byClass (a && b)", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div class='a b c'></div>");

    assert.ok(_find().byClass("a c").element() !== null);
});

QUnit.test("_find.byClass (b && c)", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div class='a b c'>tagA</div><div class='b c'>tagB</div><div class='c d'>tagC</div>");

    var elements = _find().byClass("b c").elements();
    assert.ok(elements.length === 2);
    assert.ok(elements[0].innerHTML === "tagA");
    assert.ok(elements[1].innerHTML === "tagB");
});

QUnit.test("_find.byTag with existing tag", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<ul></ul>");

    assert.ok(_find().byTag("ul").element() !== null);
});

QUnit.test("_find.byTag with missing tag", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div></div>");

    assert.ok(_find().byTag("ul").element() === null);
});

QUnit.test("_find.byTagAndClass with existing tag/class", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<ul class='foo'>hello</ul>");

    var elements = _find().byTagAndClass("ul", "foo").elements();
    assert.ok(elements.length === 1);
    assert.ok(elements[0].innerHTML === "hello");
});

QUnit.test("_find.byTagAndClass with missing tag", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div class='foo'></div>");

    assert.ok(_find().byTagAndClass("ul", "foo").element() === null);
});

QUnit.test("_find.byTagAndClass with missing class", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div class='foo'></div>");

    assert.ok(_find().byTagAndClass("div", "bar").element() === null);
});

QUnit.test("_find.byId and byClass", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div id='foo'><span class='bar'></span><span class='bar'></span></div><span class='bar'></span>");

    assert.ok(_find().byId("foo").byClass("bar").elements().length === 2);
});

QUnit.test("_find.byId and byTag", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div id='foo'><span></span><span></span></div><span></span>");

    assert.ok(_find().byId("foo").byTag("span").elements().length === 2);
});

QUnit.test("_find.byId and byTag and byClass", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div id='foo'><span></span><span><div class='bar'>hello</div></span></div><span class='bar'></span>");

    var elements = _find().byId("foo").byTag("span").byClass("bar").elements();
    assert.ok(elements.length === 1);
    assert.ok(elements[0].innerHTML === "hello");
});

QUnit.test("_find.byId and byTagAndClass", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div id='foo'><span></span><span><div class='bar1'>hello</div></span></div><span class='bar2'></span>");

    var elements = _find().byId("foo").byTagAndClass("div", "bar1").elements();
    assert.ok(elements.length === 1);
    assert.ok(elements[0].innerHTML === "hello");
});

QUnit.test("_find.byId and _find.byClass (b && c)", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div id='foo'><div class='a b c'>tagA</div><div class='b c'>tagB</div><div class='c d'>tagC</div></div>");

    var elements = _find().byId("foo").byClass("b c").elements();
    assert.ok(elements.length === 2);
    assert.ok(elements[0].innerHTML === "tagA");
    assert.ok(elements[1].innerHTML === "tagB");
});

QUnit.test("_find with context", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div id='foo'><div class='a b c'>tagA</div></div><div id='bar'><div class='a b c'>tagB</div></div>");

    var root = _find().byId("foo").element();
    // Should only find the div inside of div#foo
    var elements = _find(root).byClass("a").elements();
    assert.ok(elements.length === 1);
    assert.ok(elements[0].innerHTML === "tagA");
});

QUnit.test("_find with context (2)", function (assert) {
    var $fixture = jQuery("#qunit-fixture");
    $fixture.append("<div id='foo'><div class='a b c'>tagA</div></div><div id='bar'><div class='a b c'>tagB</div></div>");

    var root = _find().byId("foo", "bar").elements();
    // Should find result in both divs
    var elements = _find(root).byClass("a").elements();
    assert.ok(elements.length === 2);
    assert.ok(elements[0].innerHTML === "tagA");
    assert.ok(elements[1].innerHTML === "tagB");
});
