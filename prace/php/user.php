<?php
require_once "database.php";
$dbObject = new Database();

class User extends Database
{
    protected $email;
    protected $name;
    protected $surname;
    protected $authorization;
    protected $password;
    protected $school;
    protected $phone;
    private static $array = array("superadmin", "admin", "user");
    private $errors = array();



     function __construct()
    {
    }
//přídán chybové hlášky
    public function addError($message){
         global $errors;
         $errors[] = $message;
     }
//funkce pro kontolu daných slotů
    public function checkEmail($email){
         if(filter_var($email, FILTER_VALIDATE_EMAIL) == false){
             $this->addError('Špatně zadaný email.');
             return false;
         }
         else{
             return true;
         }
    }

    public function  checkName($name,$surname){
        if(strlen($name)<3||strlen($surname)<3){
             $this->addError('Moc krátké jméno nebo příjmení.');
             return false;
         }
         else{
             return true;
         }
    }

    public function checkPassword($password){
         if (strlen($password) < 6) {
            $this->addError('Moc krátké heslo.');
            return false;
        }

        if (!preg_match("#[0-9]+#", $password)) {
            $this->addError('Heslo neobsahuje číslo.');
            return false;
        }

        if (!preg_match("#[a-zA-Z]+#", $password)) {
            $this->addError('Heslo neobsahuje písmeno.');
            return false;
        }
        return true;
    }

    public function checkAuthorization($authorization, $array){
        if(!in_array($authorization, $array)){
            $this->addError('Špatně zadaná autorizace.');
            return false;
        }
        else{
            return true;
        }
    }

    public function checkPhone($phone){
         global $errorArray;
         if(!preg_match('^(\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$^',$phone)){
             $this->addError('Špatně zadaný mobil.');
             return false;
         }
         else{
             return true;
         }

    }
    public function createAccount($email,$password,$name,$surname,$phone,$school,$authorization){
         global $dbObject;
         global $errors;
         $conn = $dbObject->getConnection();
         $array = array("superadmin", "admin", "user");

         if ($conn->connect_error) {
             die("Spojení s databází selhalo. " . $conn->connect_error);
         }

         if(is_array($errors) && count($errors)!=0){
             print_r($errors);
             exit();
         }

         $query = $conn->prepare("INSERT INTO  users (email, password, name, surname, school, phone, authorization) VALUES (?, ?, ?, ?, ?, ?, ?)");
         $query->bind_param("sssssss",$email, $password, $name, $surname, $school, $phone, $authorization);
         $assoc = mysqli_fetch_assoc($query);
         var_dump($assoc);
         $query->execute();
         $debug = mysqli_affected_rows($conn) <= -1;
         echo($debug) ?  "Nebyl přidán žádný záznam." :  "Záznam byl přidán.";
         $query->close();
         $conn->close();
    }
    public function deleteAccount($email){
         global $dbObject;
         $conn = $dbObject->getConnection();

        if ($conn->connect_error) {
            die("Spojení s databází selhalo. " . $conn->connect_error);
        }

        if($this->checkEmail($email) == false){
            exit();
        }

        $query = $conn->prepare("DELETE FROM users WHERE email = ?");
        $query->bind_param("s",$email);
        $query->execute();
        $query->close();
        $conn->close();
    }
}
