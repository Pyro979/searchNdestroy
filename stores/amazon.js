var amazonStore = {
    name: "amazon",
    /************************************************************************************************************/
    placeholderForInfoOptions: function() {
        return $("#atfResults, #mainResults").first(); //, #widgetContent
    },
    /************************************************************************************************************/
    getMarkReadLinks: function() {
        var pages = $("#pagn a").not(".pagnPrev");

        //if (pages.length == 0)
        //pages = $("ul.a-pagination a").not("a[href='#prev']"); //goldbox

        return pages;
    },
    /************************************************************************************************************/
    getNextPageLink: function() {

        var next = $("#pagnNextLink");
        //if (next.length == 0)
        //next = $("ul.a-pagination a[href='#next']"); //goldbox

        return next.filter(":visible");
    },
    /************************************************************************************************************/
    getItemList: function() {
        var itemSelector = "#atfResults .s-result-item:visible, #mainResults .s-result-item:visible";
        var items = $(itemSelector);
        return items;
    },
    /************************************************************************************************************/
    extractUniqueId: function(thisItem) {
        return $(thisItem).attr("data-asin");
    }
}; //end of store