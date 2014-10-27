<?php

require '../vendor/autoload.php';


date_default_timezone_set('Europe/Moscow');


// функция отправки почты
function send_email($title, $content, $email)
{
    /* почта */
    $mail = new PHPMailer;

    /* настройки почты */
    $mail->isSMTP();

    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->CharSet    = 'UTF-8';

    $mail->Username   = 'homeworks.loftschool@gmail.com';
    $mail->Password   = 'ljvfirb gj rehce';

    $mail->SetFrom('homeworks.loftschool@gmail.com', 'Homeworks');
    $mail->AddAddress($email);
    $mail->Subject = $title;
    $mail->MsgHTML($content);


    /* отправка почты */
    if(!$mail->send()) {
        return false;
    } else {
        return true;
    }
}


// входные данные
$json = file_get_contents('php://input');
$cart = json_decode($json, true);


/* шаблон письма*/
$smarty = new Smarty;

/* настройки шаблонизатора */
$smarty->template_dir = 'templates/templates';
$smarty->compile_dir  = 'templates/templates_c';
$smarty->config_dir   = 'templates/configs';
$smarty->cache_dir    = 'templates/cache';

$smarty->assign('contacts', $cart['contacts']);
$smarty->assign('products', $cart['products']);
$smarty->assign('totalSum', $cart['totalSum']);

$producerMail = $smarty->fetch('producer.mail.tpl');
$customerMail = $smarty->fetch('customer.mail.tpl');

// отправка на свой email
if (!send_email('Поступил новый заказ', $producerMail, 'vampir2236@mail.ru')) {
    echo 'error';
    http_response_code(500);
} else {
    echo 'ok';
    http_response_code(200);

    // отправка письма заказчику
    try {
        send_email('Бочонок мёда', $customerMail, $cart['contacts']['email']);
    } catch (Exception $e) {
        //echo 'error';
    }
}