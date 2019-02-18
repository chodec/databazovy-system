<?php
//třída pro vytvoření databázového objektu
class Database
{

    public static $config = array();
    private static $database;
    private $connection;

    public function __construct() {
        database::$config['host'] = 'localhost';
        database::$config['user'] = 'root';
        database::$config['pass'] = 'root';
        database::$config['name'] = 'user';

        $this->connection = new mysqli(database::$config['host'], database::$config['user'], database::$config['pass'], database::$config['name']);
    }

    function __destruct() {

    }

    public static function getConnection() {
        global $database;
        if($database == null){
            $database = new Database();
        }
        return $database->connection;
    }
}
$dbobject = new Database();
$dbobject->getConnection();