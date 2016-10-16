var etsyStore = {
    name: "etsy",
    /************************************************************************************************************/
    placeholderForInfoOptions: function() {
        return $(".pagination.btn-group").parent();
    },
    /************************************************************************************************************/
    getMarkReadLinks: function() {
        var pages = $(".pagination.btn-group a").not(":first").not(".is-selected");
        return pages;
    },
    /************************************************************************************************************/
    getNextPageLink: function() {
        return $(".ss-navigateright", store.getMarkReadLinks()).parent();
    },
    /************************************************************************************************************/
    getItemList: function() {
        var itemSelector = ".content .buyer-card:visible";
        var items = $(itemSelector);
        return items;
    },
    /************************************************************************************************************/
    extractUniqueId: function(thisItem) {
        return $(thisItem).attr("data-listing-id");
    }
}; //end of store