require('phpmailer/class.phpmailer.php');
$mail = new PHPMailer();
$mail->IsSMTP();
$mail->SMTPDebug = 0;
$mail->SMTPAuth = TRUE;
$mail->SMTPSecure = "tls";
$mail->Port = 587;
$mail->Username = "Your SMTP UserName";
$mail->Password = "Your SMTP Password";
$mail->Host = "smtpout.secureserver.net";
$mail->Mailer = "smtp";
$mail->SetFrom($_POST["userEmail"], $_POST["userName"]);
$mail->AddReplyTo($_POST["userEmail"], $_POST["userName"]);
$mail->AddAddress("recipient address");
$mail->Subject = $_POST["subject"];
$mail->WordWrap = 80;
$mail->MsgHTML($_POST["content"]);



$mail->IsHTML(true);
if(!$mail->Send()) {
echo "Problem in Sending Mail.";
} else {
echo "Contact Mail Sent.";
}