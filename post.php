<?php

function http($url, $method, $postfields = NULL, $headers = array("Content-Type"=> "application/x-www-form-urlencoded")) {
    $ci = curl_init();
    $post_string = "";
    if(is_array($postfields)){
        foreach($postfields as $key=>$value){
            $post_string .=$key."=".$value."&";
        }
        if(count($postfields)>0)
            $post_string = substr($post_string,0,-1);
    }
    /* Curl settings */
    curl_setopt($ci, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);
    curl_setopt($ci, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ci, CURLOPT_ENCODING, "");
    curl_setopt($ci, CURLOPT_SSL_VERIFYHOST, 1);
    curl_setopt($ci, CURLOPT_HEADER, FALSE);

    switch ($method) {
        case 'POST':
            curl_setopt($ci, CURLOPT_POST, TRUE);
            if (!empty($postfields)) {
                curl_setopt($ci, CURLOPT_POSTFIELDS, $post_string);
            }
            break;
        case 'DELETE':
            curl_setopt($ci, CURLOPT_CUSTOMREQUEST, 'DELETE');
            if (!empty($postfields)) {
                $url = "{$url}?{$postfields}";
            }
    }

    curl_setopt($ci, CURLOPT_URL, $url );
    curl_setopt($ci, CURLOPT_HTTPHEADER, $headers );
    curl_setopt($ci, CURLINFO_HEADER_OUT, TRUE );

    $response = curl_exec($ci);
    return $response;
}
    $data = array("from"=> "star.yu@toursforfun.com",
                    "to"=> "yuxing_act@163.com",
                    "subject"=> "邮件测试",
                    "text"=> "邮件测试",
                    "generateTextFromHTML"=> true,
                    "html"=> 'test',
                    "choose_account"=>'0',//if you config more account ,you can this index.
                    "sendtime"=> 2 );//send timestamp;
    echo http("http://127.0.0.1:81","POST",$data);
?>