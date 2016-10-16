function setGlobalOptions() {

    var storedPageOptions = getStoredPageOptions();

    //options
    seenItemPresentation = storedPageOptions.seenItemPresentation;
    paused = storedPageOptions.paused;
}

function getStoredPageOptions() {

    var pageOpt = getWindowDataJSONObject("pageOpt");

    pageOpt = _.assign(permanentOpt, pageOpt);

    pageOpt.paused = pageOpt.paused === true;

    if (pageOpt.seenItemPresentation == null)
        pageOpt.seenItemPresentation = "fadedOut50";

    return pageOpt;
}


function setStoredPageOptions(name, value) {
    var pageOpt = getWindowDataJSONObject("pageOpt");

    pageOpt[name] = value;
    saveWindowData("pageOpt", pageOpt);

}

function saveWindowData(name, obj) {
    sessionStorage.setItem(name, JSON.stringify(obj));
}

function getWindowData(name, defaultVal) {
    return sessionStorage.getItem(name) || defaultVal;
}

function getWindowDataJSONObject(name) {

    var vals = sessionStorage.getItem(name) || "{}";

    return JSON.parse(vals);
}

function setWindowDataJSONObject_permanent(name, object) {
    var saveObj = {};
    saveObj[name] = JSON.stringify(object || {});
    chrome.storage.local.set(saveObj, function() { console.log("saved"); });
}


function initPermanentOptions(name) {
    var name = "pageOpt";
    var vals = chrome.storage.local.get(name, function(vals) {
        console.log("vals", vals[name]);
        permanentOpt = JSON.parse(vals[name] || "{}");
        debugDir("storage callback", permanentOpt);
        startCheckingStartFunction();
    });
}


function isElementInViewport(el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

function debugDir(lbl, obj) {
    console.log(lbl);
    console.dir(obj);
}