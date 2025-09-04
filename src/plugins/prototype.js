String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.capitalizeFirstLowerCase = function () {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

String.prototype.stringFirstUpperCase = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.stringFirstLowerCase = function () {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

String.prototype.replacecomma = function () {
    return this.replace(",", "").capitalizeFirstLetter();
}

String.prototype.replacecHipon = function () {
    return this.replace(/_/gi, ".").toLowerCase();
}

String.prototype.replacecUrl = function () {
    return this.replace(/_/gi, "/").toLowerCase();
}

String.prototype.replacecUrlwindows = function () {
    return this.replace(/_/gi, "\\").toLowerCase();
}

String.prototype.replacecUrlwindows2 = function () {
    let r = this.replace(/\//gi, "\\").toLowerCase();
    r = r.replace(/_/gi, "\\");
    r = r.replace(/\./gi, "\\");
    return r;
}

String.prototype.replacecUrlDot = function () {
    let r = this.replace(/\./gi, "/");
    return r.toLowerCase();
}