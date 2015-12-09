(function() {

	var GetWikiLinks = function() {
        var self = this;

        self.links = ko.observableArray();
        self.getLinks = ko.computed(function() {

            var wikiRequestLinksTimeout = setTimeout(function() {
                    var $wikiElem = $('#wikipedia');
                    $wikiElem.text('failed to get Wikipedia resources');
                    console.log('failed to get Wikipedia resources');
                }, 5000);

            var wikiQuery = "Warsaw",
            dt = 'jsonp',
            wikiBase = 'http://en.wikipedia.org/w/api.php',
            wikiUrl = wikiBase + '?action=opensearch&search=' + wikiQuery + '&format=json&callback=wikiCallback';

            $.ajax({
                    url: wikiUrl,
                    dataType: dt,
                    success: function(response){
                        var titleList = response[1],
                            definitionList = response[2];

                        for (var i = 0; i < titleList.length; i++) {
                            var titleStr = titleList[i],
                                urlStr = 'http://en.wikipedia.org/wiki/' + titleStr,
                                definitionStr = definitionList[i];
                            self.links.push({url: urlStr, title: titleStr, definition: definitionStr});
                        }
                    clearTimeout(wikiRequestLinksTimeout);
                }
            });
        });
    };


	var AppViewModel = function() {
	    self = this;

	    self.wikipediaLinks = new GetWikiLinks().links;

    };

ko.applyBindings(new AppViewModel());
}());