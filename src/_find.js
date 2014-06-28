/* global document */
/* exported _find */

var _find = (function (document) {

    "use strict";

    // constructor
    function Finder(context) {
        if (typeof context !== "undefined") {
            // Initialize with existing result
            this.first = false;

            if (context instanceof Array) {
                this.result = context;
            } else {
                this.result = [context];
            }
        } else {
            // Initialize for new search
            this.first = true;
            this.result = null;
        }
    }

    Finder.prototype.byId = function () {
        if (this.first) {
            this.first = false;
            this.result = [];

            var length = arguments.length;
            for (var i = 0; i < length; i++) {
                var id = arguments[i];
                var element = document.getElementById(id);

                if (element !== null) {
                    this.result.push(element);
                }
            }
        } else {
            throw new Error("You are calling byId() after having called an other method. For performance reasons you should call byId() first.");
        }

        return this;
    };

    Finder.prototype.toArray = function (htmlCollection) {
        if (htmlCollection !== null) {
            var length = htmlCollection.length;

            if (length > 0) {
                // return Array.prototype.slice.call(htmlCollection);
                // Initialize with correct size (This has huge impact on performance)
                var result = new Array(htmlCollection.length);
                for (var i = 0; i < length; i++) {
                    result[i] = htmlCollection[i];
                }

                return result;
            }
        }

        return [];
    };

    Finder.prototype.byClass = function (classes) {
        if (this.first) {
            this.first = false;

            // Search in the entire DOM
            var htmlCollection1 = document.getElementsByClassName(classes);
            this.result = this.toArray(htmlCollection1);
        } else if (this.result.length >= 1) {
            // Only execute this logic if the previous search returned at least one result

            var newResult = [];

            var length = this.result.length;
            for (var i = 0; i < length; i++) {
                // Use each element from the previous search(es) as root
                var htmlCollection2 = this.result[i].getElementsByClassName(classes);
                newResult = newResult.concat(this.toArray(htmlCollection2));
            }

            this.result = newResult;
        }

        return this;
    };

    Finder.prototype.byTag = function (tag) {
        if (this.first) {
            this.first = false;

            // Search in the entire DOM
            var htmlCollection1 = document.getElementsByTagName(tag);
            this.result = this.toArray(htmlCollection1);
        } else if (this.result.length >= 1) {
            // Only execute this logic if the previous search returned at least one result

            var newResult = [];

            // Use each element from the previous search(es) as root
            var length = this.result.length;
            for (var i = 0; i < length; i++) {
                var htmlCollection2 = this.result[i].getElementsByTagName(tag);
                newResult = newResult.concat(this.toArray(htmlCollection2));
            }

            this.result = newResult;
        }

        return this;
    };

    Finder.prototype.toFilteredArray = function (htmlCollection, clazz) {
        if (htmlCollection !== null) {
            var length = htmlCollection.length;

            if (length > 0) {
                // Make array too big and reduce size once
                var result = new Array(length);
                var resultSize = 0;

                for (var i = 0; i < length; i++) {
                    var element = htmlCollection[i];

                    if (element.className.split(/\s/).indexOf(clazz) >= 0) {
                        result[resultSize++] = element;
                    }
                }

                // Fix size if needed
                if (length !== resultSize) {
                    result.length = resultSize;
                }

                return result;
            }
        }

        return [];
    };

    Finder.prototype.byTagAndClass = function (tag, clazz) {
        if (this.first) {
            this.first = false;

            // Search in the entire DOM
            var htmlCollection1 = document.getElementsByTagName(tag);
            this.result = this.toFilteredArray(htmlCollection1, clazz);
        } else if (this.result.length >= 1) {
            // Only execute this logic if the previous search returned at least one result
            var newResult = [];

            // Use each element from the previous search(es) as root
            var length = this.result.length;
            for (var i = 0; i < length; i++) {
                var htmlCollection2 = this.result[i].getElementsByTagName(tag);
                newResult = newResult.concat(this.toFilteredArray(htmlCollection2, clazz));
            }

            this.result = newResult;
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
    return function (context) {
        return new Finder(context);
    };
})(document);
