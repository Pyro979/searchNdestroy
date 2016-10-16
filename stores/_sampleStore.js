/**
 * This is a sample store file to help you get started
 * The actual methods might get slighly more complex than what's here, but not by much.
 * The architecture is supposed to make it easy to implement new stores
 * If you run into a limitation with this setup, please create a github issue.
 */

//rename "sampleStore" to "<storeName>Store". This is the variable referenced in storeGeneric.detectStore().
var sampleStore = {
    //name of the store
    name: "sample",
    /************************************************************************************************************/
    //placeholderForInfoOptions - this method finds where to place the options console
    //returns the jquery object to which the options console will be prepended
    //replace the selector with a selector that matches your location
    placeholderForInfoOptions: function() {
        return $(".resultList");
    },
    /************************************************************************************************************/
    //getMarkReadLinks - returns jquery object with any item which would trigger all items on this page to be read
    //typically this is the next page or numbered page navigations
    getMarkReadLinks: function() {
        return $(".pagination a").not(":first").not(".is-selected");
    },
    /************************************************************************************************************/
    //getNextPageLink - returns jquery object that contains the "Next link"
    //this is the object that we will trigger "click" on when the user clicks "n"
    //additionally we will try changing window.location to the "href" of this button
    getNextPageLink: function() {
        return $("#nextBtn");
    },
    /************************************************************************************************************/
    //getItemList - returns a jquery object that contains each item on the page.
    //the result of this will be used in conjunctions with extractUniqueId to mark items read
    getItemList: function() {
        var itemSelector = ".results .product";
        var items = $(itemSelector);
        return items;
    },
    /************************************************************************************************************/
    //extractUniqueId - given one jquery object from getItemList return a uniqueId of this product
    //if not possible to have a uniqueID, you might be able to extract something from product link url
    extractUniqueId: function(thisItem) {
        return $(thisItem).attr("product-id");
    }
};