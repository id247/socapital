<?php
    $mailto = 'bazhenov87@yandex.ru';

    date_default_timezone_set( 'Europe/Moscow' );

    if ( empty( $_POST ) ){         
        die('Ошибка'); 
    }

    $d = array();
    foreach( $_POST as $key => $value ){
        $d[$key] = empty( $_POST[$key] ) ? '' : htmlspecialchars( @$_POST[$key] );
    }
    $now = date('d.m.Y, H:i');


    $headers = <<<TEXT
From: robot@{$_SERVER['HTTP_HOST']}
Reply-To: robot@{$_SERVER['HTTP_HOST']}
MIME-Version: 1.0
Content-Type: text/html;charset=utf-8
TEXT;
    $mail = <<<HTML
Привет!
<br />
<br />У вас новый лид [{$d['type']}]:
<br />
<br />ФИО: <strong>{$d['fio']}</strong>
<br />Телефон: <strong>{$d['phone']}</strong>
<br />E-mail: <strong>{$d['email']}</strong>
<br />Название проекта: <strong>{$d['name']}</strong>
<br />Сайт: <strong>{$d['site']}</strong>
<br />Сфера деятельности: <strong>{$d['sphere']}</strong>
<br />Предполагаемый формат сотрудничества: <strong>{$d['format']}</strong>
<br />Описание проекта: <strong>{$d['description']}</strong>
<br />Комментарий: <strong>{$d['comments']}</strong>
<br />
<br />Сейчас: <strong>$now</strong>
<br />
<br />--
<br />С уважением,
<br />ваш лендинг-робот.
HTML;

//<br />referer: <strong>{$d['referer']}</strong>
//<br />Источник: <strong>{$d['crawler']}</strong>
//<br />Запрос: <strong>{$d['query']}</strong>

    if ( mail($mailto, 'Новая заявка c ' . $_SERVER['HTTP_HOST'] . ': '.$d['type'], $mail, $headers ) ){

        echo '["res":"Ваш запрос отправлен! Спасибо! Наши менеджеры свяжутся с вами в ближайшее время"]';

    }else{

        echo '["res":"Ошибка отправки"]';

    }
