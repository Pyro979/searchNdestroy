String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
}
String.prototype.ltrim = function() {
    return this.replace(/^\s+/, "");
}
String.prototype.rtrim = function() {
    return this.replace(/\s+$/, "");
}

String.prototype.blank = function() {
    return !this || !/\S/.test(this.escapeRegExp());
}

String.prototype.alphaOnly = function() {
    return this.replace(/[^A-Za-z]/g, "");
}

String.prototype.alphaSpaceOnly = function() {
    return this.replace(/[^A-Za-z ]/g, "");
}

String.prototype.alphaNumUnderscoreOnly = function() {
    return this.replace(/[^a-zA-Z0-9_]/g, "");
}

String.prototype.alphaNumOnly = function() {
    return this.replace(/[^A-Za-z0-9]/g, "");
}

String.prototype.digitOnly = function() {
    return this.replace(/[^\d]/g, "")
}

String.prototype.isFloat = function() {
    return this.search(/^([+-]?(((\d+(\.)?)|(\d*\.\d+))([eE][+-]?\d+)?))$/) == 0;
}

String.prototype.isInt = function() {
    return this.search(/^[-+]?\d*$/) == 0;
}

String.prototype.isPosInt = function() {
    return this.search(/^\d+$/) == 0;
}

String.prototype.isPercentage = function() {
    var pct = parseInt(this);
    return (!isNaN(pct) && pct >= 0 && pct <= 100);
}

String.prototype.isDigitOnly = function() {
    return this.search(/[A-Za-z]/) == -1;
}

String.prototype.isCapitalLetter = function() {
    return this.search(/[A-Z]/) == 0;
}

String.prototype.endsWith = function(str) {
    return (this.match(str.escapeRegExp() + "$") == str)
}

String.prototype.startsWith = function(str) {
    return (this.match("^" + str.escapeRegExp()) == str)
}

String.prototype.contains = function(str) {
    return (this.indexOf(str) != -1)
}

String.prototype.toSimpleCode = function() {
    return this.replace(/[ ]/g, "_").replace(/[^A-Za-z0-9\_]/g, "");
}

String.prototype.repeatXTimes = function(x) {
    return Array(x + 1).join(this);
}

//http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
String.prototype.escapeRegExp = function() {
    return this.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

String.prototype.firstToUpperCase = function() {
    return this.substr(0, 1).toUpperCase() + this.substr(1);
}
String.prototype.firstToLowerCase = function() {
    return this.substr(0, 1).toLowerCase() + this.substr(1);
}

String.prototype.wordCount = function() {
    return _.without(this.replace(/\n/g, " ").split(" "), "").length;
}
