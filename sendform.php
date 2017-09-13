<?php
//Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once "vendor/autoload.php"; //PHPMailer Object


 
try {
$m = new PHPMailer(true);
//$m->isSMTP();
//$m->SMTPAuth = true;
//$m->STMPDebug = 2;

//$m->Host = 'smtp.gmail.com';
//$m->Username = 'lemauricienweb@gmail.com';
//$m->Password = 'lmweb1618';
//$m->SMTPSecure = 'ssl';
//$m->Port = 465;

$firstname = 'John';//$_POST['firstname'];
$lastname = 'Doe'; //$_POST['lastname'];
$email = 'test@lemauricien.com'; //$_POST['lemail'];
$info = 'test info'; //$_POST['info'];



$m->setFrom('noreply@lemauricien.com','Le Mauricien LTD', 0);
$m->addAddress('lemauricienweb@gmail.com');
$m->addReplyTo($email, 'Reply address');


//content
$m->isHTML(true);    
$m->Subject = 'Recrutement Journaliste Web {$lastname} {$firstname}';
$m->Body = 'This is the HTML message body <b>in bold!</b>';
$m->AltBody = 'This is the body in plain text for non-HTML mail clients';


$m->send();
 echo 'Message has been sent';

  } catch(Exception $e){
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $m->ErrorInfo;
  } 


