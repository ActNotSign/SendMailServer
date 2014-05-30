/*
* send mail by star.yu
*
var options = {
 from: "xxx@xx.com",
 to: "xxxx@xxx.com,
 subject: "邮件测试",
 text: "邮件测试",
 generateTextFromHTML: true,
 html: 'test',
 choose_account:0
 };
 var mail = new TFFMail();
 mail.init();
 mail.sendMail(options);
*
**/


exports.TFFMail = function  (options){
    var nodemailer = require('nodemailer');
    var fs = require('fs');
    var smtpTransport_array = new Array();

    //load mail config
     var loadConfig = function(filepath){
         try {
             var str = fs.readFileSync(filepath);
             return JSON.parse(str);;
         } catch (ex) {
             console.log("mail config is error:"+filepath+"\n");
             console.log(ex + "\n");
             return null;
         }
     }

    //init send user.
     this.init = function(sport_config){
        if(sport_config == null)
            sport_config = './config/transport.conf';
        var transportOtpions = loadConfig(sport_config)
         for(var i = 0; i < transportOtpions.length ;i++){
             var smtpTransport = nodemailer.createTransport("SMTP",transportOtpions[i]);
             smtpTransport_array.push(smtpTransport);
         }
    }

    //send mail
    this.sendMail = function (options) {
        var send_account = 0 ;
        try{
            send_account = parseInt(options.choose_account);
        }catch(exp){
            console.log("get nomral account\n");
            send_account = 0;
        }
        console.log(send_account);
        smtpTransport_array[send_account].sendMail(options, function (error, response) {
            if (error) {
                console.log(error  + "\n");
            } else {
                console.log("Message sent: " + response.message +":"+options.to+ "\n");
            }
        });
    };
}