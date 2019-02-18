<?php
//vytvoření API pro asynchronní výpis
header("Access-Control-Allow-Origin: *");
require_once "database.php";
$dbObject = new Database();
$conn = $dbObject->getConnection();
$url = array("getAllUsers","getSelectedUser");
$value = "default";

function getAllUsers(){
    global $conn;
    $query = "SELECT email, name, surname, school, authorization FROM users";
    $result = mysqli_query($conn,$query);
    $array = mysqli_fetch_all($result, MYSQLI_ASSOC);
    return $array;
}

function getSelectedUser(){
    global $conn;
    if(isset($_GET["email"])){
        $unsafe_action = $_GET["email"];
        $email = mysqli_real_escape_string($conn, $unsafe_action);
        $query = "SELECT email, name, surname, school, authorization FROM users WHERE email='$email'";
        $result = mysqli_query($conn,$query);
        if(!$result || mysqli_num_rows($result) == 0) {
            $array = array("id"=>404, "name"=>"Not found");
        }
        else {
            $array = mysqli_fetch_all($result,MYSQLI_ASSOC);
        }
    }
    return $array;
}

if (isset($_GET["action"]) && in_array($_GET["action"], $url))
{
    $unsafe_action = $_GET["action"];
    $action = mysqli_real_escape_string($conn, $unsafe_action);

    switch ($action) {
        case "getAllUsers":
            $value = getAllUsers();
            break;
        case "getSelectedUser":
            $value = getSelectedUser();
            break;
    }
}

exit(json_encode($value));