var ebayStore = {
    name: "ebay",
    /************************************************************************************************************/
    placeholderForInfoOptions: function() {
        return $("#Results");
    },
    /************************************************************************************************************/
    getMarkReadLinks: function() {
        var pages = $("#Pagination > tbody > tr > td").not(".pagn-prev").find("a");
        return pages;
    },
    /************************************************************************************************************/
    getNextPageLink: function() {
        return $("#Pagination > tbody > tr > td.pagn-next").find("a");
    },
    /************************************************************************************************************/
    getItemList: function() {
        var itemSelector = "#Results .sresult:visible";
        var items = $(itemSelector);
        return items;
    },
    /************************************************************************************************************/
    extractUniqueId: function(thisItem) {
        var attributeIdName = "listingid";
        var attributeIdName_2 = "id";

        return $(thisItem).attr(attributeIdName) || $(thisItem).attr(attributeIdName_2);
    }
}; //end of store