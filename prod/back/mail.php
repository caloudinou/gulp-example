<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Grizzly
 * Date: 27/06/15
 * Time: 06:36
 * To change this template use File | Settings | File Templates.
 */

// recup le post json
$_POST = json_decode(file_get_contents("php://input"),true);

$DATAS=[];

$DbTab = 'mail';

$DATAS['user_id']    = isset($_POST['id']) ? htmlspecialchars($_POST['name']) : NULL;
$DATAS['message'] = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : NULL;

// insert bdd
require_once 'DbExec.php';

use DbExec as DbExec;

$objDbExec = new DbExec;

$result = $objDbExec->DbInsert($DbTab,$DATAS);


// check insert message
if($result){
    $message = (trim($result)!='') ? false : true;
    $resultat=json_encode([
        'message' => $message
    ]);
} else {
    $message = true;
    $resultat=json_encode([
        'messages' => $message
    ]);
}

header('Content-type: application/json');
echo $resultat ;