var http = require('http');

var App = function() {
    if(!(this instanceof App)) {
        return new App();
    }
    this.init();
} 

App.prototype = {
    init: function() {
        this.chain = [];
        this.index = 0;
    },  
    use: function(handle) {
        this.chain.push(handle);
    },
    next: function() {
        if(!this.request || !this.response) {
            console.log('request or response is null');
            return;
        }
        if(this.index >= this.chain.length) {
            this.response.end();
            this.index = 0;
            return;
        }
        var middleware = this.chain[this.index++];
        if(middleware) {
            middleware(this.request, this.response, this.next.bind(this));
        }
    },
    listen: function(port) {
        var _this = this;
        http.createServer().listen(port? port: 6600)
        .on('request',function(req, res) {
            _this.request = req;
            _this.response = res;
            _this.next();
        });
    },
}

module.exports = App;