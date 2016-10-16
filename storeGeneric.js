var store = "";
var run = false;
var paused;
var seenItemPresentation = "xxx";
var permanentOpt = null;
var thisPageItems = {};

var markReadLinks = {};
var markReadFunc = {};
var getPageItemsFunc = {};

function detectStore() {

    var thisStore = detectStoreByLocation();

    if (thisStore != null) {
        store = _.assign(store, thisStore);
    }

    run = !store.name.blank();

    console.log("store", store, "run", run);
    return store;
}

//detection logic
function detectStoreByLocation() {
    var host = location.host;
    var thisStore = "";

    if (host.includes("amazon")) {
        thisStore = amazonStore;
    } else if (host.includes("etsy")) {
        thisStore = etsyStore;
    } else if (host.includes("ebay")) {
        thisStore = ebayStore;
    }

    return thisStore;
} //end detection logic



//methods
var notImplemented = function() { alert("not implemented") };
var store = {
    "name": "",
    "getMarkReadLinks": notImplemented,
    "extractUniqueId": notImplemented,
    "initPageItems": notImplemented,
    "processPageItems": notImplemented,
    "placeholderForInfoOptions": notImplemented
};

store.markSingleItem = function() {

    var thisId = store.extractUniqueId(this);
    var currentReadItems = getWindowDataJSONObject("readItems");
    currentReadItems[thisId] = true;

    saveWindowData("readItems", currentReadItems);
};

store.initPageItems = function() {

    thisPageItems = {};
    var items = store.getItemList();
    var itemIds = _.map(items, store.extractUniqueId);
    _.each(itemIds, function(thisID, num) { thisPageItems[thisID] = true; });
};

store.processPageItems = function() {

    var currentReadItems = getWindowDataJSONObject("readItems");
    var items = store.getItemList();

    items.each(function() {
        var thisID = store.extractUniqueId(this);
        $(this).toggleClass("snd_seen", currentReadItems[thisID] != null);
    });
};

store.markReadFunc = function() {

    var currentReadItems = getWindowDataJSONObject("readItems");
    var toStore = _.assign(thisPageItems, currentReadItems);
    saveWindowData("readItems", toStore);

    thisPageItems = {};

    currentReadItems = getWindowDataJSONObject("readItems");

};

store.getOptionsDOM = function(placeholder) {

    //if exists, bug out
    if ($("#snd_option_container").length > 0)
        return;


    debugDir("placeholder", placeholder);

    var optionsContainer = $("<div></div>").attr("id", "snd_option_container").addClass("snd_options snd_icon").prependTo(placeholder);

    var moreInfo = "<span class='snd_moreInfo_control'>More Info >></span><span class='snd_moreInfo'>Items on the page are marked as 'seen' by clicking next page, any of the numbered pages or on an actual icon. The 'seen' status applies to this tab only, but will persist if you refresh, change sort or adjust any of the search parameters.</span>";
    var optTxt = "<div class='sdn_p'>Search & Destroy is <span class='powerState'></span> Seen items will be <span class='itemState'></span> Click here to <span class='reset'>[reset]</span> seen items<span class='count'></span>.</div>";
    var infoTxt = "<div class='sdn_p'>Navigate through results with <span class='snd_key'>j</span> / <span class='snd_key'>k</span>, or press <span class='snd_key'>n</span> to go to next page. " + moreInfo + "</div>";

    var reviewLink = getReviewLink();

    var globalTxt =
        "<div class='sdn_p_clear'>" +
        "<a href='#' class='setDefaults'>Set current options to default</a> | " +
        "<a href='mailto:app+snd@uxiomatic.com'>📧 Email Dev</a>" +
        reviewLink +
        "</div>";

    var opt = $("<div class='snd_optTxtWrapper'></div>").append(optTxt, infoTxt, globalTxt).appendTo(optionsContainer);

    var powerState = $("<select></select>").change(changePowerState);
    $("<option></option>").val("active").html("Active").appendTo(powerState);
    $("<option></option>").val("paused").html("Paused").appendTo(powerState);
    var powerStateVal = paused ? "paused" : "active";
    console.log("powerStateVal", powerStateVal);
    powerState.val(powerStateVal);

    var itemState = $("<select></select>").change(changeItemState);
    $("<option></option>").val("none").html("- visible -").appendTo(itemState);
    $("<option></option>").val("hidden").html("Hidden").appendTo(itemState);
    $("<option></option>").val("fadedOut50").html("Faded (50%)").appendTo(itemState);
    $("<option></option>").val("fadedOut20").html("Faded (20%)").appendTo(itemState);
    $("<option></option>").val("dashed").html("Dashed Border").appendTo(itemState);
    itemState.val(seenItemPresentation);

    opt.find(".powerState").append(powerState);
    opt.find(".itemState").append(itemState);
    opt.find(".reset").click(resetSeenItems);
    opt.find(".setDefaults").click(setDefaults);

    var moreInfo = opt.find(".snd_moreInfo");
    opt.find(".snd_moreInfo_control").click(function() {
        moreInfo.removeClass("snd_moreInfo");
        $(this).remove();
    });

    var readItems = getWindowDataJSONObject("readItems");
    var itemCount = _.size(readItems);

    console.log("itemCount = " + itemCount);
    debugDir("readItems", readItems);

    if (itemCount > 0)
        itemCount = " (" + itemCount + " so far)";
    else
        itemCount = "";

    opt.find(".count").html(itemCount);

    //icon
    //opt.find(".snd_icon")
    //.append("")
    //.append("");
}

function getReviewLink() {
    //debugger;
    var isEdge = /Edge/.test(navigator.userAgent) && !(document.documentMode) && window.StyleMedia;
    var isFF = typeof InstallTrigger !== 'undefined';
    var isChrome = window.chrome && window.chrome.webstore; //doesn't seem to work =c/
    if (!isEdge && !isFF)
        isChrome = true;

    var ffReview = "http://bit.ly/SNDFirefox";
    var chromeReview = "http://bit.ly/SNDChrome";
    var edgeReview = "";

    var reviewLink = "";
    if (isFF) reviewLink = ffReview;
    else if (isChrome) reviewLink = chromeReview;
    else if (edgeReview) reviewLink = edgeReview;

    if (reviewLink !== "")
        reviewLink = " | <a href='" + reviewLink + "' target='_blank'>&#x2605; Leave Review</a>";

    return reviewLink;
}

function setDefaults() {
    setWindowDataJSONObject_permanent("pageOpt", getStoredPageOptions());
}

function resetSeenItems() {
    if (!confirm("Are you sure you want to reset the seen items of this tab?"))
        return;

    saveWindowData("readItems", {});
    refreshSeenClass();
}

function changePowerState() {
    var val = $(this).val();
    paused = val === "paused";
    setStoredPageOptions("paused", paused + "");
    refreshSeenClass();

}

function changeItemState() {
    var val = $(this).val();
    seenItemPresentation = val;
    setStoredPageOptions("seenItemPresentation", seenItemPresentation);
    updateBodyStyleClass();
    refreshSeenClass();
}

function refreshSeenClass() {
    $(".snd_seen").removeClass("snd_seen");
    store.processPageItems();
}

var presentationClasses = [
    "snd_itemPresentation_none",
    "snd_itemPresentation_hidden",
    "snd_itemPresentation_fadedOut50",
    "snd_itemPresentation_fadedOut20",
    "snd_itemPresentation_dashed"
];

function updateBodyStyleClass() {
    $("body").removeClass(presentationClasses.join(" ")).addClass("snd_itemPresentation_" + seenItemPresentation);
}