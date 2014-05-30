/*
* http server by star.yu;
*
* */

var http = require('http');
var querystring = require('querystring');
var event_name = require('./models/TFFEventName');
var tff_mail_model = require('./models/TFFMail');
var tff_queue_model = require('./models/TFFQueue');
var fs = require('fs');

/*
* load server config
* */
var server_config = {};
try {
    var config_str = fs.readFileSync("./config/server.conf");
    server_config = JSON.parse(config_str);
} catch (ex) {
    console.log("server config error: \n      "+ex);
    return ;
}
 /*
* init mail config
* */
var tffmail  = new tff_mail_model.TFFMail;
tffmail.init();

/*
*init queue
* */
var tffqueue = new tff_queue_model.TFFQueue();
tffqueue.sync = server_config.hotCopy;
tffqueue.setSyncPath(server_config.hotCopyPath);
tffqueue.reloadData(server_config.hotCopyPath);

/*
* http server callback method;
* */
var requestCallback = function(req, res){
    var postData = '';
    req.setEncoding(server_config.charsetType);
    req.addListener(event_name.TFFEventName.PostEventData, function(postDataChunk) {
        postData += postDataChunk+'';
    });
    req.addListener(event_name.TFFEventName.PostEventEnd, function() {
        postData = querystring.parse(postData);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        try{
            if(parseInt(postData.sendtime)==0)
                tffmail.sendMail(postData);
            else
               tffqueue.set(postData);

            res.write('{code:200}');
        }catch(exp){
            console.log("http server error:"+exp);
            res.write('{code:500}');
        }
        res.end();
    });
}

/*
* run server and listen port.
* */
http.createServer(requestCallback).listen(server_config.port);

/*
*send queue email;
* */
var send_timer =setInterval(function(){
    var timestamp = Date.parse(new Date())/1000;
    if(!tffqueue.isEmpty()){
        var data = tffqueue.get();
        if(parseInt(data.sendtime) <= timestamp || typeof(data.sendtime) == "undefined")
            tffmail.sendMail(data);
        else
            tffqueue.set(data);
    }
},100);