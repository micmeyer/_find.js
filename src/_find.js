/* global document */
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
            throw "You are calling byId() after having called an other method. For performance reasons you should call byId() first.";
        }

        return this;
    };

    Finder.prototype.toArray = function (htmlCollection) {
        if (htmlCollection !== null) {
            var length = htmlCollection.length;

            if (htmlCollection.length > 0) {
                var result = new Array(htmlCollection.length);
                for (var i = 0; i < length; i++) {
                    result[i] = htmlCollection[i];
                }

                return result;
            }
        }

        return [];
    };

    Finder.prototype.byClass = function (value) {
        if (this.first) {
            this.first = false;

            // Search in the entire DOM
            var htmlCollection1 = document.getElementsByClassName(value);
            this.result = this.toArray(htmlCollection1);
        } else if (this.result.length === 0) {
            // Previous search did not lead to any elements, so this one can't either
            return this.result;
        } else {
            var newResult = [];

            // Use each element from the previous search(es) as root
            var length = this.result.length;
            for (var i = 0; i < length; i++) {
                var htmlCollection2 = this.result[i].getElementsByClassName(value);
                newResult = newResult.concat(this.toArray(htmlCollection2));
            }

            this.result = newResult;
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
            var newResult = [];

            // Use each element from the previous search(es) as root
            this.result.forEach(function (element) {
                var elements = element.getElementsByTagName(value);

                if (elements.length > 0) {
                    newResult = newResult.concat(Array.prototype.slice.call(elements));
                }
            });

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
