<?php
//Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once "vendor/autoload.php"; //PHPMailer Object

if($_POST){
  try {
    $m = new PHPMailer(true);
    //$m->isSMTP();
    //$m->SMTPAuth = true;
    //$m->STMPDebug = 2;

    //$m->Host = 'smtp.gmail.com';
    //$m->Username = 'lemauricienweb@gmail.com';
    //$m->Password = base64_decode('bG13ZWIxNjE4');
    //$m->SMTPSecure = 'ssl';
    //$m->Port = 465;

    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $info = $_POST['info'];
    $telephone = $_POST['telephone'];

    $cms_def = ['drupal', 'wordpress','autres', 'joomla'];
    $cms_exp = '';

  
    foreach($cms_def as &$cms){
      if(isset($_POST[$cms])){
        $cms_exp.=$cms.' ';
      }
    }
  


    $m->setFrom('noreply@lemauricien.com','Le Mauricien LTD', 0);
    $m->addAddress('hr@lemauricien.com');
    $m->addReplyTo($email, 'Reply address');


    //content
    $m->isHTML(true);    
    $m->Subject = "Recrutement Journaliste Web {$lastname} {$firstname}";
    $m->Body = "<p><strong>Prenom:</strong> $firstname</p><p><strong>Nom:</strong> $lastname </p><p><strong>Tel:</strong>$telephone</p><p><strong>Email:</strong>$email</p><p><strong>Expérience CMS:</strong>$cms_exp</p><p><strong>Message:</strong> $info</p>";

    $total_filesize = 0;
    //attachments
    foreach($_FILES as &$file){

      if($file['name']){
      $file_tmp = $file['tmp_name'];
      $file_name = $file['name'];
      //$file_size = $file['size'];
      //$file_type = $file['type'];
      //$total_filesize += $file_size;
      //echo 'uploads/'.$file_name.'<br/>';
      move_uploaded_file($file_tmp,"uploads/".$file_name);
      $m->addAttachment('uploads/'.$file_name);
      }
    }


    $m->send();

    //echo 'Message has been sent';

    //echo '<script type="text/javascript">window.location.href="./merci.html"</script>';
    $result = array("status" => "1");
    echo json_encode($result);
  }catch(Exception $e){
      //echo "<h3 style='color:red'>Une erreur est survenue lors de l'envoi de votre formulaire. Veuillez <a href='http://recrutement.lemauricien.com'>réessayer</a></h3>";
      //echo 'Mailer Error: ' . $m->ErrorInfo;
      print "<meta http-equiv=\"refresh\" content=\"0;URL=/404.html\">";
     //echo json_encode(array("status"=>"1","data"=>$total_filesize);
  }


}else{
     die('PAGE INTERDITE');
}

?>
