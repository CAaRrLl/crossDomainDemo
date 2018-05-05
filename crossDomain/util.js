exports.queryParse = function queryParse(query) {
    var queryJson = {}; 
    if(query) {
        query.split('&').forEach(function(e) {
            var temp = e.split('=');
            queryJson[temp[0]] = temp[1];
        });
    }
    return queryJson;
}