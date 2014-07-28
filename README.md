SendMailServer
==============
Send Mail Server by node js

Use
--------------
### S1
    install node js

### S2
    npm nodemailer

### S3
    node TFFSendMailServer.js

Test
--------------
    if you want test the server,you can use curl :
        curl -d 'from= "xx@163.com"&to= "xxx@xxx.com"&subject= "from linux curl"&text= "邮件测试"&generateTextFromHTML= true&html= 'test'&choose_account=0&sendtime' 127.0.0.1:81
    
    or

        $data = array(
        		    "from"=> "star.yu@xxx.com",
                    "to"=> "star.yu@xx.com",
                    "subject"=> "mail test",
                    "text"=> "mail test",
                    "generateTextFromHTML"=> true,
                    "html"=> 'test',
                    "choose_account"=>'0',//if you config more account ,you can set index.
                    "sendtime"=> 2 
                );//send timestamp;

        php post.php

