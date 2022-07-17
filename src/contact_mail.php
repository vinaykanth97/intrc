require('phpmailer/class.phpmailer.php');
$mail = new PHPMailer();
$mail->IsSMTP();
$mail->SMTPDebug = 0;
$mail->SMTPAuth = TRUE;
$mail->SMTPSecure = "SSL";
$mail->Port = 465;
$mail->Username = "vinaykennedy@gmail.com";
$mail->Password = "Welc0me2$";
$mail->Host = "smtp.gmail.com";
$mail->Mailer = "smtp";
$mail->SetFrom($_POST["userEmail"], $_POST["userName"]);
$mail->AddReplyTo($_POST["userEmail"], $_POST["userName"]);
$mail->AddAddress("kanthvinay7@gmail.com");
$mail->Subject = $_POST["INTRC Contact form Lead"];
$mail->WordWrap = 80;
$mail->MsgHTML($_POST["fname"]);



$mail->IsHTML(true);
if(!$mail->Send()) {
echo "Problem in Sending Mail.";
} else {
echo "Contact Mail Sent.";
}