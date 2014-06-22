/* global QUnit, jQuery, _find */

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
