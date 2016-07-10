<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Grizzly
 * Date: 14/07/15
 * Time: 22:58
 * To change this template use File | Settings | File Templates.
 */
//header('Content-type: application/json');
header('Content-Type: text/html; charset=UTF-8');

require_once 'DbExec.php';

die;

$objDbExec = new DbExec;

echo 'test';
$DbTab = 'message';


$champSelect    = '*';
$dataTab        = array();

$result = $objDbExec->DbSelectAll( $champSelect, $DbTab, $dataTab);
var_dump($result);
echo json_encode($result) ;