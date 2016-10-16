function bindNavigationKeys() {
    $(document).bind('keypress', 'j', handleNavForward);
    $(document).bind('keypress', 'k', handleNavBackward);
    $(document).bind('keypress', 'n', handleNavNextPage);
}

function handleNavForward(e) {
    console.log("nav ffwd");
    var target = getFirstNonVisibleItemAfterAnyVisible();
    var itemList = store.getItemList();

    var firstItem = itemList.first();
    var firstItemOffset = firstItem.offset();
    var currentOffset = $(window).scrollTop();

    if (firstItem.length > 0 && currentOffset < firstItemOffset.top)
        target = firstItem;

    console.log("offsets", currentOffset, firstItemOffset);

    if (target.length === 0) {
        console.log("nav ffw target links", target);
        target = store.getMarkReadLinks();
    }

    $(window).scrollTo(target, 300);
    //do stuff with "key" here...
}

function handleNavBackward(e) {
    console.log("nav bkwd");
    var viewportHeight = $(window).height();
    var target = getLastNonVisibleItemBeforeAnyVisible();

    $(window).scrollTo(target, 0);
    $(window).scrollTo("-=" + viewportHeight + "px", 300);
}

function handleNavNextPage() {
    var nextPageLink = store.getNextPageLink();
    console.log("nextPageLink", nextPageLink);

    var href = nextPageLink.attr("href");
    nextPageLink.trigger("click");
    if (href != null && !href.blank() && !href.startsWith("#"))
        location.href = href;
}

function getFirstNonVisibleItemAfterAnyVisible() {
    var itemList = store.getItemList();

    debugDir("itemList", itemList);

    var foundOneVisible = false;
    var returnItem = $([]);
    _.some(itemList, function(thisItem) {

        var thisItemInViewPort = isElementInViewport(thisItem);
        console.log(thisItemInViewPort, thisItem)
        if (thisItemInViewPort && !foundOneVisible)
            foundOneVisible = true;

        if (!thisItemInViewPort && foundOneVisible) {
            returnItem = $(thisItem);
            debugDir("firstNonVisibleItemAfterAnyVisible", returnItem);
            return true;
        }

        return false;
    });

    return returnItem;
}

function getLastNonVisibleItemBeforeAnyVisible() {
    var itemList = _.reverse(store.getItemList());

    var foundOneVisible = false;
    var returnItem = $([]);
    _.some(itemList, function(thisItem) {

        var thisItemInViewPort = isElementInViewport(thisItem);
        if (thisItemInViewPort && !foundOneVisible)
            foundOneVisible = true;

        if (!thisItemInViewPort && foundOneVisible) {
            returnItem = $(thisItem);
            debugDir("lastNonVisibleItemBeforeAnyVisible", returnItem);
            return true;
        }

        return false;
    });

    return returnItem;
}