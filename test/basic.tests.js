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
    $fixture.append("<div id='foo'><span></span><span class='bar'>hello</span></div><span class='bar'></span>");

    var elements = _find().byId("foo").byTag("span").byClass("bar").elements();
    assert.ok(elements.length === 1);
    assert.ok(elements[0].innerText === "hello");
});
