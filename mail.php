<?php

if($_POST) {

    for($i=0; $i < count($_FILES['csv_file']['name']); $i++){

        $ftype[]       = $_FILES['csv_file']['type'][$i];
        $fname[]       = $_FILES['csv_file']['name'][$i];

    }


    // array with filenames to be sent as attachment
    $files = $fname;

    // email fields: to, from, subject, and so on
    $to = "jahnot@gmail.com";
    $from = "@gmail.com"; 
    $subject ="My subject"; 
    $message = "My message";
    $headers = "From: $from";

    echo $to


}

?>