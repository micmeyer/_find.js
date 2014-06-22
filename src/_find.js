/* exported _find */

var _find = (function (document) {

    "use strict";

    // constructor
    function Finder() {
        this.first = true;
        this.result = null;
    }

    Finder.prototype.byId = function (value) {
        if (this.first) {
            this.first = false;

            var element = document.getElementById(value);
            if (element !== null) {
                this.result = [element];
            } else {
                this.result = [];
            }

        } else {
            // Calling byId after having called an other method is wrong...
        }

        return this;
    };

    Finder.prototype.byClass = function (value) {
        if (this.first) {
            this.first = false;

            // Search in the entire DOM
            this.result = document.getElementsByClassName(value);
        } else if (this.result.length === 0) {
            // Previous search did not lead to any elements, so this one can't either
            return this.result;
        } else {
            var elements = [];

            // Use each element from the previous search(es) as root
            this.result.forEach(function (element) {
                elements = elements.concat(element.getElementsByClassName(value));
            });

            this.result = elements;
        }

        return this;
    };

    Finder.prototype.byTag = function (value) {
        if (this.first) {
            this.first = false;

            // Search in the entire DOM
            this.result = document.getElementsByTagName(value);
        } else if (this.result.length === 0) {
            // Previous search did not lead to any elements, so this one can't either
            return this.result;
        } else {
            var elements = [];

            // Use each element from the previous search(es) as root
            this.result.forEach(function (element) {
                elements = elements.concat(element.getElementsByTagName(value));
            });

            this.result = elements;
        }

        return this;
    };

    Finder.prototype.element = function () {
        return this.result.length !== 0 ? this.result[0] : null;
    };

    Finder.prototype.elements = function () {
        return this.result;
    };

    // Usage: _find().byId("foo").element();
    return function () {
        return new Finder();
    };
})(document);
