<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Grizzly
 * Date: 14/07/15
 * Time: 20:49
 * To change this template use File | Settings | File Templates.
 */

namespace Conf;


class ConfigDb
{
    private $dsn='mysql:dbname=chatroom;host=localhost;port=3306;charset=utf8';
    private $user='root';
    private $password='root';
    private $options = array();

    public function getDsn()
    {
        return $this->dsn;
    }

    public function getOptions()
    {
        return $this->options;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function getUser()
    {
        return $this->user;
    }



}