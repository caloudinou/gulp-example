<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Grizzly
 * Date: 27/06/15
 * Time: 06:42
 * To change this template use File | Settings | File Templates.
 */
namespace Admin;

require_once 'ConfigDb.php';


class DbExec extends  ConfigDb
{
    private $dsn='';
    private $user='';
    private $password='';
    private $options = array();

    function __construct()
    {
        $this->dsn      =   parent::getDsn();
        $this->user     =   parent::getUser();
        $this->password =   parent::getPassword();
        $this->options  =   parent::getOptions();
    }


    private function StartDbConnect($sql){
        $db = new \PDO($this->dsn, $this->user, $this->password, $this->options);
        $req = $db->query($sql);
        return $req;
    }

    public function DbSelect( $champSelect, $DbTab, array $dataTab){

        $sql = "SELECT ".$champSelect." FROM ".$DbTab;

        if(count($dataTab)>0){
            $sql .=" WHERE";

            $count=0;
            foreach ($dataTab as $k => $v ){

                if($count==0)
                    $sql.= $k."='".$v."'";
                else
                    $sql.=" AND ".$k."='".$v."'";


                $count++;
            }
        }
        return $sql;
    }

    public function DbSelectAll($champSelect, $DbTab, array $dataTab){

        try {
            $req=$this->StartDbConnect($this->DbSelect($champSelect, $DbTab, $dataTab));
            $resultat = $req->fetchAll(\PDO::FETCH_ASSOC);


        } catch (PDOException $e) {
            $resultat= 'Connexion échouée : ' . $e->getMessage();
        }
        return $resultat;
    }


    public function DbInsert($DbTab,array $dataTab){
        $champs='';
        $values='';

        foreach($dataTab as $champ => $value){
            $champs.=$champ.', ';
            $values.="'".$value."', ";
        }
        $champs=rtrim($champs, ", ");
        $values=rtrim($values, ", ");

        $sql = "INSERT INTO ".$DbTab." (".$champs.") VALUES ( ".$values." )";

        try {
            $req=$this->StartDbConnect($sql);
            $resultat = $req->fetch(\PDO::FETCH_ASSOC);

        } catch (PDOException $e) {
            $resultat= 'Connexion échouée : ' . $e->getMessage();
        }
        return $resultat;

    }

    public function DbUpdate(){

    }

    public function Dbdelete(){

    }
}