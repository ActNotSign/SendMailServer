/*
*   queue  by star.yu
* */

exports.TFFQueue = function (){

    var event_name = require("./TFFEventName");
    var fs = require("fs");
    var events = require("events");
    var g_array = new Array();
    var emitter = new events.EventEmitter();
    var queue_events = emitter.addListener(event_name.TFFEventName.QueueEventSyncToDisk, QueueEventSyncToDisk);

    this.sync = false;
    var sync_path = "/var/log/TFFQueue.json";
    /*
    * save queue to disk.
    * */
    function QueueEventSyncToDisk(){
        try {
            fs.writeFileSync(sync_path, JSON.stringify(g_array));
        } catch (ex) {
            console.log("Queue sync to disk error: "+ex);
        }
    }

    /*
    * sync path
    * */
    this.setSyncPath = function(filename){
        sync_path = filename;
    }

    /*
    *load sync data .
    *
    * */
    this.reloadData = function(filename){
        try {
            var str = fs.readFileSync(filename);
            g_array = JSON.parse(str);;
        } catch (ex) {
            console.log("TFFQueue reload data error:"+filename+"\n");
            console.log(ex + "\n");
        }
    }

      /*
    * get first element and delete it.
    *
    * */
    this.get = function(){
        var result = g_array.shift();
        if(this.sync)
            emitter.emit(event_name.TFFEventName.QueueEventSyncToDisk);
        return result;
    }

    /*
    * insert element to last position;
    *@param element
    *
    * */
    this.set = function(element){
        var len = g_array.push(element);
        if(this.sync)
            emitter.emit(event_name.TFFEventName.QueueEventSyncToDisk);
        return len;
    }

    /*
    * get current length;
    *
    * */
    this.length = function(){
        return g_array.length;
    }

    /*
    * whether or not the queue is null
    * */
    this.isEmpty = function(){
        return this.length() > 0 ? false : true;
    }

 }

