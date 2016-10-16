//attribution: https://commons.wikimedia.org/wiki/File:Radar2.gif


(function bootsrap() {

    detectStore();
    $("body").addClass("snd_style snd_" + store.name);

    if (!run)
        return;

    debugDir("permanentOpt", permanentOpt);
    if (permanentOpt == null)
        initPermanentOptions();
    else
        startCheckingStartFunction();

    bindNavigationKeys();

})();

function startCheckingStartFunction() {
    setGlobalOptions();
    setInterval(startFunctions, 500);
}

function startFunctions() {
    var links = store.getMarkReadLinks();

    //if links processed, or no links, or paused
    if (links.hasClass("snd_processed") || links.length == 0)
        return;

    store.getOptionsDOM(store.placeholderForInfoOptions());

    if (paused)
        return;

    updateBodyStyleClass();

    debugDir("Attaching events to links:", links);
    links.addClass("snd_processed").click(store.markReadFunc);

    store.getItemList().addClass("snd_processed_item").click(store.markSingleItem);
    //store.getItemList().first().click();

    store.initPageItems();
    store.processPageItems();

}