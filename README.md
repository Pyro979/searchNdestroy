# Search & Destroy for Amazon, Etsy and Ebay!
## Extension to remember items you've already seen + keyboard navigation!

When trying to find the perfect gift or purchase for yourself, you often need to change search parameters, categories or sorting. The problem is, when you do that you end up having to look at some of the same items multiple times. You already know those products are not what you want, but the store does not.

Search & Destroy solves this problem by **remembering the items you've already seen** during your current search, event through search changes or refreshes. "Seen" items can be faded out or completely hidden.

*BONUS POINTS:* with S&D you can also use *"j/k"* keys to navigatate through the list of items, and use the *"n"* key to go to next page. This lets you fly through large sets of results with ease.

Currently S&D is available for:
* Amazon
* Etsy
* Ebay
* ...with more stores coming (see contributing below)

## Contributing - PRs welcome

If you would like to contribute you can do either do general fixes or implement integration with brand new stores (or potentially any website that has lists of items and pagination).

+ [General Extension Info](https://developer.chrome.com/extensions/getstarted)
+ [Instructions to load extension in Chrome](https://developer.chrome.com/extensions/getstarted#unpacked)
+ [Instructions to load extension in Firefox](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox)

### Implementing new stores

*Step 1.* Update manifest.json file "content_scripts">>"matches" with the url pattern for the new store - [Match patterns](https://developer.chrome.com/extensions/match_patterns).

*Step 2.* Update storeGeneric.js. Function detectStoreByLocation() uses host to detect the store (if needs be you can use other methods) and returns the store variable (see Step 3)

*Step 3.* Implement a store file:
+ Copy "stores/_sampleStore.js" and rename it to the new store name.
+ Rename the variable "sampleStore" to what you used in Step 1.
+ Implement each of the 5 functions. Instructions for each are in the comments.

```javascript
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
```