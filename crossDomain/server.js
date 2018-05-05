var App = require('./app');
var queryParse = require('./util').queryParse;
var app = App();

var api = {
    getusermsg: '/getusermsg',
    postusermsg: '/postusermsg',
}

app.listen(8080);

function getusermsg(req, res, next) {
    if(req.url.match(api.getusermsg)) {
        var queryJson = queryParse(req.url.split('?')[1]); 
        var fb = {code: 1000, data: {username: 'carl', userAge: 20, userSex: '男'}};
        if(queryJson.callback) {
            res.writeHead(200);
            res.write(queryJson.callback + '(' + JSON.stringify(fb) + ')');
        }else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.writeHead(200);
            res.write(JSON.stringify(fb));
        }
    }
    next();
}

function postusermsg(req, res, next) {
    if(req.url.match(api.postusermsg)) {
        var body = '';
        req.on('data', function(chunk){    
            body += chunk;
        });
        req.on('end', function(){    
            var queryJson = queryParse(body);
            console.log(queryJson);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.setHeader('Access-Control-Allow-Method', 'GET,POST,PUT');
            res.writeHead(200);
            res.write(JSON.stringify({code:1000, data:{}}));
            next();
        });
    }else {
        next();
    }
}



app.use(getusermsg);
app.use(postusermsg);